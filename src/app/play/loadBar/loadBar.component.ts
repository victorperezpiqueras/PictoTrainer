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
  audio: any;
  alarma: any;
  uno: any;
  dos: any;
  tres: any;
  sonido: false;

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
    var sond;
    sond = localStorage.getItem('sonido');
    this.sonido = JSON.parse(sond);
    if (this.sonido) {
      this.audio = new Audio('/assets/sonido/sinfinal.mp3');
      this.alarma = new Audio('/assets/sonido/alarma6s.mp3');
      this.uno = new Audio('/assets/sonido/uno.mp3');
      this.dos = new Audio('/assets/sonido/dos.mp3');
      this.tres = new Audio('/assets/sonido/tres.mp3');
    }

    /*BUG SOLVED: Petaba si no escogias color cuando haces log por primera vez*/
    this.barColor = localStorage.getItem('bar-color');
    if (this.barColor == null) {
      var ob = { colorInicial: '#00ff00', colorFinal: '#ff0000' };
      localStorage.setItem('bar-color', JSON.stringify(ob));
    }

    this.barColor = localStorage.getItem('bar-color');
    this.barColor = JSON.parse(this.barColor);
    console.log(this.barColor);

    this.bar = new ProgressBar.Line(document.getElementById('container'), {
      strokeWidth: this.width,
      duration: this.duracion,
      color: '#ED6A5A',
      trailColor: '#eee',
      trailWidth: this.width,
      svgStyle: { width: '100%', height: '100%', border: '1px solid #d6d6d6' },
      from: { color: this.barColor.colorInicial },
      to: { color: this.barColor.colorFinal },
      step: (state: any, bar: any) => {
        bar.path.setAttribute('stroke', state.color);
      }
    });
  }

  reproducirAudio() {
    if (this.sonido) this.audio.play();
  }
  reproducirAlarma() {
    if (this.sonido) this.alarma.play();
  }
  reproducirUno() {
    if (this.sonido) this.uno.play();
  }
  reproducirDos() {
    if (this.sonido) this.dos.play();
  }
  reproducirTres() {
    if (this.sonido) this.tres.play();
  }

  iniciar() {
    console.log('iniciar()', this.duracion);
    //this.duracion=190
    this.started = true;
    this.bar.animate(1);
    //this.audio.play();
    this.reproducirAudio();

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
        if (this.sonido) {
          if (this.duracionActual == (this.duracion / 100) * (3 / 4)) {
            this.reproducirUno();
          }
          if (this.duracionActual == (this.duracion / 100) * (1 / 2)) {
            this.reproducirDos();
          }
          if (this.duracionActual == (this.duracion / 100) * (1 / 4)) {
            this.reproducirTres();
          }

          if (this.duracionActual < 50) {
            this.audio.pause();
            this.reproducirAlarma();
          }
        }
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
    if (this.sonido) this.audio.pause();
  }

  done(nombreAccion: any) {
    if (this.sonido) {
      this.audio.pause();
      if (this.alarma.play()) {
        this.alarma.pause();
      }
    }
    if (this.started) {
      // console.log("done() bar",this.nombreAccion)
      this.started = false;
      this.bar.set(1);
      this.accionFinalizada.emit({ nombreAccion: this.nombreAccion, accionSaltada: true });
    }
  }

  pause() {
    if (this.sonido) {
      this.audio.pause();
      if (this.alarma.play()) {
        this.alarma.pause();
      }
    }
    console.log('paused:', this.nombreAccion, ',duracion', this.duracionActual * 100);
    this.paused = true;
    this.bar.stop();
    clearInterval(this.interval);
  }

  unPause() {
    if (this.sonido) {
      this.audio.play();
    }
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
