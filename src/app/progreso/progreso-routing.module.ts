import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { extract } from '@app/core';
import { Shell } from '@app/shell/shell.service';
import { ProgresoComponent } from './progreso.component';

const routes: Routes = [
  Shell.childRoutes([{ path: 'progreso', component: ProgresoComponent, data: { title: extract('Progreso') } }])
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class ProgresoRoutingModule {}
