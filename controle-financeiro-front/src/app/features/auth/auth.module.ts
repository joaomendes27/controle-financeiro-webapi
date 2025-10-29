// src/app/auth/auth.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [CommonModule, FormsModule, AuthRoutingModule],
})
export class AuthModule {}
