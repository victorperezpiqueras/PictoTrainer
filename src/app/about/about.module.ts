import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FlexLayoutModule } from '@angular/flex-layout';

import { MaterialModule } from '@app/material.module';
import { AboutRoutingModule } from './about-routing.module';
import { AboutComponent } from './about.component';
import { ColorPickerModule } from 'ngx-color-picker';

@NgModule({
  imports: [CommonModule, TranslateModule, FlexLayoutModule, MaterialModule, AboutRoutingModule, ColorPickerModule],
  declarations: [AboutComponent]
})
export class AboutModule {}
