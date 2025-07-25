import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms'; // Importe o FormsModule
import { CommonModule } from '@angular/common'; // Importando CommonModule
import { DashboardService } from '../../services/dashboard.service';

@Component({
  selector: 'app-adicionar-transacao',
  standalone: true, // Isso garante que é um componente standalone
  imports: [FormsModule, CommonModule], // Adicione FormsModule aqui
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
      this.transacao.dataTransacao = new Date().toISOString(); // Formato ISO 8601

      this.dashboardService.adicionarTransacao(this.transacao).subscribe(
        (response) => {
          this.message = 'Transação adicionada com sucesso!';
          this.transacao = {
            valor: 0,
            descricao: '',
            categoriaID: 0,
            dataTransacao: new Date().toISOString(), // Resetando a data
          }; // Limpar o formulário
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
