import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TransacoesService {
  private apiUrl = 'https://localhost:5001/api/Transacoes';
  private _changed$ = new Subject<void>();
  changed$ = this._changed$.asObservable();

  constructor(private http: HttpClient) {}

  adicionarTransacao(transacao: any): Observable<any> {
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${token}`)
      .set('Content-Type', 'application/json');

    return this.http
      .post(`${this.apiUrl}/adicionar`, transacao, { headers })
      .pipe(tap(() => this._changed$.next()));
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
    return this.http
      .delete<void>(`${this.apiUrl}/${id}`, { headers })
      .pipe(tap(() => this._changed$.next()));
  }

  getComparativoMesAnterior(
    dia: number,
    mes: number,
    ano: number
  ): Observable<{
    totalReceitas: number;
    totalDespesas: number;
    saldo: number;
  }> {
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${token}`)
      .set('Content-Type', 'application/json');

    const usuarioId = this.getUsuarioIdFromToken(token ?? '');
    const payload = { dia, mes, ano, usuarioId };

    return this.http.post<{
      totalReceitas: number;
      totalDespesas: number;
      saldo: number;
    }>(`${this.apiUrl}/comparativoMesAnterior`, payload, { headers });
  }
}
