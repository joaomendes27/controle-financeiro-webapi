import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RelatorioService {
  private apiUrl = 'https://localhost:5001/api/Transacoes';
  private relatorioBaseUrl = 'https://localhost:5001/api/Relatorio';

  constructor(private http: HttpClient) {}

  getRelatorioMensal(mes: number, ano: number): Observable<any> {
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get(`${this.apiUrl}/relatorio`, {
      headers,
      params: { mes, ano },
    });
  }

  baixarRelatorio(): Observable<Blob> {
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${token}`)
      .set('Content-Type', 'application/json');

    const dataAtual = new Date();
    const mesAtual = dataAtual.getMonth() + 1;
    const anoAtual = dataAtual.getFullYear();

    const payload = { mes: mesAtual, ano: anoAtual };

    // Mantido por compatibilidade: endpoint antigo de download
    return this.http.post(`${this.relatorioBaseUrl}/download`, payload, {
      responseType: 'blob',
      headers,
    });
  }

  baixarPdf(mes?: number, ano?: number): Observable<Blob> {
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${token}`)
      .set('Content-Type', 'application/json');

    const dataAtual = new Date();
    const payload = {
      mes: mes ?? dataAtual.getMonth() + 1,
      ano: ano ?? dataAtual.getFullYear(),
    };

    return this.http.post(`${this.relatorioBaseUrl}/pdf`, payload, {
      responseType: 'blob',
      headers,
    });
  }

  baixarExcel(mes?: number, ano?: number): Observable<Blob> {
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${token}`)
      .set('Content-Type', 'application/json');

    const dataAtual = new Date();
    const payload = {
      mes: mes ?? dataAtual.getMonth() + 1,
      ano: ano ?? dataAtual.getFullYear(),
    };

    return this.http.post(`${this.relatorioBaseUrl}/excel`, payload, {
      responseType: 'blob',
      headers,
    });
  }
}
