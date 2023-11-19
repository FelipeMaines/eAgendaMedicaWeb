import { Component, OnInit } from '@angular/core';
import { ListarPacienteViewModel } from '../models/listar-paciente.view-model';
import { Observable } from 'rxjs';
import { PacienteService } from '../services/paciente.service';

@Component({
  selector: 'app-listar-paciente',
  templateUrl: './listar-paciente.component.html',
  styleUrls: ['./listar-paciente.component.scss']
})
export class ListarPacienteComponent implements OnInit{
  pacientes$!: Observable<ListarPacienteViewModel[]>;

  constructor(private pacienteService: PacienteService) {}
  
  ngOnInit(): void {
    this.pacientes$ = this.pacienteService.selecionarTodos();   
  }

}
