import { Component, OnInit } from '@angular/core';
import { CommonModule, NgIf, NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  RecorrenciasService,
  Recorrencia,
  RecorrenciaPayload,
} from '../../../services/recorrencias.service';

@Component({
  selector: 'app-recorrencias',
  standalone: true,
  imports: [CommonModule, NgIf, NgFor, FormsModule],
  templateUrl: './recorrencias.component.html',
  styleUrls: ['./recorrencias.component.scss'],
})
export class RecorrenciasComponent implements OnInit {
  recorrencias: Recorrencia[] = [];
  nova: RecorrenciaPayload = {
    descricao: '',
    valor: 0,
    diaDoMes: 1,
    categoriaId: 1,
  };
  message: string | null = null;
  showAjuda = false;

  constructor(private service: RecorrenciasService) {}

  ngOnInit(): void {
    this.listar();
  }

  listar(): void {
    this.service.listarRecorrencias().subscribe({
      next: (items) => (this.recorrencias = items || []),
      error: (err) => console.error('Erro ao listar recorrências', err),
    });
  }

  toggleAjuda(): void {
    this.showAjuda = !this.showAjuda;
  }

  salvar(): void {
    const { descricao, valor, diaDoMes, categoriaId } = this.nova;
    if (
      !descricao ||
      !valor ||
      valor <= 0 ||
      !diaDoMes ||
      diaDoMes < 1 ||
      diaDoMes > 31 ||
      !categoriaId
    ) {
      this.message =
        'Preencha categoria, descrição, valor (>0) e um dia do mês entre 1 e 31.';
      return;
    }
    this.service.criarRecorrencia(this.nova).subscribe({
      next: () => {
        this.message = 'Recorrência criada com sucesso!';
        this.nova = { descricao: '', valor: 0, diaDoMes: 1, categoriaId: 1 };
        this.listar();
      },
      error: () => (this.message = 'Erro ao criar recorrência.'),
    });
  }

  excluir(r: Recorrencia): void {
    this.service.excluirRecorrencia(r.id).subscribe({
      next: () => {
        this.message = 'Recorrência removida.';
        this.listar();
      },
      error: () => (this.message = 'Erro ao remover recorrência.'),
    });
  }
}
