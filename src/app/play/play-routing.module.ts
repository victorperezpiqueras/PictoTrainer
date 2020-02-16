import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { extract } from '@app/core';
import { Shell } from '@app/shell/shell.service';
import { PlayComponent } from './play.component';

const routes: Routes = [
  Shell.childRoutes([{ path: 'play/:idsecuencia', component: PlayComponent, data: { title: extract('Play') } }])
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class PlayRoutingModule {}
