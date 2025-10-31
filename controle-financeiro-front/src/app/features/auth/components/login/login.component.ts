import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../../services/auth.service';

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

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    localStorage.removeItem('authToken');
  }

  login() {
    this.authService.login(this.form).subscribe({
      next: (res: any) => {
        const token = res.token;
        localStorage.setItem('authToken', token);
        this.router.navigate(['/dashboard']);
      },
      error: () => {
        alert('Usuário ou Senha inválidos!');
      },
    });
  }

  navigateToCadastro() {
    this.router.navigate(['/auth/cadastro']);
  }
}
