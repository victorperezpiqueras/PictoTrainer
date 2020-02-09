import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { FlexLayoutModule } from '@angular/flex-layout';

import { SharedModule } from '@app/shared';
import { MaterialModule } from '@app/material.module';
import { OpcionesRoutingModule } from './opciones-routing.module';
import { OpcionesComponent } from './opciones.component';
import { ColorPickerModule } from 'ngx-color-picker';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TranslateModule,
    SharedModule,
    FlexLayoutModule,
    MaterialModule,

    ColorPickerModule,

    OpcionesRoutingModule
  ],
  declarations: [OpcionesComponent]
})
export class OpcionesModule {}
