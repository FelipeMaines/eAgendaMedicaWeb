import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: 'pacientes',
    loadChildren: () => import('../app/views/paciente/paciente.module')
    .then(m => m.PacienteModule)
  },
  {
    path: 'medicos',
    loadChildren: () => import('../app/views/medico/medico.module')
    .then(m => m.MedicoModule)
  },
  {
    path: 'consultas',
    loadChildren: () => import('../app/views/consulta/consulta.module')
    .then(m => m.ConsultaModule)
  },
  {
    path: 'cirurgias',
    loadChildren: () => import('../app/views/cirurgia/cirurgia.module')
    .then(m => m.CirurgiaModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
