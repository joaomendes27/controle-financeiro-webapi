import { Component, HostListener, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RelatorioService } from '../../../services/relatorio.service';
import { TransacoesService } from '../../../services/transacoes.service';
import { BaseChartDirective } from 'ng2-charts';
import { ChartData, ChartOptions } from 'chart.js';
import { ChartPaletteService } from '../../../shared/chart-palette.service';
import 'chart.js/auto';

type Transacao = {
  categoriaId: number;
  descricao: string;
  valor: number;
  data?: string | Date;
};

type ResumoItem = { label: string; valor: number };

@Component({
  selector: 'app-dashboard-home',
  templateUrl: './dashboard-home.html',
  styleUrls: ['./dashboard-home.scss'],
  standalone: true,
  imports: [CommonModule, BaseChartDirective],
})
export class DashboardHome implements OnInit {
  totalReceitas = 0;
  totalDespesas = 0;
  saldo = 0;
  periodoLabel = '';
  comparativo: {
    totalReceitas: number;
    totalDespesas: number;
    saldo: number;
  } | null = null;
  comparativoDia = 0;
  comparando = false;
  receitasDelta: number | null = null;
  despesasDelta: number | null = null;
  saldoDelta: number | null = null;

  receitasChartData: ChartData<'pie', number[], string | string[]> = {
    labels: [],
    datasets: [{ data: [] }],
  };

  despesasChartData: ChartData<'pie', number[], string | string[]> = {
    labels: [],
    datasets: [{ data: [] }],
  };

  pieChartOptions: ChartOptions<'pie'> = {
    responsive: true,
    plugins: {
      legend: { position: 'bottom' },
      tooltip: { enabled: true },
    },
  };

  receitasResumo: ResumoItem[] = [];
  despesasResumo: ResumoItem[] = [];

  receitasColors: string[] = [];
  despesasColors: string[] = [];

  showExportMenu = false;

  constructor(
    private relatorioService: RelatorioService,
    private transacoesService: TransacoesService,
    private palette: ChartPaletteService
  ) {}

  ngOnInit(): void {
    this.carregarRelatorioMensal();
    this.carregarTransacoesMesAtual();
  }

  carregarRelatorioMensal(): void {
    const dataAtual = new Date();
    const mesAtual = dataAtual.getMonth() + 1;
    const anoAtual = dataAtual.getFullYear();
    this.periodoLabel = this.titleCase(
      dataAtual.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })
    );

    this.relatorioService.getRelatorioMensal(mesAtual, anoAtual).subscribe({
      next: (relatorio: any) => {
        this.totalReceitas = relatorio.totalReceitas;
        this.totalDespesas = relatorio.totalDespesas;
        this.saldo = relatorio.saldo;
      },
      error: (err: any) => {
        console.error('Erro ao carregar relatório:', err);
      },
    });
  }

  baixarRelatorio(): void {
    this.relatorioService.baixarRelatorio().subscribe({
      next: (data: Blob) => {
        const url = window.URL.createObjectURL(data);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'relatorio-financeiro.pdf';
        a.click();
        window.URL.revokeObjectURL(url);
      },
      error: (err: any) => {
        console.error('Erro ao baixar relatório:', err);
      },
    });
  }

  toggleExportMenu(event: MouseEvent): void {
    event.stopPropagation();
    this.showExportMenu = !this.showExportMenu;
  }

  @HostListener('document:click')
  closeExportMenu(): void {
    this.showExportMenu = false;
  }

  exportarPdf(): void {
    this.relatorioService.baixarPdf().subscribe({
      next: (data: Blob) =>
        this.baixarArquivo(data, 'relatorio-financeiro.pdf'),
      error: (err: any) => console.error('Erro ao exportar PDF:', err),
    });
  }

  exportarExcel(): void {
    this.relatorioService.baixarExcel().subscribe({
      next: (data: Blob) =>
        this.baixarArquivo(data, 'relatorio-financeiro.xlsx'),
      error: (err: any) => console.error('Erro ao exportar Excel:', err),
    });
  }

  private baixarArquivo(data: Blob, filename: string): void {
    const url = window.URL.createObjectURL(data);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    window.URL.revokeObjectURL(url);
  }

  private carregarTransacoesMesAtual(): void {
    const { mes, ano } = this.getMesAnoAtual();
    this.transacoesService.filtrarTransacoesPorMesAno(mes, ano).subscribe({
      next: (transacoes) => this.atualizarGraficos(transacoes || []),
      error: (err) => console.error('Erro ao carregar transações:', err),
    });
  }

  compararMesPassado(): void {
    if (this.comparativo && !this.comparando) {
      this.limparComparativo();
      return;
    }
    if (this.comparando) return;
    this.comparando = true;
    const hoje = new Date();
    const dia = hoje.getDate();
    const mes = hoje.getMonth() + 1;
    const ano = hoje.getFullYear();
    this.comparativoDia = dia;

    this.transacoesService.getComparativoMesAnterior(dia, mes, ano).subscribe({
      next: (comp) => {
        this.comparativo = comp;
        this.recalcularDeltas();
      },
      error: (err) => {
        console.error('Erro ao buscar comparativo do mês passado:', err);
      },
      complete: () => {
        this.comparando = false;
      },
    });
  }

  limparComparativo(): void {
    this.comparativo = null;
    this.receitasDelta = this.despesasDelta = this.saldoDelta = null;
    this.comparativoDia = 0;
  }

  private recalcularDeltas(): void {
    if (!this.comparativo) {
      this.receitasDelta = this.despesasDelta = this.saldoDelta = null;
      return;
    }
    this.receitasDelta = this.deltaPercent(
      this.totalReceitas,
      this.comparativo.totalReceitas
    );
    this.despesasDelta = this.deltaPercent(
      this.totalDespesas,
      this.comparativo.totalDespesas
    );
    this.saldoDelta = this.deltaPercent(this.saldo, this.comparativo.saldo);
  }

  private deltaPercent(atual: number, anterior: number): number | null {
    if (anterior === 0) {
      if (atual === 0) return 0;
      return 100;
    }
    return ((atual - anterior) / anterior) * 100;
  }

  classeDelta(delta: number | null): string {
    if (delta === null) return 'delta-neutral';
    if (delta > 0) return 'delta-up';
    if (delta < 0) return 'delta-down';
    return 'delta-neutral';
  }

  formatarDelta(delta: number | null): string {
    if (delta === null) return '—';
    const arrow = delta > 0 ? '▲' : delta < 0 ? '▼' : '';
    const sinal = delta > 0 ? '+' : delta < 0 ? '' : '';
    return `${arrow} ${sinal}${delta.toFixed(1)}%`.trim();
  }

  private atualizarGraficos(transacoes: Transacao[]): void {
    const receitas = transacoes.filter((t) => t.categoriaId === 1);
    const despesas = transacoes.filter((t) => t.categoriaId === 2);

    const rec = this.somarPorDescricao(receitas);
    const des = this.somarPorDescricao(despesas);

    this.receitasColors = this.palette.getPaletteExcludingRed(
      rec.labels.length
    );
    this.despesasColors = this.palette.getPalette(des.labels.length);

    this.receitasChartData = this.criarChartData(
      rec.labels,
      rec.valores,
      'Receitas',
      this.receitasColors
    );

    this.despesasChartData = this.criarChartData(
      des.labels,
      des.valores,
      'Despesas',
      this.despesasColors
    );

    this.receitasResumo = this.criarResumo(rec.labels, rec.valores);
    this.despesasResumo = this.criarResumo(des.labels, des.valores);
  }

  private somarPorDescricao(itens: Transacao[]): {
    labels: string[];
    valores: number[];
  } {
    const mapa = new Map<string, { label: string; total: number }>();

    for (const item of itens) {
      const original = (item.descricao ?? 'Sem descrição').toString();
      const key = this.normalizar(original);
      const atual = mapa.get(key);
      if (atual) {
        atual.total += Number(item.valor) || 0;
        if (this.temAcento(original) && !this.temAcento(atual.label)) {
          atual.label = this.titleCase(original);
        }
      } else {
        mapa.set(key, {
          label: this.titleCase(original),
          total: Number(item.valor) || 0,
        });
      }
    }

    const labels: string[] = [];
    const valores: number[] = [];
    mapa.forEach((v) => {
      labels.push(v.label);
      valores.push(Number(v.total.toFixed(2)));
    });
    return { labels, valores };
  }

  private criarChartData(
    labels: string[],
    valores: number[],
    datasetLabel: string,
    backgroundColor: string[]
  ): ChartData<'pie', number[], string | string[]> {
    return {
      labels,
      datasets: [
        {
          data: valores,
          label: datasetLabel,
          backgroundColor,
          borderColor: '#ffffff',
          borderWidth: 2,
        },
      ],
    };
  }

  private criarResumo(labels: string[], valores: number[]): ResumoItem[] {
    return labels
      .map((label, i) => ({ label, valor: valores[i] ?? 0 }))
      .sort((a, b) => b.valor - a.valor);
  }

  private normalizar(texto: string): string {
    return texto
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
      .trim();
  }

  private temAcento(texto: string): boolean {
    return /[\u0300-\u036f]/.test(texto.normalize('NFD'));
  }

  private titleCase(texto: string): string {
    return texto
      .toLowerCase()
      .split(/\s+/)
      .map((p) => p.charAt(0).toUpperCase() + p.slice(1))
      .join(' ');
  }

  private getMesAnoAtual(): { mes: number; ano: number } {
    const hoje = new Date();
    return { mes: hoje.getMonth() + 1, ano: hoje.getFullYear() };
  }
}
