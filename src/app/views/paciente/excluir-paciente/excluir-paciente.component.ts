import { Component, OnInit } from '@angular/core';
import { VisualizarPacienteViewModel } from '../models/visualizar-paciente.view-model';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from 'src/app/core/services/notification.service';
import { BaseFormComponent } from 'src/app/shared/base-form/base-form.component';
import { PacienteService } from '../services/paciente.service';

@Component({
  selector: 'app-excluir-paciente',
  templateUrl: './excluir-paciente.component.html',
  styleUrls: ['./excluir-paciente.component.scss']
})
export class ExcluirPacienteComponent extends BaseFormComponent implements OnInit{
  pacienteVM!: VisualizarPacienteViewModel;
  formPaciente!: FormGroup;

  constructor(private route: ActivatedRoute, private pacienteService: PacienteService,
    private router: Router, private notificacao: NotificationService, private formBuilder: FormBuilder ) {super()}
  
    ngOnInit(): void {
      this.pacienteVM = this.route.snapshot.data['paciente'];
      console.log(this.pacienteVM);
    }

    public gravar(){
      this.pacienteService.excluir(this.pacienteVM.id).subscribe({
        next: () => this.processarSucesso(),
        error: (err) => this.processarErro(err),
      })
    }

    private processarSucesso(){
      this.notificacao.sucesso('paciente excluido com sucesso!');
      this.router.navigate(['/pacientes/listar']);
    }
  
    private processarErro(erro: any){
      this.notificacao.erro(erro);
    }
  
}
