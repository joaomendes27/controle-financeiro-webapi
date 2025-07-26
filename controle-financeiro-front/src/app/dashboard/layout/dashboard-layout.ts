import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard-layout',
  templateUrl: './dashboard-layout.html',
  styleUrls: ['./dashboard-layout.scss'],
  standalone: true,
  imports: [CommonModule, RouterModule],
})
export class DashboardLayout {
  constructor(private router: Router) {}

  logout(): void {
    // Limpar o token de autenticação
    localStorage.removeItem('authToken');

    // Forçar a navegação para o login e limpar o histórico de navegação
    this.router.navigate(['/login'], { replaceUrl: true });
  }
}
