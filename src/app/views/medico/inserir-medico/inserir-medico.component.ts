import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FormMedicoViewModel } from '../models/form-medico.view-model';
import { BaseFormComponent } from 'src/app/shared/base-form/base-form.component';
import { MedicoService } from '../services/medico.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/core/services/notification.service';

@Component({
  selector: 'app-inserir-medico',
  templateUrl: './inserir-medico.component.html',
  styleUrls: ['./inserir-medico.component.scss']
})
export class InserirMedicoComponent extends BaseFormComponent implements OnInit{
  medicoVM!: FormMedicoViewModel
  formMedico!: FormGroup; 

  constructor(private medicoService: MedicoService,
    private formBuilder: FormBuilder,
    private notificacao: NotificationService,
    private router: Router) {super()}

  ngOnInit(): void {
    this.formMedico = this.formBuilder.group({
      nome: ['', [Validators.required, Validators.minLength(3)]],
      telefone: ['', [Validators.required, Validators.pattern(/^[1-9]{2} [0-9]{4,5}-[0-9]{4}$/)]],
      email: ['', [Validators.required, Validators.email]],
      cpf: ['', [Validators.required, Validators.minLength(11), Validators.maxLength(11)]],
      cep: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(8)]],
      crm: ['', [Validators.required, Validators.pattern('^\\d{5}-[A-Z]{2}$')]],
      foto: [''],
  })

}

public gravar(){
  if(this.formMedico.invalid)
  {
    this.notificacao.aviso("O formulário deve ser preenchido corretamente!");
    this.exibirMensagensValidacao(this.formMedico);
    return;
  }

  this.medicoVM = Object.assign({}, this.medicoVM, this.formMedico.value);

  console.log(this.medicoVM);

  this.medicoService.inserir(this.medicoVM!)
  .subscribe({
    next: (medico) => this.processarSucesso(medico),
    error: (erro) => this.processarErro(erro)
  })
}


private processarSucesso(medico: FormMedicoViewModel){
  this.notificacao.sucesso(`O medico ${medico.nome} foi inserido com sucesso!`)
  this.router.navigate(['/medicos/listar'])
}

private processarErro(erro: any){
  this.notificacao.erro(erro);
}

onFileSelected(event: any) {
  const file: File = event.target.files[0];
  if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
          this.formMedico.get('foto')!.setValue(e.target.result);
      };
      reader.readAsDataURL(file);
  }
}

get nome() {
  return this.formMedico.get('nome');
}

get telefone() {
  return this.formMedico.get('telefone');
}

get email() {
  return this.formMedico.get('email');
}

get cep() {
  return this.formMedico.get('cep');
}

get cpf() {
  return this.formMedico.get('cpf');
}

get crm() {
  return this.formMedico.get('crm');
}

get foto() {
  return this.formMedico.get('foto');
}
}

