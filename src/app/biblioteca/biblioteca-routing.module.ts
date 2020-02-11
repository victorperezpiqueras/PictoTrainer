import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { extract } from '@app/core';
import { Shell } from '@app/shell/shell.service';
import { BibliotecaComponent } from './Biblioteca.component';

const routes: Routes = [
  Shell.childRoutes([{ path: 'biblioteca', component: BibliotecaComponent, data: { title: extract('Biblioteca') } }])
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class BibliotecaRoutingModule {}
