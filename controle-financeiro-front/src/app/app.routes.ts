import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component'; // Componente Login
import { DashboardLayout } from './dashboard/layout/dashboard-layout'; // Componente do Layout do Dashboard
import { DashboardHome } from './dashboard/pages/dashboard-home'; // Componente da página principal do Dashboard
import { AdicionarTransacao } from './dashboard/pages/adicionar-transacao'; // Página de adicionar transações
import { ListarTransacoes } from './dashboard/pages/listar-transacoes'; // Página de listar transações

export const routes: Routes = [
  {
    path: 'login', // Rota de login
    component: LoginComponent, // Componente de login
  },
  {
    path: 'dashboard', // Rota do dashboard
    component: DashboardLayout,
    children: [
      { path: '', component: DashboardHome }, // Página inicial do dashboard
      { path: 'nova-transacao', component: AdicionarTransacao }, // Página para adicionar transações
      { path: 'listar-transacoes', component: ListarTransacoes }, // Página para listar transações
    ],
  },
  { path: '**', redirectTo: 'login' }, // Redireciona qualquer outra rota para o login
];
