import { NgModule, inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn, RouterModule, Routes } from '@angular/router';
import { InserirCirurgiaComponent } from './inserir-cirurgia/inserir-cirurgia.component';
import { ListarCirurgiaComponent } from './listar-cirurgia/listar-cirurgia.component';
import { EditarCirurgiaComponent } from './editar-cirurgia/editar-cirurgia.component';
import { FormCirurgiaViewModel } from './models/form-cirurgia.view-model';
import { CirurgiaService } from './services/cirurgia.service';
import { VisualizarCirurgiaViewModel } from './models/visualizar-cirurgia.view-model';
import { tap } from 'rxjs';
import { ExcluirCirurgiaComponent } from './excluir-cirurgia/excluir-cirurgia.component';

const visualizarResolver: ResolveFn<VisualizarCirurgiaViewModel> = (route: ActivatedRouteSnapshot) => {
  return inject(CirurgiaService).selecionarPorId(route.paramMap.get('id')!);
};

const routes: Routes = [
  {
    path: '',
    redirectTo: 'listar',
    pathMatch: 'full',
  },
  {
    path: 'listar',
    component: ListarCirurgiaComponent
  },
  {
    path: 'inserir',
    component: InserirCirurgiaComponent,
  },
  {
    path: 'editar/:id',
    component: EditarCirurgiaComponent,
    resolve: {cirurgia: visualizarResolver}
  },
  {
    path: 'excluir/:id',
    component: ExcluirCirurgiaComponent,
    resolve: {cirurgia: visualizarResolver}
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CirurgiaRoutingModule { }
