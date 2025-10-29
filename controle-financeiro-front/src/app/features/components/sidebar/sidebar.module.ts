import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { DashboardLayout } from './sidebar';
import { DashboardHome } from '../dashboard-home/dashboard-home';
import { AdicionarTransacao } from '../adicionar-transacao/adicionar-transacao.component';
import { ListarTransacoes } from '../listar-transacoes/listar-transacoes.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
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
