import { Component } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';
import { LocalStorageService } from 'src/app/auth/services/local-storage.service';
import { UsuarioService } from '../services/usuario.service';
import { Router } from '@angular/router';
import { NotificationService } from '../services/notification.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  events: string[] = [];
  opened: boolean = true;

  constructor(private authService: AuthService, private localStorageService: LocalStorageService,private usuarioService: UsuarioService, private router: Router, private notificacao: NotificationService){

  }

  sair(){
    console.log('sair');
    this.authService.logout().subscribe({
      next: () => this.processarSucesso(),
      error: (err) => this.processarErro(err)
    });
  }

  private processarSucesso() {
    this.localStorageService.limparDadosLocais();
    this.usuarioService.logout();
    this.router.navigate(['/conta/autenticar']);
  }

  private processarErro(erro: any) {
    this.notificacao.erro(erro);
  }
}
