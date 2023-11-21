import { NgModule, inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
   
    {
        path: 'pacientes',
        loadChildren: () => import('../../views/paciente/paciente.module')
        .then(m => m.PacienteModule)
    },
    
    
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NavBarRoutingModule { }
