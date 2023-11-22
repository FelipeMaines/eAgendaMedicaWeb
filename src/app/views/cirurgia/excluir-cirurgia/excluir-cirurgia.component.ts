import { Component, OnInit } from '@angular/core';
import { VisualizarCirurgiaViewModel } from '../models/visualizar-cirurgia.view-model';
import { ActivatedRoute, Router } from '@angular/router';
import { CirurgiaService } from '../services/cirurgia.service';
import { NotificationService } from 'src/app/core/services/notification.service';

@Component({
  selector: 'app-excluir-cirurgia',
  templateUrl: './excluir-cirurgia.component.html',
  styleUrls: ['./excluir-cirurgia.component.scss']
})
export class ExcluirCirurgiaComponent implements OnInit{
  
  cirurgiaVM!: VisualizarCirurgiaViewModel;

  constructor(private route: ActivatedRoute, private cirurgiaService: CirurgiaService, private router: Router, private notificacao: NotificationService){}

  ngOnInit(): void {
    this.cirurgiaVM = this.route.snapshot.data['cirurgia']
  }

  pegarUrlImage(fotoBase64: string) {
    if (!fotoBase64)
      return 'https://png.pngtree.com/png-clipart/20191120/original/pngtree-outline-user-icon-png-image_5045523.jpg';

    const url = 'data:image/jpeg;base64,' + fotoBase64;
    return url;
  }

  gravar(){
    const id = this.route.snapshot.paramMap.get('id');

    if(id)
    {
      this.cirurgiaService.excluir(id).subscribe({
        next: res => {
          this.notificacao.sucesso('Cirurgia excluida com sucesso!');
          this.router.navigate(['/cirurgias/listar']);
        },
        error: err => {
          this.notificacao.aviso(err);
        }
      });
    }
  }
}
