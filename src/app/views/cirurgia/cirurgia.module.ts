import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CirurgiaRoutingModule } from './cirurgia-routing.module';
import { CirurgiaService } from './services/cirurgia.service';
import { InserirCirurgiaComponent } from './inserir-cirurgia/inserir-cirurgia.component';
import { EditarCirurgiaComponent } from './editar-cirurgia/editar-cirurgia.component';
import { ListarCirurgiaComponent } from './listar-cirurgia/listar-cirurgia.component';
import { ExcluirCirurgiaComponent } from './exluir-cirurgia/exluir-cirurgia.component';
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
    InserirCirurgiaComponent,
    EditarCirurgiaComponent,
    ListarCirurgiaComponent,
    ExcluirCirurgiaComponent
  ],
  imports: [
    CommonModule,
    CirurgiaRoutingModule,

    MatCardModule,
    MatGridListModule,
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
    ReactiveFormsModule,
    MatInputModule,
    MatListModule,
    MatTableModule,
    SharedModule,
    MatSelectModule
  ],
  providers: [CirurgiaService, MedicoService, PacienteService]
})
export class CirurgiaModule { }
