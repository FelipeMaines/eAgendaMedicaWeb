import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PacienteRoutingModule } from './paciente-routing.module';
import { InseirPacienteComponent } from './inserir-paciente/inseir-paciente.component';
import { EditarPacienteComponent } from './editar-paciente/editar-paciente.component';
import { ExcluirPacienteComponent } from './excluir-paciente/excluir-paciente.component';
import { ListarPacienteComponent } from './listar-paciente/listar-paciente.component';
import { PacienteService } from './services/paciente.service';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';

import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';




@NgModule({
  declarations: [
    InseirPacienteComponent,
    EditarPacienteComponent,
    ExcluirPacienteComponent,
    ListarPacienteComponent,
  ],
  imports: [
    CommonModule,
    PacienteRoutingModule,

    MatCardModule,
    MatGridListModule,
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
    ReactiveFormsModule,
    MatInputModule,
    MatListModule,
    MatTableModule
  ]
  ,
  providers: [PacienteService]
})
export class PacienteModule { }
