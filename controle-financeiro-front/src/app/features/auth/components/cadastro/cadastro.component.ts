import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../../services/auth.service';

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

  constructor(private authService: AuthService, private router: Router) {}

  cadastrar() {
    if (!this.form.nome || !this.form.email || !this.form.senha) {
      alert('Preencha todos os campos.');
      return;
    }

    this.authService.cadastrar(this.form).subscribe({
      next: (response) => {
        alert(response);
        this.router.navigate(['/auth']);
      },
      error: (err) => this.handleError(err),
    });
  }

  private handleError(err: any) {
    console.error('Erro ao cadastrar usuário', err);

    if (err.error) {
      switch (err.error) {
        case 'Nome de usuário já está em uso.':
          alert('O nome de usuário já está em uso. Por favor, escolha outro.');
          break;
        case 'E-mail já está em uso.':
          alert('O e-mail já está em uso. Por favor, escolha outro.');
          break;
        default:
          alert('Erro desconhecido.');
      }
    } else {
      alert('Erro na comunicação com o servidor. Tente novamente mais tarde.');
    }
  }
}
