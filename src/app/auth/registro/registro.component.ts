import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BaseFormComponent } from 'src/app/shared/base-form/base-form.component';
import { RegistrarUsuarioViewModel } from '../models/registrar-usuarui.view-model';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { UsuarioService } from 'src/app/core/services/usuario.service';
import { LocalStorageService } from '../services/local-storage.service';
import { NotificationService } from 'src/app/core/services/notification.service';
import { confirmarSenhaValidator } from '../validatores/confirmar-senha.validator';
import { TokenViewModel } from '../models/token.view-model';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss']
})
export class RegistroComponent extends BaseFormComponent implements OnInit {

  form!: FormGroup;
  registroVM!: RegistrarUsuarioViewModel;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private usuarioService: UsuarioService,
    private localStorageService: LocalStorageService,
    private notificacao: NotificationService
  ) {
    super();
  }
  
  ngOnInit(): void {
    this.form = this.fb.group({
      nome: ['', [Validators.minLength(3), Validators.required]],
      login: ['', [Validators.minLength(3), Validators.required]],
      email: ['', [Validators.email, Validators.required]],
      senha: ['', [Validators.minLength(6), Validators.required]],
      confirmarSenha: ['', [Validators.required]]
    }, { validators: confirmarSenhaValidator() });
  }

  get nome() {
    return this.form.get('nome');
  }

  get login() {
    return this.form.get('login');
  }

  get email() {
    return this.form.get('email');
  }

  get senha() {
    return this.form.get('senha');
  }

  get confirmarSenha() {
    return this.form.get('confirmarSenha');
  }


  public registrar() {
    if (this.form.invalid) {
      this.notificacao.erro('Por favor, preencha o formulário corretamente antes de prosseguir.');
      this.exibirMensagensValidacao(this.form);
      return;
    }

    this.registroVM = Object.assign({}, this.registroVM, this.form.value);

    this.authService.registrarUsuario(this.registroVM)
      .subscribe({
        next: (registroRealizado) => this.processarSucesso(registroRealizado),
        error: (erro) => this.processarFalha(erro)
      });
  }

  private processarSucesso(registroRealizado: TokenViewModel) {
    this.localStorageService.salvarDadosLocaisUsuario(registroRealizado);
    this.usuarioService.logarUsuario(registroRealizado.usuario);
    this.router.navigate(['/dashboard']);
  }

  private processarFalha(erro: any) {
    this.notificacao.erro(erro);
  }
}
