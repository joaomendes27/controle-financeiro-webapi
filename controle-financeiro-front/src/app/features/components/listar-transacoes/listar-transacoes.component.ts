import { Component, OnInit } from '@angular/core';
import { TransacoesService } from '../../../services/transacoes.service';
import { CommonModule, DatePipe, NgIf, NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-listar-transacoes',
  standalone: true,
  templateUrl: './listar-transacoes.component.html',
  styleUrls: ['./listar-transacoes.component.scss'],
  imports: [CommonModule, NgIf, NgFor, FormsModule],
  providers: [DatePipe],
})
export class ListarTransacoes implements OnInit {
  receitas: any[] = [];
  despesas: any[] = [];
  errorMessage = '';
  showConfirm = false;
  transacaoParaExcluir: any | null = null;

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

  pedirExclusao(t: any): void {
    this.transacaoParaExcluir = t;
    this.showConfirm = true;
  }

  cancelarExclusao(): void {
    this.showConfirm = false;
    this.transacaoParaExcluir = null;
  }

  confirmarExclusao(): void {
    if (!this.transacaoParaExcluir?.id) {
      this.cancelarExclusao();
      return;
    }
    this.transacoesService
      .excluirTransacao(this.transacaoParaExcluir.id)
      .subscribe({
        next: () => {
          this.cancelarExclusao();
          // Recarrega mantendo o filtro atual, se ativo
          if (this.mostrarFiltro) {
            this.filtrarTransacoes();
          } else {
            this.carregarTransacoes();
          }
        },
        error: (erro) => {
          console.error('Erro ao excluir transação', erro);
          this.errorMessage = 'Erro ao excluir transação.';
          this.cancelarExclusao();
        },
      });
  }
}
