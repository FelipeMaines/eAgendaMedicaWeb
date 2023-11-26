import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarModule } from './navbar/navbar.module';
import { NotificationService } from './services/notification.service';
import { MAT_SNACK_BAR_DEFAULT_OPTIONS, MatSnackBarModule } from '@angular/material/snack-bar';
import { UsuarioService } from './services/usuario.service';



@NgModule({
  declarations: [],
  imports: [
    NavbarModule,
    MatSnackBarModule
  ],
  exports: [NavbarModule],
  providers: [
    {
      provide: MAT_SNACK_BAR_DEFAULT_OPTIONS,
      useValue: {
        duration: 3000,
        horizontalPosition: 'right',
      }
    },
    UsuarioService,
    NotificationService]
})
export class CoreModule { }
