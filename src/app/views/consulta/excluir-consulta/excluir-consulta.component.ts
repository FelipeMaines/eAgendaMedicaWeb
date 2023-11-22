import { Component, OnInit } from '@angular/core';
import { VisualizarConsultaViewModel } from '../models/visualizar-consulta.view-model';
import { ActivatedRoute, Router } from '@angular/router';
import { ConsultaService } from '../services/consulta.service';
import { NotificationService } from 'src/app/core/services/notification.service';

@Component({
  selector: 'app-excluir-consulta',
  templateUrl: './excluir-consulta.component.html',
  styleUrls: ['./excluir-consulta.component.scss']
})
export class ExcluirConsultaComponent implements OnInit {

  consultaVM!: VisualizarConsultaViewModel;

  constructor(private route: ActivatedRoute, private router: Router, private consultaService: ConsultaService, private notification: NotificationService){}

  ngOnInit(): void {
    this.consultaVM = this.route.snapshot.data['consulta'];
  }

  pegarUrlImage(fotoBase64: string) {
    if (!fotoBase64)
      return 'https://png.pngtree.com/png-clipart/20191120/original/pngtree-outline-user-icon-png-image_5045523.jpg';

    const url = 'data:image/jpeg;base64,' + fotoBase64;
    return url;
  }

  processarErro(err: any): void {
    this.notification.erro(err)
  }

  public gravar(){
    this.consultaService.excluir(this.consultaVM.id).subscribe({
      next: () => {
        this.notification.sucesso('Consulta excluída com sucesso!')
        this.router.navigate(['consultas/listar'])
      },
      error: (err) => this.processarErro(err),
    })
  }

}
