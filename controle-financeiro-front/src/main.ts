import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app'; // O componente raiz
import { appConfig } from './app/app.config'; // O arquivo de configuração

// Inicia a aplicação diretamente com o componente principal
bootstrapApplication(AppComponent, appConfig).catch((err) =>
  console.error(err)
);
