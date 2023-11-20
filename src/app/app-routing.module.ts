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
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
