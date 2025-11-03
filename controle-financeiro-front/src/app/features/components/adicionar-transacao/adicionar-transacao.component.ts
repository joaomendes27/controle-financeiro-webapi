import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TransacoesService } from '../../../services/transacoes.service';

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
    categoriaId: 0,
    dataTransacao: '',
  };
  message: string | null = null;
  constructor(private transacoesService: TransacoesService) {}

  selectCategoria(categoriaId: number): void {
    this.selectedCategoria = categoriaId;
    this.transacao.categoriaId = categoriaId;
  }
  goBack(): void {
    this.selectedCategoria = null;
  }

  onSubmit(): void {
    if (
      this.transacao.valor &&
      this.transacao.descricao &&
      this.transacao.categoriaId
    ) {
      this.transacao.dataTransacao = new Date().toISOString();

      this.transacoesService.adicionarTransacao(this.transacao).subscribe({
        next: () => {
          this.message = 'Transação adicionada com sucesso!';
          this.resetForm();
        },
        error: () => {
          this.message = 'Erro ao adicionar transação. Tente novamente.';
        },
      });
    } else {
      this.message = 'Por favor, preencha todos os campos.';
    }
  }

  private resetForm(): void {
    this.transacao = {
      valor: 0,
      descricao: '',
      categoriaId: 0,
      dataTransacao: '',
    };
    this.selectedCategoria = null;
  }
}
