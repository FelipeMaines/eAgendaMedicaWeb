import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MedicoRoutingModule } from './medico-routing.module';
import { InserirMedicoComponent } from './inserir-medico/inserir-medico.component';
import { EditarMedicoComponent } from './editar-medico/editar-medico.component';
import { ExcluirMedicoComponent } from './excluir-medico/excluir-medico.component';
import { ListarMedicoComponent } from './listar-medico/listar-medico.component';
import { MedicoService } from './services/medico.service';

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


@NgModule({
  declarations: [
    InserirMedicoComponent,
    EditarMedicoComponent,
    ExcluirMedicoComponent,
    ListarMedicoComponent


  ],
  imports: [
    CommonModule,
    MedicoRoutingModule,

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
  providers: [MedicoService]
})
export class MedicoModule { }
