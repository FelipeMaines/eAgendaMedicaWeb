import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormConsultaViewModel } from '../models/form-consulta.view-model';
import { BaseFormComponent } from 'src/app/shared/base-form/base-form.component';
import { Observable } from 'rxjs';
import { ListarMedicoViewModel } from '../../medico/models/listar-medico.view-model';
import { ListarPacienteViewModel } from '../../paciente/models/listar-paciente.view-model';
import { ActivatedRoute, Router } from '@angular/router';
import { MedicoService } from '../../medico/services/medico.service';
import { PacienteService } from '../../paciente/services/paciente.service';
import { NotificationService } from 'src/app/core/services/notification.service';
import { ConsultaService } from '../services/consulta.service';

@Component({
  selector: 'app-inserir-consulta',
  templateUrl: './inserir-consulta.component.html',
  styleUrls: ['./inserir-consulta.component.scss']
})
export class InserirConsultaComponent extends BaseFormComponent implements OnInit{
  
  formConsulta!: FormGroup;
  consultaVM!: FormConsultaViewModel
  medicos$!: Observable<ListarMedicoViewModel[]>
  pacientes$!: Observable<ListarPacienteViewModel[]>

  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute,
     private medicoService: MedicoService, private pacienteService: PacienteService,
     private notificacao: NotificationService, private consultaService: ConsultaService,
     private router: Router ){super()}

  ngOnInit(): void {
    this.formConsulta = this.formBuilder.group({
      medico: ['', [Validators.required]],
      paciente: ['', [Validators.required]],
      data: ['', [Validators.required]],
      horaInicio: ['', [Validators.required]],
      horaTermino: ['', [Validators.required]]
    });

    this.medicos$ = this.medicoService.selecionarTodos();
    this.pacientes$ = this.pacienteService.selecionarTodos();
    // this.medicos$ = this.route.snapshot.data['medicos'];
    // this.pacientes$ = this.route.snapshot.data['pacientes'];
  }

  gravar(){
    if(this.formConsulta.invalid)
      {
        this.exibirMensagensValidacao(this.formConsulta);
        return;
      }

      this.consultaVM = Object.assign({}, this.consultaVM, this.formConsulta.value);

      this.consultaService.inserir(this.consultaVM).subscribe({
        next: (res) => this.processarSucesso(res),
        error: (err) => this.processarFalha(err)
      });
  }

  processarFalha(err: any): void {
    this.notificacao.aviso(err);
    console.log(err);
  }

  processarSucesso(dados: FormConsultaViewModel)
  {
    this.notificacao.sucesso('consulta marcada para o médico: ' + dados.medico)
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

    console.log(url);

    return url;
  }
}
