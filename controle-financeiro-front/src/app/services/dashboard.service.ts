import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  private apiUrl = 'https://localhost:7181/api/Transacoes/relatorio';

  constructor(private http: HttpClient) {}

  getRelatorioMensal(mes: number, ano: number): Observable<any> {
    const params = new HttpParams()
      .set('mes', mes.toString())
      .set('ano', ano.toString());

    return this.http.get(`${this.apiUrl}`, { params });
  }

  baixarRelatorio(): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/download`, { responseType: 'blob' });
  }
}
