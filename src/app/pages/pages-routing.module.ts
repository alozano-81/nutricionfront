import { NgModule } from '@angular/core';
///import { RouterModule, Routes } from '@angular/router';
import { RouterModule, Routes } from '@angular/router';
import { GestionLoginComponent } from './gestion-login/gestion-login.component';
import { GestionPacientesComponent } from './gestion-pacientes/gestion-pacientes.component';
import { GestionPrincipalComponent } from './gestion-principal/gestion-principal.component';
import { GestionUsuariosComponent } from './gestion-usuarios/gestion-usuarios.component';
import { PagesComponent } from './pages.component';

const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    //canActivate: [LoginGuard, VerifyTokenGuard],
    runGuardsAndResolvers: 'always',
    children: [

      {
        path: 'login',
        component: GestionLoginComponent,
        data: { showRootComponents: true}
      },

      {
        path: 'gestion-principal',
        component: GestionPrincipalComponent,
        data: { showRootComponents: true}
      },

      {
        path: 'pacientes',
        component: GestionPacientesComponent,
        data: { showRootComponents:true}
      },
      {
        path: 'usuarios',
        component: GestionUsuariosComponent,
        data: {showRootComponents:true}
      }
      //{ path: '', redirectTo: '/inicio', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
