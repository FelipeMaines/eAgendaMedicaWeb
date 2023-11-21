import { NgModule, inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn, RouterModule, Routes } from '@angular/router';
import { ListarMedicoComponent } from './listar-medico/listar-medico.component';
import { InserirMedicoComponent } from './inserir-medico/inserir-medico.component';
import { EditarMedicoComponent } from './editar-medico/editar-medico.component';
import { FormMedicoViewModel } from './models/form-medico.view-model';
import { MedicoService } from './services/medico.service';
import { VisualizarPacienteViewModel } from '../paciente/models/visualizar-paciente.view-model';
import { VisualizarMedicoViewModel } from './models/visualizar-medico.view-model';
import { ExcluirMedicoComponent } from './excluir-medico/excluir-medico.component';

 const FormsMedicoResolver: ResolveFn<FormMedicoViewModel> = (route: ActivatedRouteSnapshot) => {
   return inject(MedicoService).selecionarPorId(route.paramMap.get('id')!);
 }

const VisualizarMedicoResolver: ResolveFn<VisualizarMedicoViewModel> = (route: ActivatedRouteSnapshot) => {
  return inject(MedicoService).selecionarPorId(route.paramMap.get('id')!);
}

const routes: Routes = [
  {
    path: '',
    redirectTo: 'listar',
    pathMatch: 'full'
  },
  {
    path: 'listar',
    component: ListarMedicoComponent,
  },
  {
    path: 'inserir',
    component: InserirMedicoComponent,
  },
  {
    path: 'editar/:id',
    component: EditarMedicoComponent,
    resolve: {medico: FormsMedicoResolver}
  }
  ,
  {
    path: 'excluir/:id',
    component: ExcluirMedicoComponent,
    resolve: {medico: VisualizarMedicoResolver}
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MedicoRoutingModule { }
