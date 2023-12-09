import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/core/services/notification.service';
import { UsuarioService } from 'src/app/core/services/usuario.service';
import { BaseFormComponent } from 'src/app/shared/base-form/base-form.component';
import { AuthService } from '../services/auth.service';
import { LocalStorageService } from '../services/local-storage.service';
import { AutenticarUsuarioViewModel } from '../models/autenticar-usuario.view-model';
import { TokenViewModel } from '../models/token.view-model';
import { LoaderService } from 'src/app/core/loader/services/loarder.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent extends BaseFormComponent implements OnInit{
  form!: FormGroup;
  autenticarVM!: AutenticarUsuarioViewModel;
 
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private usuarioService: UsuarioService,
    private localStorageService: LocalStorageService,
    private notificacao: NotificationService,
    private loader: LoaderService
  ) {
    super();
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      login: ['', [Validators.required]],
      senha: ['', [Validators.required, Validators.minLength(6)]]
    })
  }

  get login() {
    return this.form.get('login');
  }

  get senha() {
    return this.form.get('senha');
  }

  public Realizarlogin() {
    if(this.form.invalid){
      this.notificacao.erro('O formulario deve ser preenchido corretamente!');
      this.exibirMensagensValidacao(this.form);
      return;
    }

    this.autenticarVM = Object.assign({}, this.autenticarVM, this.form.value);

    this.loader.show();

    this.authService.autenticarUsuario(this.autenticarVM).subscribe({
      next: (log) => {
        this.processarSucesso(log)
      },
      error: (err) => this.processarErro(err)
    })
  }

  private processarSucesso(loginRealizado: TokenViewModel) {
    this.localStorageService.salvarDadosLocaisUsuario(loginRealizado);
    this.usuarioService.logarUsuario(loginRealizado.usuario);
    this.loader.hide();
    this.router.navigate(['/dashboard']);
  }

  private processarErro(erro: any) {
    this.notificacao.erro(erro);
    this.loader.hide();
  }
}
