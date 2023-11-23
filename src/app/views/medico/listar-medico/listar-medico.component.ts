import { Component, OnInit } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { ListarMedicoViewModel } from '../models/listar-medico.view-model';
import { MedicoService } from '../services/medico.service';
import { Router } from '@angular/router';
import { format, subDays } from 'date-fns';


@Component({
  selector: 'app-listar-medico',
  templateUrl: './listar-medico.component.html',
  styleUrls: ['./listar-medico.component.scss']
})
export class ListarMedicoComponent implements OnInit {

  filtro: string = "opcao0";
  medicos$!: Observable<ListarMedicoViewModel[]>
  opcao0: string = 'Sem filtro';
  opcao1: string = '30 dias';
  opcao2: string = '90 dias';
  opcao3: string = '180 dias';
  opcao4: string = '360 dias';

  constructor(private medicoService: MedicoService) { }

  ngOnInit(): void {
    this.medicos$ = this.medicoService.selecionarTodos()
  }

  pegarUrlImage(fotoBase64: string) {
    if (!fotoBase64)
      return 'https://png.pngtree.com/png-clipart/20191120/original/pngtree-outline-user-icon-png-image_5045523.jpg';

    const url = 'data:image/jpeg;base64,' + fotoBase64;
    return url;
  }

  onSelectionChange(event: Event) {
    this.atualizarFiltro();
  }

  formatarDataParaAPI(data: Date): string {
    const dataFormatada = format(data, "yyyy/MM/dd");
    console.log(dataFormatada);
    return dataFormatada;
  }

  atualizarFiltro() {
    const hoje = new Date();

    console.log(this.filtro)

    switch (this.filtro) {
      case '30 dias':
        console.log('30 dias')
        this.medicos$ = this.medicoService.filtrarTopDezPorData(this.formatarDataParaAPI(subDays(hoje, 30))).pipe(tap(x => console.log(x)));
        break;
      case '90 dias':
        this.medicos$ = this.medicoService.filtrarTopDezPorData(this.formatarDataParaAPI(subDays(hoje, 90)));
        break;
      case '180 dias':
        this.medicos$ = this.medicoService.filtrarTopDezPorData(this.formatarDataParaAPI(subDays(hoje, 180)));
        break;
      case '360 dias':
        this.medicos$ = this.medicoService.filtrarTopDezPorData(this.formatarDataParaAPI(subDays(hoje, 360)));
        break;
      default:
        this.medicos$ = this.medicoService.selecionarTodos();
        break;
    }
  }
}
