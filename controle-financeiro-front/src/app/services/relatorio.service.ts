import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RelatorioService {
  private apiUrl = 'https://localhost:5001/api/Transacoes';
  private apiUrlDownload = 'https://localhost:5001/api/Relatorio/download';

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

    return this.http.post(`${this.apiUrlDownload}`, payload, {
      responseType: 'blob',
      headers,
    });
  }
}
