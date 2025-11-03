import { Component, OnInit } from '@angular/core';
import { TransacoesService } from '../../../services/transacoes.service';
import { CommonModule, DatePipe } from '@angular/common';

@Component({
  selector: 'app-listar-transacoes',
  templateUrl: './listar-transacoes.component.html',
  styleUrls: ['./listar-transacoes.component.scss'],
  imports: [CommonModule],
  providers: [DatePipe],
})
export class ListarTransacoes implements OnInit {
  receitas: any[] = [];
  despesas: any[] = [];
  errorMessage = '';

  constructor(
    private transacoesService: TransacoesService,
    private datePipe: DatePipe
  ) {}

  ngOnInit(): void {
    this.carregarTransacoes();
  }

  carregarTransacoes(): void {
    const usuarioId = Number(localStorage.getItem('usuarioId'));
    this.transacoesService.listarTransacoesPorUsuario().subscribe({
      next: (dados) => {
        this.receitas = dados
          .filter((t) => t.categoriaId === 1)
          .map((transacao) => ({
            ...transacao,
            dataTransacao: this.datePipe.transform(
              new Date(transacao.data),
              'dd/MM/yyyy'
            ),
          }));

        this.despesas = dados
          .filter((t) => t.categoriaId === 2)
          .map((transacao) => ({
            ...transacao,
            dataTransacao: this.datePipe.transform(
              new Date(transacao.data),
              'dd/MM/yyyy'
            ),
          }));
      },
      error: (erro) => {
        this.errorMessage = 'Erro ao carregar transações.';
        console.error(erro);
      },
    });
  }
}
