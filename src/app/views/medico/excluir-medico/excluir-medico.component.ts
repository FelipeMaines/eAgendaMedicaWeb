import { Component, OnInit } from '@angular/core';
import { VisualizarMedicoViewModel } from '../models/visualizar-medico.view-model';
import { ActivatedRoute, Router } from '@angular/router';
import { MedicoService } from '../services/medico.service';
import { NotificationService } from 'src/app/core/services/notification.service';

@Component({
  selector: 'app-excluir-medico',
  templateUrl: './excluir-medico.component.html',
  styleUrls: ['./excluir-medico.component.scss']
})
export class ExcluirMedicoComponent implements OnInit{
  medico!: VisualizarMedicoViewModel;
  
  constructor(private router: Router,private route: ActivatedRoute ,private medicoService: MedicoService, private notification: NotificationService) {}
  
  ngOnInit(): void {
    this.medico = this.route.snapshot.data['medico'];

    this.medicoService.excluir(this.medico.id).subscribe({
      next: (res) => this.processarSucesso(res),
      error: (err) => this.processarFalha(err)
    })
  }

  processarFalha(err: any): void {
    this.notification.erro(err)
  }
  processarSucesso(res: any): void {
    this.notification.sucesso(`O médico ${this.medico.nome} foi deletado com sucesso!`)
    this.router.navigate(['/medicos/listar'])
  }
  
  
  
  public gravar(){

  }
}


