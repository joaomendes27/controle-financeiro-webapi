import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard-home',
  templateUrl: './dashboard-home.html',
  styleUrls: ['./dashboard-home.scss'],
  standalone: true,
  imports: [CommonModule],
})
export class DashboardHome {
  totalReceitas: number = 0;
  totalDespesas: number = 0;
  saldo: number = 0;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.carregarRelatorioMensal();
  }

  carregarRelatorioMensal() {
    // Aqui você pode chamar sua API para obter os valores de receita e despesa
    this.http.get('https://localhost:7181/api/Relatorio/download').subscribe({
      next: (relatorio: any) => {
        this.totalReceitas = relatorio.totalReceitas;
        this.totalDespesas = relatorio.totalDespesas;
        this.saldo = relatorio.saldo;
      },
      error: (err) => {
        console.error('Erro ao carregar relatório:', err);
      },
    });
  }

  baixarRelatorio() {
    // Implementação do método de download de relatório
    this.http
      .get('https://localhost:7181/api/Relatorio/download', {
        responseType: 'blob',
      })
      .subscribe({
        next: (data) => {
          const url = window.URL.createObjectURL(data);
          const a = document.createElement('a');
          a.href = url;
          a.download = 'relatorio-financeiro.pdf';
          a.click();
          window.URL.revokeObjectURL(url);
        },
        error: (err) => {
          console.error('Erro ao baixar relatório:', err);
        },
      });
  }
}
