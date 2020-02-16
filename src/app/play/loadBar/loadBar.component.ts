import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { MatDialogRef, MatDialogConfig, MatDialog } from '@angular/material';
import { Proyecto } from '@app/models/proyectos';
import { ProyectoDialogComponent } from '@app/proyectos/proyectoDialog/proyectoDialog.component';
import { CredentialsService } from '@app/core';
import { UsuariosService } from '@app/services/usuarios-service';
import { PictoService } from '@app/services/picto-service';
import { SecuenciaService } from '@app/services/secuencia-service';
import { ImagenService } from '@app/services/imagenes-service';
import { ActivatedRoute } from '@angular/router';
import { Secuencia } from '@app/models/secuencias';

export interface Pictograma {
  nombre: string;
  src: string;
  duracion: number;
}

@Component({
  selector: 'app-loadBar',
  templateUrl: './loadBar.component.html',
  styleUrls: ['./loadBar.component.scss']
})
export class LoadBarComponent implements OnInit {
  @Input() width: number;
  @Input() duracionTotal: number;
  @Input() accion: Pictograma;

  @Output() accionFinalizada = new EventEmitter();

  duracion: number;
  longitud: number;
  nombreAccion: string;

  bar: any;
  barColor: any;

  constructor() {}

  ngOnInit() {
    this.nombreAccion = this.accion.nombre;

    //calcular tiempo en ms:
    this.duracion = this.accion.duracion * 1000;

    //calcular longitud de la barra en funcion del tiempo: NO VA
    //this.longitud=(this.accion.duracion/this.duracionTotal)*100*70;
    //console.log("longitud",this.longitud)

    this.barColor = localStorage.getItem('bar-color');
    this.barColor = JSON.parse(this.barColor);
    this.bar = new ProgressBar.Line(document.getElementById('container'), {
      strokeWidth: this.width,
      duration: this.duracion,
      color: '#ED6A5A',
      trailColor: '#eee',
      trailWidth: this.width,
      svgStyle: { width: '100%', height: '100%' },
      from: { color: this.barColor.colorInicial },
      to: { color: this.barColor.colorFinal },
      step: (state: any, bar: any) => {
        bar.path.setAttribute('stroke', state.color);
      }
    });
  }

  iniciar() {
    console.log(this.accion.nombre, ' iniciada');
    this.bar.animate(1);
    setTimeout(() => {
      this.accionFinalizada.emit({ nombreAccion: this.nombreAccion });
    }, this.duracion);
  }

  reset() {
    this.bar.set(0);
  }

  comprobarSiguiente(nombreAccion: any) {
    console.log('comprobar siguiente');
    if (this.nombreAccion == nombreAccion) {
      this.iniciar();
    }
  }
}
