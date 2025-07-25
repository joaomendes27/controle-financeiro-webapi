import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  private apiUrl = 'https://localhost:7181/api/Transacoes'; // Endpoint de Transações
  private apiUrlDownload = 'https://localhost:7181/api/Relatorio/download';

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

    // Pega o mês e ano atual
    const dataAtual = new Date();
    const mesAtual = dataAtual.getMonth() + 1;
    const anoAtual = dataAtual.getFullYear();

    // Cria o FormData
    const formData = new FormData();
    formData.append('mes', mesAtual.toString());
    formData.append('ano', anoAtual.toString());

    // Envia a requisição POST com FormData
    return this.http.post(`${this.apiUrlDownload}`, formData, {
      responseType: 'blob',
      headers,
    });
  }

  // Método para adicionar uma nova transação
  adicionarTransacao(transacao: any): Observable<any> {
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    const formData = new FormData();
    formData.append('Valor', transacao.valor.toString());
    formData.append('Descricao', transacao.descricao);
    formData.append('CategoriaID', transacao.categoriaID.toString());
    formData.append(
      'DataTransacao',
      new Date(transacao.dataTransacao).toISOString()
    );

    return this.http.post(this.apiUrl, formData, { headers });
  }

  // Método para listar as receitas do usuário
  listarReceitas(): Observable<any[]> {
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get<any[]>(`${this.apiUrl}/usuario?tipo=1`, { headers });
  }

  // Método para listar as despesas do usuário
  listarDespesas(): Observable<any[]> {
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get<any[]>(`${this.apiUrl}/usuario?tipo=2`, { headers });
  }
}
