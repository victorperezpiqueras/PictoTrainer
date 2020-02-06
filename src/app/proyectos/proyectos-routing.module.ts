import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { extract } from '@app/core';
import { ProyectosComponent } from './proyectos.component';
import { Shell } from '@app/shell/shell.service';

const routes: Routes =  [
  Shell.childRoutes([
    { path: 'proyectos', component: ProyectosComponent, data: { title: extract('Proyectos') } }
  ])
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class ProyectosRoutingModule {}
