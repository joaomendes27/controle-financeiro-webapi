import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DashboardService } from '../../../services/dashboard.service';

@Component({
  selector: 'app-adicionar-transacao',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './adicionar-transacao.component.html',
  styleUrls: ['./adicionar-transacao.scss'],
})
export class AdicionarTransacao {
  selectedCategoria: number | null = null;
  transacao = {
    valor: 0,
    descricao: '',
    categoriaID: 0,
    dataTransacao: '', // Utilizando a data/hora atual
  };
  message: string | null = null;

  constructor(private dashboardService: DashboardService) {}

  // Selecionar a categoria (Receita ou Despesa)
  selectCategoria(categoriaID: number): void {
    this.selectedCategoria = categoriaID;
    this.transacao.categoriaID = categoriaID;
  }
  goBack(): void {
    this.selectedCategoria = null;
  }

  // Enviar os dados para a API
  onSubmit(): void {
    if (
      this.transacao.valor &&
      this.transacao.descricao &&
      this.transacao.categoriaID
    ) {
      this.transacao.dataTransacao = new Date().toISOString();

      this.dashboardService.adicionarTransacao(this.transacao).subscribe(
        (response) => {
          this.message = 'Transação adicionada com sucesso!';
          this.transacao = {
            valor: 0,
            descricao: '',
            categoriaID: 0,
            dataTransacao: new Date().toISOString(),
          };
        },
        (error) => {
          this.message = 'Erro ao adicionar transação. Tente novamente.';
        }
      );
    } else {
      this.message = 'Por favor, preencha todos os campos.';
    }
  }
}
