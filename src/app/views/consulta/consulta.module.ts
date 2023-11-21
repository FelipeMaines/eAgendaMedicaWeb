import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConsultaRoutingModule } from './consulta-routing.module';
import { InserirConsultaComponent } from './inserir-consulta/inserir-consulta.component';
import { EditarConsultaComponent } from './editar-consulta/editar-consulta.component';
import { ExcluirConsultaComponent } from './excluir-consulta/excluir-consulta.component';
import { ListarConsultaComponent } from './listar-consulta/listar-consulta.component';
import { ConsultaService } from './services/consulta.service';

import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatSelectModule } from '@angular/material/select';
import { MedicoService } from '../medico/services/medico.service';
import { PacienteService } from '../paciente/services/paciente.service';


@NgModule({
  declarations: [
    InserirConsultaComponent,
    EditarConsultaComponent,
    ExcluirConsultaComponent,
    ListarConsultaComponent
  ],
  imports: [
    CommonModule,
    ConsultaRoutingModule,

    MatCardModule,
    MatGridListModule,
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
    ReactiveFormsModule,
    MatInputModule,
    MatListModule,
    MatTableModule,
    MatSelectModule,
    SharedModule,
  ],
  providers: [ConsultaService, MedicoService, PacienteService]
})
export class ConsultaModule { }
