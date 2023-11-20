import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PacienteService } from '../services/paciente.service';
import { FormPacienteViewModel } from '../models/form-paciente.view-model';
import { BaseFormComponent } from 'src/app/shared/base-form/base-form.component';
import { NotificationService } from 'src/app/core/services/notification.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inseir-paciente',
  templateUrl: './inseir-paciente.component.html',
  styleUrls: ['./inseir-paciente.component.scss']
})
export class InseirPacienteComponent extends BaseFormComponent implements OnInit {
  formPaciente!: FormGroup;
  public pacienteFormViewModel?: FormPacienteViewModel;

  constructor(private pacienteService: PacienteService,
     private formBuilder: FormBuilder,
     private notificacao: NotificationService,
     private router: Router) {super()}

     ngOnInit(): void {
      this.formPaciente = this.formBuilder.group({
        nome: ['', [Validators.required, Validators.minLength(3)]],
        telefone: ['', [Validators.required, Validators.pattern(/^[1-9]{2} [0-9]{4,5}-[0-9]{4}$/)]],
        email: ['', [Validators.required, Validators.email]],
        telefoneFamiliar: ['', [Validators.required, Validators.pattern(/^[1-9]{2} [0-9]{4,5}-[0-9]{4}$/)]],
        cpf: ['', [Validators.required, Validators.minLength(11), Validators.maxLength(11)]],
        cep: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(8)]]
      })
    }

  public gravar(){
    if(this.formPaciente.invalid)
    {
      this.notificacao.aviso("O formulário deve ser preenchido corretamente!");
      this.exibirMensagensValidacao(this.formPaciente);
      return;
    }

    this.pacienteFormViewModel = Object.assign({}, this.pacienteFormViewModel, this.formPaciente.value);

    console.log(this.pacienteFormViewModel);

    this.pacienteService.inserir(this.pacienteFormViewModel!)
    .subscribe({
      next: (paciente) => this.processarSucesso(paciente),
      error: (erro) => this.processarErro(erro)
    })
  }

  private processarSucesso(paciente: FormPacienteViewModel){
    this.notificacao.sucesso(`O paciente ${paciente.nome} foi inserido com sucesso!`)
    this.router.navigate(['/pacientes/listar'])
  }

  private processarErro(erro: any){
    this.notificacao.erro(erro);
  }

  get nome() {
    return this.formPaciente.get('nome');
  }

  get telefone() {
    return this.formPaciente.get('telefone');
  }

  get email() {
    return this.formPaciente.get('email');
  }

  get cep() {
    return this.formPaciente.get('cep');
  }

  get cpf() {
    return this.formPaciente.get('cpf');
  }

  get telefoneFamiliar() {
    return this.formPaciente.get('telefoneFamiliar');
  }

 
}
