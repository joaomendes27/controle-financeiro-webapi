import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-dashboard-layout',
  templateUrl: './dashboard-layout.html',
  styleUrls: ['./dashboard-layout.scss'],
  standalone: true,
  imports: [CommonModule, RouterModule],
})
export class DashboardLayout {}
