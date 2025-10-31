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
    this.transacoesService.listarReceitas().subscribe({
      next: (dados) => {
        this.receitas = dados.map((transacao) => ({
          ...transacao,
          dataTransacao: this.datePipe.transform(
            new Date(transacao.data),
            'dd/MM/yyyy'
          ),
        }));
      },
      error: (erro) => {
        this.errorMessage = 'Erro ao carregar receitas.';
        console.error(erro);
      },
    });

    this.transacoesService.listarDespesas().subscribe({
      next: (dados) => {
        this.despesas = dados.map((transacao) => ({
          ...transacao,
          dataTransacao: this.datePipe.transform(
            new Date(transacao.data),
            'dd/MM/yyyy'
          ),
        }));
      },
      error: (erro) => {
        this.errorMessage = 'Erro ao carregar despesas.';
        console.error(erro);
      },
    });
  }
}
