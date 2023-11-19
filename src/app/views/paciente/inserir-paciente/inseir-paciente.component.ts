import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PacienteService } from '../services/paciente.service';

@Component({
  selector: 'app-inseir-paciente',
  templateUrl: './inseir-paciente.component.html',
  styleUrls: ['./inseir-paciente.component.scss']
})
export class InseirPacienteComponent implements OnInit{
  formPaciente!: FormGroup;

  constructor(private pacienteService: PacienteService, private formBuilder: FormBuilder) {}

  public gravar(){

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
}
