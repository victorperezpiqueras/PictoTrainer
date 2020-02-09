import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FlexLayoutModule } from '@angular/flex-layout';

import { CoreModule } from '@app/core';
import { SharedModule } from '@app/shared';
import { MaterialModule } from '@app/material.module';
import { CreadorRoutingModule } from './creador-routing.module';
import { CreadorComponent } from './creador.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    CoreModule,
    SharedModule,
    FlexLayoutModule,
    MaterialModule,
    CreadorRoutingModule,
    FormsModule
  ],
  declarations: [CreadorComponent]
})
export class CreadorModule {}
