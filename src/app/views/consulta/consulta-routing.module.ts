import { NgModule, inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveEnd, ResolveFn, RouterModule, Routes } from '@angular/router';
import { ListarConsultaComponent } from './listar-consulta/listar-consulta.component';
import { ExcluirConsultaComponent } from './excluir-consulta/excluir-consulta.component';
import { EditarConsultaComponent } from './editar-consulta/editar-consulta.component';
import { InserirConsultaComponent } from './inserir-consulta/inserir-consulta.component';
import { VisualizarMedicoViewModel } from '../medico/models/visualizar-medico.view-model';
import { MedicoService } from '../medico/services/medico.service';
import { ListarMedicoViewModel } from '../medico/models/listar-medico.view-model';
import { ListarPacienteViewModel } from '../paciente/models/listar-paciente.view-model';
import { PacienteService } from '../paciente/services/paciente.service';
import { FormConsultaViewModel } from './models/form-consulta.view-model';
import { ConsultaService } from './services/consulta.service';
import { VisualizarConsultaViewModel } from './models/visualizar-consulta.view-model';

const visualizarConsultaResolve: ResolveFn<VisualizarConsultaViewModel> = (route: ActivatedRouteSnapshot) => {
  return inject(ConsultaService).selecionarPorId(route.paramMap.get('id')!);
}

const routes: Routes = [
  {
    path: '',
    redirectTo: 'listar',
    pathMatch: 'full'
  },
  {
    path: 'listar',
    component: ListarConsultaComponent
  },
  {
    path: 'inserir',
    component: InserirConsultaComponent,
  },
  {
    path: 'editar/:id',
    component: EditarConsultaComponent,
    resolve: {consulta: visualizarConsultaResolve}
  },
  {
    path: 'excluir/:id',
    component: ExcluirConsultaComponent,
    resolve: {consulta: visualizarConsultaResolve}
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConsultaRoutingModule { }
