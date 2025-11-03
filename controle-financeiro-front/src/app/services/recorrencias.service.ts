import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface RecorrenciaPayload {
  descricao: string;
  valor: number;
  diaDoMes: number;
  categoriaId: number;
}

export interface Recorrencia extends RecorrenciaPayload {
  id: number;
}

@Injectable({ providedIn: 'root' })
export class RecorrenciasService {
  private apiUrl = 'https://localhost:5001/api/Recorrencias';

  constructor(private http: HttpClient) {}

  private authHeaders(): HttpHeaders {
    const token = localStorage.getItem('authToken') || '';
    return new HttpHeaders()
      .set('Authorization', `Bearer ${token}`)
      .set('Content-Type', 'application/json');
  }

  criarRecorrencia(body: RecorrenciaPayload): Observable<Recorrencia> {
    return this.http.post<Recorrencia>(`${this.apiUrl}`, body, {
      headers: this.authHeaders(),
    });
  }

  listarRecorrencias(): Observable<Recorrencia[]> {
    return this.http.get<Recorrencia[]>(this.apiUrl, {
      headers: this.authHeaders(),
    });
  }

  excluirRecorrencia(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, {
      headers: this.authHeaders(),
    });
  }
}
