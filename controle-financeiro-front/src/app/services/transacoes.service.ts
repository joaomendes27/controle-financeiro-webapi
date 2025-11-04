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

    return Number(
      payloadObj['usuarioId'] || payloadObj['nameid'] || payloadObj['sub']
    );
  }

  listarTransacoesPorUsuario(): Observable<any[]> {
    const token = localStorage.getItem('authToken');
    const usuarioId = this.getUsuarioIdFromToken(token ?? '');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<any[]>(
      `${this.apiUrl}/listarPorUsuario?usuarioId=${usuarioId}`,
      { headers }
    );
  }

  filtrarTransacoesPorMesAno(mes: number, ano: number): Observable<any[]> {
    const token = localStorage.getItem('authToken');
    const usuarioId = this.getUsuarioIdFromToken(token ?? '');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<any[]>(
      `${this.apiUrl}/filtrarTransacoesPorMesAno?usuarioId=${usuarioId}&mes=${mes}&ano=${ano}`,
      { headers }
    );
  }

  excluirTransacao(id: number): Observable<void> {
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.delete<void>(`${this.apiUrl}/${id}`, { headers });
  }
}
