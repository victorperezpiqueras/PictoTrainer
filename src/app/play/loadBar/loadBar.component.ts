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
  duracionActual: number;
  longitud: number;
  nombreAccion: string;

  bar: any;
  barColor: any;

  started: boolean = false;
  interval: any;
  paused: boolean = false;

  constructor() {}

  ngOnInit() {
    this.nombreAccion = this.accion.nombre;

    //calcular tiempo en ms:
    this.duracion = this.accion.duracion * 1000;
    //this.duracionActual = this.duracion;
    this.duracionActual = this.accion.duracion * 10;
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
      svgStyle: { width: '100%', height: '100%', border: '1px solid black' },
      from: { color: this.barColor.colorInicial },
      to: { color: this.barColor.colorFinal },
      step: (state: any, bar: any) => {
        bar.path.setAttribute('stroke', state.color);
      }
    });
  }

  iniciar() {
    console.log('iniciar()', this.duracion);
    this.started = true;
    this.bar.animate(1);
    /* setTimeout(() => {//comprueba si sigue iniciada la cuenta para enviar el evento finished
          // console.log("timeout",this.started)
          if (this.started && !this.paused) {
            this.started = false;
            this.accionFinalizada.emit({ nombreAccion: this.nombreAccion, accionSaltada: false });
          }
        }, this.duracion);
        this.interval = setInterval(() => {
          if (this.duracionActual > 0 && !this.paused) {
            this.duracionActual--;
          } else {
            console.log("finish interval", this.duracionActual)
            clearInterval(this.interval);
          }
        }, 1) */

    this.interval = null;
    this.interval = setInterval(() => {
      if (this.started && !this.paused) {
        if (this.duracionActual > 0) {
          this.duracionActual--;
        } else {
          console.log('finish interval', this.duracionActual);
          this.started = false;
          this.accionFinalizada.emit({ nombreAccion: this.nombreAccion, accionSaltada: false });
          clearInterval(this.interval);
        }
      }
    }, 100);
  }

  reset() {
    console.log(this.nombreAccion, 'reset()');
    this.started = false;
    this.paused = false;
    this.duracion = this.accion.duracion * 1000;
    this.duracionActual = this.accion.duracion * 10;
    this.bar.set(0);
  }

  done(nombreAccion: any) {
    if (this.started) {
      // console.log("done() bar",this.nombreAccion)
      this.started = false;
      this.bar.set(1);
      this.accionFinalizada.emit({ nombreAccion: this.nombreAccion, accionSaltada: true });
    }
  }

  pause() {
    console.log('paused:', this.nombreAccion, ',duracion', this.duracionActual * 100);
    this.paused = true;
    this.bar.stop();
    clearInterval(this.interval);
  }

  unPause() {
    this.paused = false;
    this.bar.animate(1, { duration: this.duracionActual * 100 });
    console.log('unPause', this.duracionActual * 100);
    /*  setTimeout(() => {
            if(this.started && !this.paused){
              this.started=false;
              this.accionFinalizada.emit({ nombreAccion: this.nombreAccion,  accionSaltada:false});
            }
          }, this.duracionActual); */
    this.interval = null;
    this.interval = setInterval(() => {
      if (this.started && !this.paused) {
        if (this.duracionActual > 0) {
          this.duracionActual--;
        } else {
          console.log('finish interval', this.duracionActual);
          this.started = false;
          this.accionFinalizada.emit({ nombreAccion: this.nombreAccion, accionSaltada: false });
          clearInterval(this.interval);
        }
      }
    }, 100);

    //console.log(this.interval)
  }

  comprobarSiguiente(nombreAccion: any) {
    console.log('comprobar siguiente');
    this.iniciar();
  }
}
