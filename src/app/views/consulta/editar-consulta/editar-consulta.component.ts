import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { NotificationService } from 'src/app/core/services/notification.service';
import { ListarMedicoViewModel } from '../../medico/models/listar-medico.view-model';
import { MedicoService } from '../../medico/services/medico.service';
import { ListarPacienteViewModel } from '../../paciente/models/listar-paciente.view-model';
import { PacienteService } from '../../paciente/services/paciente.service';
import { FormConsultaViewModel } from '../models/form-consulta.view-model';
import { ConsultaService } from '../services/consulta.service';
import { BaseFormComponent } from 'src/app/shared/base-form/base-form.component';
import { VisualizarConsultaViewModel } from '../models/visualizar-consulta.view-model';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-editar-consulta',
  templateUrl: './editar-consulta.component.html',
  styleUrls: ['./editar-consulta.component.scss']
})
export class EditarConsultaComponent extends BaseFormComponent implements OnInit{
  
  formConsulta!: FormGroup;
  consultaVM!: VisualizarConsultaViewModel
  medicos$!: Observable<ListarMedicoViewModel[]>
  pacientes$!: Observable<ListarPacienteViewModel[]>

  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute,
     private medicoService: MedicoService, private pacienteService: PacienteService,
     private notificacao: NotificationService, private consultaService: ConsultaService,
     private router: Router ){super()}

  ngOnInit(): void {
    this.medicos$ = this.medicoService.selecionarTodos();
    this.pacientes$ = this.pacienteService.selecionarTodos();

    this.consultaVM = this.route.snapshot.data['consulta'];

    this.formConsulta = this.formBuilder.group({
      medico: [this.consultaVM.medico.id, [Validators.required]],
      paciente: [this.consultaVM.paciente.id, [Validators.required]],
      data: [formatDate(new Date(), "dd/MM/yyyy", "pt"), [Validators.required]],
      horaInicio: [this.consultaVM.horaInicio, [Validators.required]],
      horaTermino: [this.consultaVM.horaTermino, [Validators.required]]
    });

    this.formConsulta.patchValue({
      medico: this.consultaVM.medico.id,
      paciente: this.consultaVM.paciente.id,
      data: new Date(this.consultaVM.data),
      horaInicio: this.consultaVM.horaInicio,
      horaTermino: this.consultaVM.horaTermino
    })
   }

  gravar(){
    if(this.formConsulta.invalid)
      {
        this.exibirMensagensValidacao(this.formConsulta);
        return;
      }

      const id = this.route.snapshot.paramMap.get('id');

      this.consultaVM = Object.assign({}, this.consultaVM, this.formConsulta.value);

      this.consultaService.editar(id! ,this.consultaVM).subscribe({
        next: (res) => this.processarSucesso(res),
        error: (err) => this.processarFalha(err)
      });
  }

  processarFalha(err: any): void {
    this.notificacao.aviso(err);
  }

  processarSucesso(dados: FormConsultaViewModel)
  {
    this.notificacao.sucesso('consulta editada')
    this.router.navigate(['consultas/listar'])
  }

  get medico() {
    return this.formConsulta.get('medico');
  }
  
  get paciente() {
    return this.formConsulta.get('paciente');
  }
  
  get data() {
    return this.formConsulta.get('data');
  }
  
  get horaInicio() {
    return this.formConsulta.get('horaInicio');
  }
  
  get horaTermino() {
    return this.formConsulta.get('horaTermino');
  }

  pegarUrlImage(fotoBase64: string) {
    if (!fotoBase64)
      return 'https://png.pngtree.com/png-clipart/20191120/original/pngtree-outline-user-icon-png-image_5045523.jpg';

    const url = 'data:image/jpeg;base64,' + fotoBase64;
    return url;
  }
}
