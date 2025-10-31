import { Component, OnInit } from '@angular/core';
import { RelatorioService } from '../../../services/relatorio.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard-home',
  templateUrl: './dashboard-home.html',
  styleUrls: ['./dashboard-home.scss'],
  standalone: true,
  imports: [CommonModule],
})
export class DashboardHome implements OnInit {
  totalReceitas = 0;
  totalDespesas = 0;
  saldo = 0;

  constructor(private relatorioService: RelatorioService) {}

  ngOnInit(): void {
    this.carregarRelatorioMensal();
  }

  carregarRelatorioMensal(): void {
    const dataAtual = new Date();
    const mesAtual = dataAtual.getMonth() + 1;
    const anoAtual = dataAtual.getFullYear();

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
}
