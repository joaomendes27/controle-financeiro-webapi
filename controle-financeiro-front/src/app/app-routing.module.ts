import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { DashboardLayout } from './dashboard/layout/dashboard-layout';
import { DashboardHome } from './dashboard/pages/dashboard-home';
import { AdicionarTransacao } from './dashboard/pages/adicionar-transacao.component';
import { ListarTransacoes } from './dashboard/pages/listar-transacoes.component';

export const routes: Routes = [
  // Redireciona para login inicialmente
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  // Rota para o módulo de autenticação com lazy loading
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },

  // Login direto (se preferir deixar separado do módulo 'auth')
  {
    path: 'login',
    component: LoginComponent,
  },
  { path: 'login', component: LoginComponent },

  // Rota protegida: Dashboard
  {
    path: 'dashboard',
    component: DashboardLayout,
    children: [
      { path: '', component: DashboardHome },
      { path: 'nova-transacao', component: AdicionarTransacao },
      { path: 'listar-transacoes', component: ListarTransacoes },
    ],
  },

  // Qualquer outra rota inválida redireciona para login
  { path: '**', redirectTo: 'login' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
