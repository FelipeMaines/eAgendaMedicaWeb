import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { UsuarioTokenViewModel } from 'src/app/auth/models/token.view-model';
import { UsuarioService } from 'src/app/core/services/usuario.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit{
  usuarioLogado$!: Observable<UsuarioTokenViewModel | null>

  constructor(private usuarioService: UsuarioService){}

  ngOnInit(): void {
    this.usuarioLogado$ = this.usuarioService.usuarioLogado;
  }
}
