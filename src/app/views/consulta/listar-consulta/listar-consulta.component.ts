import { Component, OnInit } from '@angular/core';
import { ListarCirurgiaViewModel } from '../../cirurgia/models/listar-cirurgia.view-model';
import { ConsultaService } from '../services/consulta.service';
import { ListarConsultaViewModel } from '../models/listar-consulta.view-model';
import { Observable, tap } from 'rxjs';

@Component({
  selector: 'app-listar-consulta',
  templateUrl: './listar-consulta.component.html',
  styleUrls: ['./listar-consulta.component.scss']
})
export class ListarConsultaComponent implements OnInit{
  
  consultas$!: Observable<ListarConsultaViewModel[]>;

  constructor(private servicoConsulta: ConsultaService){}

  ngOnInit(): void {
    this.consultas$ = this.servicoConsulta.selecionarTodos();
  }
}
