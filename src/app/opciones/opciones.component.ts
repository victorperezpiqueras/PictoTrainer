import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { finalize } from 'rxjs/operators';

import { Logger, I18nService, AuthenticationService, untilDestroyed, CredentialsService } from '@app/core';

import { ColorPickerModule } from 'ngx-color-picker';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-opciones',
  templateUrl: './opciones.component.html',
  styleUrls: ['./opciones.component.scss']
})
export class OpcionesComponent implements OnInit, OnDestroy {
  colorInicial: string = 'empty';
  colorFinal: string = 'empty';
  constructor(private _snackBar: MatSnackBar) {}

  ngOnInit() {
    var color: any;
    color = localStorage.getItem('bar-color');
    color = JSON.parse(color);
    this.colorInicial = color.colorInicial;
    this.colorFinal = color.colorFinal;
  }

  ngOnDestroy() {
    /* var ob = { colorInicial: this.colorInicial, colorFinal: this.colorFinal }
    localStorage.setItem('bar-color',JSON.stringify(ob)); */
  }

  guardar() {
    var ob = { colorInicial: this.colorInicial, colorFinal: this.colorFinal };
    localStorage.setItem('bar-color', JSON.stringify(ob));
    this.openSnackBar('Configuración guardada correctamente', 'Cerrar');
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 3000 //miliseconds
    });
  }
}
