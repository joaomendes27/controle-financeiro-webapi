import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-dashboard-layout',
  templateUrl: './sidebar.html',
  styleUrls: ['./sidebar.scss'],
  standalone: true,
  imports: [CommonModule, RouterModule],
})
export class DashboardLayout {
  constructor(private router: Router) {}

  logout(): void {
    localStorage.removeItem('authToken');
    this.router.navigate(['/login'], { replaceUrl: true });
  }
}
