import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  private apiUrl = 'https://localhost:7181/api/Transacoes'; // Endpoint de Transações

  constructor(private http: HttpClient) {}

  // Método para obter o relatório mensal
  getRelatorioMensal(mes: number, ano: number): Observable<any> {
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get(`${this.apiUrl}/relatorio`, {
      headers,
      params: { mes, ano },
    });
  }

  // Método para baixar o relatório
  baixarRelatorio(): Observable<Blob> {
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get(`${this.apiUrl}/download`, {
      responseType: 'blob',
      headers,
    });
  }

  // Método para adicionar uma nova transação (ALTERADO PARA USAR FormData)
  adicionarTransacao(transacao: any): Observable<any> {
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    // Criando o FormData
    const formData = new FormData();
    formData.append('Valor', transacao.valor.toString()); // Convertendo para string, já que o FormData não aceita números diretamente
    formData.append('Descricao', transacao.descricao);
    formData.append('CategoriaID', transacao.categoriaID.toString());
    formData.append(
      'DataTransacao',
      new Date(transacao.dataTransacao).toISOString()
    ); // Convertendo a data para o formato ISO

    // Enviar os dados com o FormData
    return this.http.post(this.apiUrl, formData, { headers });
  }
}
