import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.scss'],
  standalone: true,
  imports: [FormsModule],
})
export class CadastroComponent {
  form = {
    nome: '',
    email: '',
    senha: '',
  };

  constructor(private http: HttpClient, private router: Router) {}

  cadastrar() {
    const formData = new FormData();
    formData.append('Nome', this.form.nome);
    formData.append('Email', this.form.email);
    formData.append('Senha', this.form.senha);

    // Fazendo o POST para a API de cadastro
    this.http
      .post('https://localhost:7181/api/Usuario/cadastrar', formData, {
        responseType: 'text',
      })
      .subscribe({
        next: (response) => {
          alert(response); // A resposta será a mensagem de sucesso
          this.router.navigate(['/auth']); // Redireciona para a página de login (ou qualquer outra página desejada)
        },
        error: (err) => {
          console.error('Erro ao cadastrar usuário', err);

          // Verificando o tipo de erro retornado pela API e mostrando alert
          if (err.error) {
            if (err.error === 'Nome de usuário já está em uso.') {
              alert(
                'O nome de usuário já está em uso. Por favor, escolha outro.'
              );
            } else if (err.error === 'E-mail já está em uso.') {
              alert('O e-mail já está em uso. Por favor, escolha outro.');
            } else {
              alert('Erro desconhecido. Tente novamente mais tarde.');
            }
          } else {
            alert(
              'Erro na comunicação com o servidor. Tente novamente mais tarde.'
            );
          }
        },
      });
  }
}
