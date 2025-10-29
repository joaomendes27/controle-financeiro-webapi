import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module'; // O módulo de rotas
import { DashboardModule } from './features/components/sidebar/sidebar.module'; // O módulo do dashboard
import { AppComponent } from './app'; // O componente standalone
import { bootstrapApplication } from '@angular/platform-browser';

@NgModule({
  imports: [
    BrowserModule, // O módulo principal do Angular
    AppRoutingModule, // O módulo de rotas
    DashboardModule, // O módulo do dashboard
  ],
  providers: [],
})
export class AppModule {}

// Usando bootstrapApplication para inicializar o AppComponent standalone
bootstrapApplication(AppComponent);
