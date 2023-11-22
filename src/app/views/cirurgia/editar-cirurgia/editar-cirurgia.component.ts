import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { NotificationService } from 'src/app/core/services/notification.service';
import { BaseFormComponent } from 'src/app/shared/base-form/base-form.component';
import { ListarMedicoViewModel } from '../../medico/models/listar-medico.view-model';
import { MedicoService } from '../../medico/services/medico.service';
import { ListarPacienteViewModel } from '../../paciente/models/listar-paciente.view-model';
import { PacienteService } from '../../paciente/services/paciente.service';
import { FormCirurgiaViewModel } from '../models/form-cirurgia.view-model';
import { CirurgiaService } from '../services/cirurgia.service';
import { VisualizarCirurgiaViewModel } from '../models/visualizar-cirurgia.view-model';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-editar-cirurgia',
  templateUrl: './editar-cirurgia.component.html',
  styleUrls: ['./editar-cirurgia.component.scss']
})
export class EditarCirurgiaComponent extends BaseFormComponent implements OnInit {
  formCirurgia!: FormGroup
  cirurgiaVM!: VisualizarCirurgiaViewModel
  medicos$!: Observable<ListarMedicoViewModel[]>;
  pacientes$!: Observable<ListarPacienteViewModel[]>;
  id: string = this.route.snapshot.paramMap.get('id')!;

  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute,
    private medicoService: MedicoService, private pacienteService: PacienteService,
    private notificacao: NotificationService, private cirurgiaService: CirurgiaService,
    private router: Router) { super() }

  ngOnInit(): void {
    this.cirurgiaVM = this.route.snapshot.data['cirurgia'];

    this.medicos$ = this.medicoService.selecionarTodos();
    this.pacientes$ = this.pacienteService.selecionarTodos();

    console.log(this.cirurgiaVM)

    this.formCirurgia = this.formBuilder.group({
      nomeCirugia: ['', [Validators.required, Validators.minLength(3)]],
      medicos: [[], [Validators.required, Validators.minLength(1)]],
      paciente: ['', [Validators.required]],
      data: [formatDate(new Date(), "dd/MM/yyyy", "pt"), [Validators.required]],
      horaInicio: ['', [Validators.required]],
      horaTermino: ['', [Validators.required]]
    })

    this.formCirurgia.patchValue({
      data: new Date(this.cirurgiaVM.data),
      nomeCirugia: this.cirurgiaVM.nomeCirugia,
      medicos: this.cirurgiaVM.medicos.map(x => x.id),
      paciente: this.cirurgiaVM.paciente.id,
      horaInicio: this.cirurgiaVM.horaInicio,
      horaTermino: this.cirurgiaVM.horaTermino 
    })

    console.log(this.formCirurgia.value)
  }

  gravar() {
    if (this.formCirurgia.invalid) {
      this.exibirMensagensValidacao(this.formCirurgia);
      return;
    }

    this.cirurgiaVM = Object.assign({}, this.cirurgiaVM, this.formCirurgia.value);

    this.cirurgiaService.editar(this.cirurgiaVM, this.id).subscribe({
      next: res => this.processarSucesso(res),
      error: err => this.processarFalha(err)
    });
  }

  processarFalha(err: any): void {
    this.notificacao.aviso(err);
  }

  processarSucesso(dados: VisualizarCirurgiaViewModel) {
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
