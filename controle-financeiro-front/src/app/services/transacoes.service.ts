import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TransacoesService {
  private apiUrl = 'https://localhost:5001/api/Transacoes';

  constructor(private http: HttpClient) {}

  adicionarTransacao(transacao: any): Observable<any> {
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${token}`)
      .set('Content-Type', 'application/json');

    return this.http.post(`${this.apiUrl}/adicionar`, transacao, { headers });
  }

  private getUsuarioIdFromToken(token: string): number | null {
    if (!token) return null;
    const payload = token.split('.')[1];
    const decodedPayload = atob(payload);
    const payloadObj = JSON.parse(decodedPayload);
    // Ajuste o nome do campo conforme o backend (ex: 'nameid', 'sub', 'usuarioId', etc)
    return Number(
      payloadObj['usuarioId'] || payloadObj['nameid'] || payloadObj['sub']
    );
  }

  listarTransacoesPorUsuario(): Observable<any[]> {
    const token = localStorage.getItem('authToken');
    const usuarioId = this.getUsuarioIdFromToken(token ?? '');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    // Envia o usuarioId como query string
    return this.http.get<any[]>(
      `${this.apiUrl}/listarPorUsuario?usuarioId=${usuarioId}`,
      { headers }
    );
  }
}
