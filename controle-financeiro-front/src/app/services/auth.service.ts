import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private readonly apiUrl = "https://localhost:5001/api/Usuario";

  constructor(private http: HttpClient) {}

  login(credentials: {
    emailOuUsuario: string;
    senha: string;
  }): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials);
  }

  cadastrar(dados: {
    nome: string;
    email: string;
    senha: string;
  }): Observable<any> {
    return this.http.post(`${this.apiUrl}/cadastrar`, dados, {
      responseType: "text",
    });
  }
}
