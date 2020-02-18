import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FlexLayoutModule } from '@angular/flex-layout';

import { CoreModule } from '@app/core';
import { SharedModule } from '@app/shared';
import { MaterialModule } from '@app/material.module';
import { FormsModule } from '@angular/forms';
import { ProgresoRoutingModule } from './progreso-routing.module';
import { ProgresoComponent } from './progreso.component';

import { HighchartsChartModule } from 'highcharts-angular';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    CoreModule,
    SharedModule,
    FlexLayoutModule,
    MaterialModule,
    HighchartsChartModule,
    ProgresoRoutingModule,
    FormsModule
  ],
  declarations: [ProgresoComponent]
})
export class ProgresoModule {}
