import { NgModule, inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn, RouterModule, Routes } from '@angular/router';
import { ListarPacienteComponent } from './listar-paciente/listar-paciente.component';
import { FormPacienteViewModel } from './models/form-paciente.view-model';
import { InseirPacienteComponent } from './inserir-paciente/inseir-paciente.component';
import { EditarPacienteComponent } from './editar-paciente/editar-paciente.component';
import { PacienteService } from './services/paciente.service';
import { ExcluirPacienteComponent } from './excluir-paciente/excluir-paciente.component';
import { VisualizarPacienteViewModel } from './models/visualizar-paciente.view-model';

const FormsPacienteResolver: ResolveFn<FormPacienteViewModel> = (route: ActivatedRouteSnapshot) => {
  return inject(PacienteService).selecionarPorIdForm(route.paramMap.get('id')!);
}

const VisualizarPacienteResolver: ResolveFn<VisualizarPacienteViewModel> = (route: ActivatedRouteSnapshot) => {
  return inject(PacienteService).selecionarPorId(route.paramMap.get('id')!);
}

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
  {
    path: 'editar/:id',
    component: EditarPacienteComponent,
    resolve: {paciente: FormsPacienteResolver}
  },
  {
    path: 'excluir/:id',
    component: ExcluirPacienteComponent,
    resolve: {paciente: VisualizarPacienteResolver}
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PacienteRoutingModule { }
