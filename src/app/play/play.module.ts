import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FlexLayoutModule } from '@angular/flex-layout';

import { CoreModule } from '@app/core';
import { SharedModule } from '@app/shared';
import { MaterialModule } from '@app/material.module';

import { FormsModule } from '@angular/forms';
import { ImageUploadModule } from 'angular2-image-upload';
import { PlayRoutingModule } from './play-routing.module';
import { PlayComponent } from './play.component';
import { LoadBarComponent } from './loadBar/loadBar.component';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    CoreModule,
    SharedModule,
    FlexLayoutModule,
    MaterialModule,
    PlayRoutingModule,
    FormsModule,
    ImageUploadModule.forRoot()
  ],
  declarations: [PlayComponent, LoadBarComponent]
})
export class PlayModule {}
