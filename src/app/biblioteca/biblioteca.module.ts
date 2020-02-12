import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FlexLayoutModule } from '@angular/flex-layout';

import { CoreModule } from '@app/core';
import { SharedModule } from '@app/shared';
import { MaterialModule } from '@app/material.module';
import { FormsModule } from '@angular/forms';
import { BibliotecaComponent } from './biblioteca.component';
import { BibliotecaRoutingModule } from './biblioteca-routing.module';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    CoreModule,
    SharedModule,
    FlexLayoutModule,
    MaterialModule,
    BibliotecaRoutingModule,
    FormsModule
  ],
  declarations: [BibliotecaComponent]
})
export class BibliotecaModule {}
