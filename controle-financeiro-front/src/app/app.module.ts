import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app';
import { bootstrapApplication } from '@angular/platform-browser';

@NgModule({
  imports: [BrowserModule, AppRoutingModule],
  providers: [],
})
export class AppModule {}

bootstrapApplication(AppComponent);
