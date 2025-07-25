import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.scss'],
  standalone: true,
  imports: [FormsModule],
})
export class LoginComponent {
  form = {
    emailOuUsuario: '',
    senha: '',
  };

  constructor(public router: Router, private http: HttpClient) {}

  login() {
    const formData = new FormData();
    formData.append('EmailOuUsuario', this.form.emailOuUsuario);
    formData.append('Senha', this.form.senha);

    // Fazendo o POST para a API de login
    this.http
      .post('https://localhost:7181/api/Usuario/login', formData)
      .subscribe({
        next: (res: any) => {
          console.log('Login sucesso', res);

          // Armazenar o token no localStorage ou sessionStorage
          const token = res.token; // Supondo que a resposta contenha um campo 'token'
          localStorage.setItem('authToken', token);

          // Redirecionar para a página do dashboard após o login
          this.router.navigate(['/dashboard']);
        },
        error: (err) => {
          alert('Usuário ou Senha inváldos!');
          console.error('Erro ao logar', err);
        },
      });
  }
  navigateToCadastro() {
    console.log('Botão "Cadastrar" foi clicado');
    this.router.navigate(['/auth/cadastro']);
  }
}
