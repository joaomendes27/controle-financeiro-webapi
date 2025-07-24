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

  constructor(private http: HttpClient, private router: Router) {}

  login() {
    const formData = new FormData();
    formData.append('EmailOuUsuario', this.form.emailOuUsuario);
    formData.append('Senha', this.form.senha);

    this.http
      .post('https://localhost:7181/api/Usuario/login', formData)
      .subscribe({
        next: (res) => {
          console.log('Login sucesso', res);
        },
        error: (err) => {
          console.error('Erro ao logar', err);
        },
      });
  }
}
