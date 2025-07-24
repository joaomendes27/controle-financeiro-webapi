import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// Importando os componentes standalone diretamente
import { DashboardLayout } from './layout/dashboard-layout';
import { DashboardHome } from './pages/dashboard-home';
import { AdicionarTransacao } from './pages/adicionar-transacao';
import { ListarTransacoes } from './pages/listar-transacoes';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: DashboardLayout, // Usando diretamente o componente standalone aqui
        children: [
          { path: '', component: DashboardHome },
          { path: 'nova-transacao', component: AdicionarTransacao },
          { path: 'listar-transacoes', component: ListarTransacoes },
        ],
      },
    ]),
  ],
})
export class DashboardModule {}
