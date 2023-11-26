import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegistroComponent } from './auth/registro/registro.component';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { AuthGuard } from './auth/services/auth.guard';
import { LoginGuard } from './auth/services/login.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'conta/autenticar',
    pathMatch: 'full'
  },
  {
    path: 'conta/autenticar',
    component: LoginComponent,
    canActivate: [LoginGuard]
  },
  {
    path: 'conta/registrar',
    component: RegistroComponent,
    canActivate: [LoginGuard]
  },
  {
    path: 'dashboard',
    canActivate: [AuthGuard],
    component: DashboardComponent,
    },

  {
    path: 'pacientes',
    canActivate: [AuthGuard],
    loadChildren: () => import('../app/views/paciente/paciente.module')
      .then(m => m.PacienteModule)
  },
  {
    path: 'medicos',
    canActivate: [AuthGuard],
    loadChildren: () => import('../app/views/medico/medico.module')
      .then(m => m.MedicoModule)
  },
  {
    path: 'consultas',
    canActivate: [AuthGuard],
    loadChildren: () => import('../app/views/consulta/consulta.module')
      .then(m => m.ConsultaModule)
  },
  {
    path: 'cirurgias',
    canActivate: [AuthGuard],
    loadChildren: () => import('../app/views/cirurgia/cirurgia.module')
      .then(m => m.CirurgiaModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
