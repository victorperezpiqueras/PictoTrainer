import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { extract } from '@app/core';
import { Shell } from '@app/shell/shell.service';
import { CreadorComponent } from './creador.component';

const routes: Routes = [
  Shell.childRoutes([{ path: 'creador', component: CreadorComponent, data: { title: extract('Creador') } }])
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class CreadorRoutingModule {}
