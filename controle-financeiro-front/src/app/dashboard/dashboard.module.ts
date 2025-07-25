import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms'; // Certifique-se que está aqui!

import { DashboardLayout } from './layout/dashboard-layout';
import { DashboardHome } from './pages/dashboard-home';
import { AdicionarTransacao } from './pages/adicionar-transacao.component';
import { ListarTransacoes } from './pages/listar-transacoes';

@NgModule({
  imports: [
    CommonModule,
    FormsModule, // Aqui está a chave! Isso já parece correto.
    RouterModule.forChild([
      {
        path: '',
        component: DashboardLayout,
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
