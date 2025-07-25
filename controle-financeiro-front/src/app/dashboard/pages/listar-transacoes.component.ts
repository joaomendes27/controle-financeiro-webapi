import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../services/dashboard.service';
import { CommonModule } from '@angular/common';
import { DatePipe } from '@angular/common'; // Importe o DatePipe

@Component({
  selector: 'app-listar-transacoes',
  templateUrl: './listar-transacoes.component.html',
  styleUrls: ['./listar-transacoes.component.scss'],
  imports: [CommonModule], // Adicione FormsModule aqui
  providers: [DatePipe], // Adicione o DatePipe nos providers
})
export class ListarTransacoes implements OnInit {
  receitas: any[] = [];
  despesas: any[] = [];
  errorMessage: string = '';

  constructor(
    private dashboardService: DashboardService,
    private datePipe: DatePipe
  ) {}

  ngOnInit(): void {
    // Chamando os métodos para listar as transações
    this.carregarTransacoes();
  }

  carregarTransacoes(): void {
    this.dashboardService.listarReceitas().subscribe(
      (dados) => {
        console.log('Receitas recebidas:', dados); // Verifique os dados

        this.receitas = dados.map((transacao) => ({
          ...transacao,
          dataTransacao: this.datePipe.transform(
            new Date(transacao.data),
            'dd/MM/yyyy'
          ), // Converter para Date e formatar
        }));
      },
      (erro) => {
        this.errorMessage = 'Erro ao carregar receitas.';
        console.error(erro);
      }
    );

    this.dashboardService.listarDespesas().subscribe(
      (dados) => {
        this.despesas = dados.map((transacao) => ({
          ...transacao,
          dataTransacao: this.datePipe.transform(
            new Date(transacao.data),
            'dd/MM/yyyy'
          ), // Converter para Date e formatar
        }));
      },
      (erro) => {
        this.errorMessage = 'Erro ao carregar despesas.';
        console.error(erro);
      }
    );
  }
}
