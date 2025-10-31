import { Component, HostListener } from '@angular/core';
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
  showMobileMenu = false;
  isMobileScreen = false;

  constructor(private router: Router) {
    this.checkScreen();
  }

  @HostListener('window:resize')
  checkScreen() {
    this.isMobileScreen = window.innerWidth <= 600;
    if (!this.isMobileScreen) {
      this.showMobileMenu = false;
    }
  }

  toggleMobileMenu() {
    this.showMobileMenu = !this.showMobileMenu;
  }

  closeMobileMenu() {
    this.showMobileMenu = false;
  }

  logout(): void {
    localStorage.removeItem('authToken');
    this.router.navigate(['/login'], { replaceUrl: true });
  }
}
