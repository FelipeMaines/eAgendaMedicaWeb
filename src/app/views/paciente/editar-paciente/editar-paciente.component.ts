import { Component, OnInit } from '@angular/core';
import { FormPacienteViewModel } from '../models/form-paciente.view-model';
import { ActivatedRoute, Router } from '@angular/router';
import { PacienteService } from '../services/paciente.service';
import { NotificationService } from 'src/app/core/services/notification.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BaseFormComponent } from 'src/app/shared/base-form/base-form.component';

@Component({
  selector: 'app-editar-paciente',
  templateUrl: './editar-paciente.component.html',
  styleUrls: ['./editar-paciente.component.scss']
})
export class EditarPacienteComponent extends BaseFormComponent implements OnInit{
  pacienteViewModel!: FormPacienteViewModel
  formPaciente!: FormGroup
  
  constructor(private route: ActivatedRoute, private pacienteService: PacienteService,
     private router: Router, private notificacao: NotificationService, private formBuilder: FormBuilder ) {super()}

  ngOnInit(): void {
    this.pacienteViewModel = this.route.snapshot.data['paciente'];

    console.log(this.pacienteViewModel);

    this.formPaciente = this.formBuilder.group({
      nome: ['', [Validators.required, Validators.minLength(3)]],
      telefone: ['', [Validators.required, Validators.pattern(/^[1-9]{2} [0-9]{4,5}-[0-9]{4}$/)]],
      email: ['', [Validators.required, Validators.email]],
      telefoneFamiliar: ['', [Validators.required, Validators.pattern(/^[1-9]{2} [0-9]{4,5}-[0-9]{4}$/)]],
      cpf: ['', [Validators.required, Validators.minLength(11), Validators.maxLength(11)]],
      cep: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(8)]]
    })

    this.formPaciente.patchValue(this.pacienteViewModel);
  }

  public gravar(){

    if(this.formPaciente.invalid)
    {
      this.notificacao.aviso("Preencha o formulario corretamente!");
      this.exibirMensagensValidacao(this.formPaciente);
      return;
    }

    const id = this.route.snapshot.paramMap.get('id');

    this.pacienteViewModel = this.formPaciente.value;

    this.pacienteService.editar(this.pacienteViewModel, id!).subscribe({
      next: (res) => this.processarSucesso(res),
      error: (err) => this.processarErro(err)
    })
  }

  private processarSucesso(paciente: FormPacienteViewModel){
    this.notificacao.sucesso(`O paciente ${paciente.nome} foi editado com sucesso!`)
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
