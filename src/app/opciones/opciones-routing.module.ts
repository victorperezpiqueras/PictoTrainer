import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { extract } from '@app/core';
import { Shell } from '@app/shell/shell.service';
import { HomeComponent } from '@app/home/home.component';
import { OpcionesComponent } from './opciones.component';

const routes: Routes = [
  Shell.childRoutes([
    { path: '', redirectTo: '/opciones', pathMatch: 'full' },
    { path: 'opciones', component: OpcionesComponent, data: { title: extract('Opciones') } }
  ])
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class OpcionesRoutingModule {}
