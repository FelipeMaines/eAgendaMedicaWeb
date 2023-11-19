import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListarPacienteComponent } from './listar-paciente/listar-paciente.component';
import { FormPacienteViewModel } from './models/form-paciente.view-model';
import { InseirPacienteComponent } from './inserir-paciente/inseir-paciente.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'listar',
    pathMatch: 'full'
  },
  {
    path: 'listar',
    component: ListarPacienteComponent,
  },
  {
    path: 'inserir',
    component: InseirPacienteComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PacienteRoutingModule { }
