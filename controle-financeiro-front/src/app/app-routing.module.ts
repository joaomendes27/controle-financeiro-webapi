import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './features/auth/components/login/login.component';
import { DashboardLayout } from './features/components/sidebar/sidebar';
import { DashboardHome } from './features/components/dashboard-home/dashboard-home';
import { AdicionarTransacao } from './features/components/adicionar-transacao/adicionar-transacao.component';
import { ListarTransacoes } from './features/components/listar-transacoes/listar-transacoes.component';
import { RecorrenciasComponent } from './features/components/recorrencias/recorrencias.component';
import { AuthGuard } from './features/auth/guards/auth-guard';

export const routes: Routes = [
  // Redireciona para login inicialmente
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  // Rota para o módulo de autenticação com lazy loading
  {
    path: 'auth',
    loadChildren: () =>
      import('./features/auth/auth.module').then((m) => m.AuthModule),
  },

  // Login direto (se preferir deixar separado do módulo 'auth')
  {
    path: 'login',
    component: LoginComponent,
  },

  // Rota protegida: Dashboard
  {
    path: 'dashboard',
    component: DashboardLayout,
    canActivate: [AuthGuard], // Protegendo as rotas com o AuthGuard
    children: [
      { path: '', component: DashboardHome },
      { path: 'nova-transacao', component: AdicionarTransacao },
      { path: 'listar-transacoes', component: ListarTransacoes },
      { path: 'recorrencias', component: RecorrenciasComponent },
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
