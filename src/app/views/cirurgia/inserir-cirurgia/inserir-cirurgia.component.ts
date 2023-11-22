import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormCirurgiaViewModel } from '../models/form-cirurgia.view-model';
import { BaseFormComponent } from 'src/app/shared/base-form/base-form.component';
import { ActivatedRoute, Router } from '@angular/router';
import { MedicoService } from '../../medico/services/medico.service';
import { PacienteService } from '../../paciente/services/paciente.service';
import { NotificationService } from 'src/app/core/services/notification.service';
import { CirurgiaService } from '../services/cirurgia.service';
import { ListarMedicoViewModel } from '../../medico/models/listar-medico.view-model';
import { ListarPacienteViewModel } from '../../paciente/models/listar-paciente.view-model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-inserir-cirurgia',
  templateUrl: './inserir-cirurgia.component.html',
  styleUrls: ['./inserir-cirurgia.component.scss']
})
export class InserirCirurgiaComponent extends BaseFormComponent implements OnInit {
  formCirurgia!: FormGroup
  cirurgiaVM!: FormCirurgiaViewModel
  medicos$!: Observable<ListarMedicoViewModel[]>;
  pacientes$!: Observable<ListarPacienteViewModel[]>;

  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute,
    private medicoService: MedicoService, private pacienteService: PacienteService,
    private notificacao: NotificationService, private cirurgiaService: CirurgiaService,
    private router: Router) { super() }

  ngOnInit(): void {
    this.medicos$ = this.medicoService.selecionarTodos()
    this.pacientes$ = this.pacienteService.selecionarTodos();

    this.formCirurgia = this.formBuilder.group({
      nomeCirugia: ['', Validators.required, Validators.minLength(3)],
      medicos: [[], Validators.required, Validators.minLength(1)],
      paciente: ['', Validators.required],
      data: ['', Validators.required],
      horaInicio: ['', Validators.required],
      horaTermino: ['', Validators.required]
    })
  }

  gravar() {
    console.log(this.formCirurgia.value)

    if (this.formCirurgia.invalid) {
      this.exibirMensagensValidacao(this.formCirurgia);
      return;
    }

    this.cirurgiaVM = Object.assign({}, this.cirurgiaVM, this.formCirurgia.value);

    this.cirurgiaService.inserir(this.cirurgiaVM).subscribe({
      next: res => this.processarSucesso(res),
      error: err => this.processarFalha(err)
    });
  }

  processarFalha(err: any): void {
    this.notificacao.aviso(err);
  }

  processarSucesso(dados: FormCirurgiaViewModel)
  {
    this.notificacao.sucesso('Cirurgia marcada para a data: ' + dados.data)
    this.router.navigate(['cirurgias/listar'])
  }

  get medico() {
    return this.formCirurgia.get('medicos');
  }
  
  get paciente() {
    return this.formCirurgia.get('paciente');
  }
  
  get data() {
    return this.formCirurgia.get('data');
  }
  
  get horaInicio() {
    return this.formCirurgia.get('horaInicio');
  }
  
  get horaTermino() {
    return this.formCirurgia.get('horaTermino');
  }

  get nomeCirugia() {
    return this.formCirurgia.get('nomeCirurgia');
  }
}
