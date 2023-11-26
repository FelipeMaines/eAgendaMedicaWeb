
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from './services/auth.service';
import { LocalStorageService } from './services/local-storage.service';
import { RegistroComponent } from './registro/registro.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { MatToolbarModule } from '@angular/material/toolbar';
import { HttpClientModule } from '@angular/common/http';
import { AuthGuard } from './services/auth.guard';
import { LoginGuard } from './services/login.guard';



@NgModule({
  declarations: [
    LoginComponent,
    RegistroComponent
  ],
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatToolbarModule,

    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,

    SharedModule
  ],
  exports: [LoginComponent],

  providers: [AuthService, LocalStorageService, AuthGuard, LoginGuard]
})
export class AuthModule { }
