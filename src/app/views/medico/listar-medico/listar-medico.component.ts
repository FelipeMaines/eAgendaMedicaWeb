import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ListarMedicoViewModel } from '../models/listar-medico.view-model';
import { MedicoService } from '../services/medico.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listar-medico',
  templateUrl: './listar-medico.component.html',
  styleUrls: ['./listar-medico.component.scss']
})
export class ListarMedicoComponent implements OnInit{
  
  medicos$!: Observable<ListarMedicoViewModel[]>

  constructor(private medicoService: MedicoService){}

  ngOnInit(): void {
    this.medicos$ = this.medicoService.selecionarTodos()
  }

  pegarUrlImage(fotoBase64: string)
  {
    if(!fotoBase64)
      return 'https://png.pngtree.com/png-clipart/20191120/original/pngtree-outline-user-icon-png-image_5045523.jpg';

    const ulr = 'data:image/jpeg;base64,' + fotoBase64;
    console.log(ulr);
    return ulr;
  }
}
