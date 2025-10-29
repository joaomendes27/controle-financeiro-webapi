import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../../services/dashboard.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard-home',
  templateUrl: './dashboard-home.html',
  styleUrls: ['./dashboard-home.scss'],
  standalone: true,
  imports: [CommonModule],
})
export class DashboardHome implements OnInit {
  totalReceitas: number = 0;
  totalDespesas: number = 0;
  saldo: number = 0;

  constructor(private dashboardService: DashboardService) {}

  ngOnInit() {
    this.carregarRelatorioMensal();
  }

  carregarRelatorioMensal() {
    const dataAtual = new Date();
    const mesAtual = dataAtual.getMonth() + 1; // O mês começa do 0, então adicionamos 1
    const anoAtual = dataAtual.getFullYear();

    this.dashboardService.getRelatorioMensal(mesAtual, anoAtual).subscribe({
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

  baixarRelatorio() {
    this.dashboardService.baixarRelatorio().subscribe({
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
