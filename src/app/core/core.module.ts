import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarModule } from './navbar/navbar.module';
import { NotificationService } from './services/notification.service';
import { MAT_SNACK_BAR_DEFAULT_OPTIONS, MatSnackBarModule } from '@angular/material/snack-bar';
import { UsuarioService } from './services/usuario.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoaderComponent } from './loader/loader.component';
import { LoaderService } from './loader/services/loarder.service';



@NgModule({
  declarations: [
    LoaderComponent
  ],
  imports: [
    NavbarModule,
    MatSnackBarModule
  ],
  exports: [NavbarModule, LoaderComponent],
  providers: [
    UsuarioService,
    {
      provide: MAT_SNACK_BAR_DEFAULT_OPTIONS,
      useValue: {
        duration: 3000,
        horizontalPosition: 'right',
      }
    },
    NotificationService,
    LoaderService
    ]
})
export class CoreModule { }
