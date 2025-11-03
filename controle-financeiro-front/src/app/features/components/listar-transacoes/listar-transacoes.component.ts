import { Component, OnInit } from '@angular/core';
import { TransacoesService } from '../../../services/transacoes.service';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-listar-transacoes',
  templateUrl: './listar-transacoes.component.html',
  styleUrls: ['./listar-transacoes.component.scss'],
  imports: [CommonModule, FormsModule],
  providers: [DatePipe],
})
export class ListarTransacoes implements OnInit {
  receitas: any[] = [];
  despesas: any[] = [];
  errorMessage = '';

  mostrarFiltro = false;

  mesSelecionado: any = (new Date().getMonth() + 1).toString().padStart(2, '0');
  anoSelecionado: any = new Date().getFullYear().toString();

  constructor(
    private transacoesService: TransacoesService,
    private datePipe: DatePipe
  ) {}

  ngOnInit(): void {
    this.carregarTransacoes();
  }

  private getTimestamp(t: any): number {
    const raw =
      t?.data ?? t?.dataTransacao ?? t?.dataRegistro ?? t?.dataCriacao;
    const d = raw ? new Date(raw) : null;
    return d?.getTime?.() || 0;
  }

  carregarTransacoes(): void {
    this.transacoesService.listarTransacoesPorUsuario().subscribe({
      next: (dados) => {
        const receitasRaw = dados.filter((t) => t.categoriaId === 1);
        const despesasRaw = dados.filter((t) => t.categoriaId === 2);

        this.receitas = receitasRaw
          .sort((a, b) => this.getTimestamp(b) - this.getTimestamp(a))
          .map((transacao) => {
            const baseData = transacao.data ?? transacao.dataTransacao;
            return {
              ...transacao,
              dataTransacao: this.datePipe.transform(
                new Date(baseData),
                'dd/MM/yyyy'
              ),
            };
          });

        this.despesas = despesasRaw
          .sort((a, b) => this.getTimestamp(b) - this.getTimestamp(a))
          .map((transacao) => {
            const baseData = transacao.data ?? transacao.dataTransacao;
            return {
              ...transacao,
              dataTransacao: this.datePipe.transform(
                new Date(baseData),
                'dd/MM/yyyy'
              ),
            };
          });
      },
      error: (erro) => {
        this.errorMessage = 'Erro ao carregar transações.';
        console.error(erro);
      },
    });
  }

  filtrarTransacoes(): void {
    this.transacoesService
      .filtrarTransacoesPorMesAno(this.mesSelecionado, this.anoSelecionado)
      .subscribe({
        next: (dados) => {
          const receitasRaw = dados.filter((t) => t.categoriaId === 1);
          const despesasRaw = dados.filter((t) => t.categoriaId === 2);

          this.receitas = receitasRaw
            .sort((a, b) => this.getTimestamp(b) - this.getTimestamp(a))
            .map((transacao) => {
              const baseData = transacao.data ?? transacao.dataTransacao;
              return {
                ...transacao,
                dataTransacao: this.datePipe.transform(
                  new Date(baseData),
                  'dd/MM/yyyy'
                ),
              };
            });

          this.despesas = despesasRaw
            .sort((a, b) => this.getTimestamp(b) - this.getTimestamp(a))
            .map((transacao) => {
              const baseData = transacao.data ?? transacao.dataTransacao;
              return {
                ...transacao,
                dataTransacao: this.datePipe.transform(
                  new Date(baseData),
                  'dd/MM/yyyy'
                ),
              };
            });
          this.errorMessage = '';
        },
        error: (erro) => {
          this.errorMessage = 'Erro ao filtrar transações.';
          console.error(erro);
        },
      });
  }

  onMonthChange(value: string): void {
    const [ano, mes] = value.split('-').map(Number);
    this.anoSelecionado = ano;
    this.mesSelecionado = mes;
  }

  limparFiltro(): void {
    const hoje = new Date();
    this.mesSelecionado = (hoje.getMonth() + 1).toString().padStart(2, '0');
    this.anoSelecionado = hoje.getFullYear().toString();
    this.carregarTransacoes();
  }
}
