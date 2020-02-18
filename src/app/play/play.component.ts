import { Component, OnInit, ViewChild, ViewChildren, QueryList, ɵConsole } from '@angular/core';
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
import { LoadBarComponent } from './loadBar/loadBar.component';
import { ImageExpandComponent } from './image-expand/imageExpand.component';
import { Registro } from '@app/models/registros';

export interface Pictograma {
  nombre: string;
  src: string;
  duracion: number;
}

@Component({
  selector: 'app-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.scss']
})
export class PlayComponent implements OnInit {
  isLoading = false;
  secuencia: Secuencia;
  number: number;
  width: number;
  duracionTotal: number = 0;
  tiempoActual: number = 0;

  dialogRef: MatDialogRef<any>;

  @ViewChildren(LoadBarComponent) loadBar: QueryList<any>;

  blankImage: string = '../../assets/blank.png';
  imagenAnterior: any;
  imagenActual: any;
  imagenSiguiente: any;

  index: number;

  isPlayed: boolean = false;
  isPaused: boolean = false;

  startTime: any;
  endTime: any;
  elapsedTime: any = 0;

  constructor(
    public dialog: MatDialog,
    public credentialsService: CredentialsService,
    public secuenciasService: SecuenciaService,
    private activeRoute: ActivatedRoute,
    public usuariosService: UsuariosService
  ) {}

  ngOnInit() {
    this.index = 0;
    this.activeRoute.params.subscribe(routeParams => {
      this.secuenciasService.getSecuenciaAccionesId(routeParams.idsecuencia).subscribe(secuencia => {
        this.secuencia = secuencia;
        this.number = this.secuencia.acciones.length;

        //calcular anchura de las barras en funcion del numero total de ellas:
        for (var acc of this.secuencia.acciones) {
          this.duracionTotal += acc.duracion;
        }
        console.log('duracion total', this.duracionTotal);
        if (this.number == 1) this.width = 15;
        else if (this.number == 2) this.width = 30;
        else if (this.number == 3) this.width = 50;
        else this.width = 20 + this.number * 10;

        this.generarImagenAnterior();
        this.generarImagenActual();
        this.generarImagenSiguiente();
      });
    });
  }

  actualizarImagenes() {
    this.generarImagenAnterior();
    this.generarImagenActual();
    this.generarImagenSiguiente();
  }

  generarImagenAnterior(): any {
    if (this.index > 0) {
      this.imagenAnterior = this.secuencia.acciones[this.index - 1].src;
    } else this.imagenAnterior = this.blankImage;
  }
  generarImagenActual(): any {
    this.imagenActual = this.secuencia.acciones[this.index];
  }
  generarImagenSiguiente(): any {
    if (this.index < this.secuencia.acciones.length - 1) {
      this.imagenSiguiente = this.secuencia.acciones[this.index + 1].src;
    } else this.imagenSiguiente = this.blankImage;
  }

  accionFinalizada(event: any) {
    console.log(this.secuencia.acciones[this.index].nombre, ' finalizada');
    console.log('saltada', event.accionSaltada);
    if (this.index < this.secuencia.acciones.length - 1) {
      this.index++;

      // if(!event.accionSaltada){
      this.loadBar.toArray()[this.index].comprobarSiguiente();
      //  }
      /*       else{
             // //this.loadBar.forEach(loadBar => loadBar.comprobarSiguiente(this.secuencia.acciones[this.index].nombre));
              this.loadBar.toArray()[this.index].comprobarSiguienteSaltada();
            } */

      this.actualizarImagenes();
    } else if (this.index >= this.secuencia.acciones.length - 1) {
      this.stop();
    }
  }

  play() {
    this.isPlayed = true;
    if (!this.isPaused) {
      this.loadBar.toArray()[0].iniciar();
    } else {
      this.loadBar.toArray()[this.index].unPause();
    }
    this.startTime = new Date();
  }

  stop() {
    this.generarTiempo();
    this.isPlayed = false;
    this.isPaused = false;
    this.index = 0;
    this.loadBar.toArray().forEach(loadBar => loadBar.reset());
    this.actualizarImagenes();
  }

  pause() {
    this.endTime = new Date();
    this.elapsedTime += this.endTime - this.startTime;
    this.isPaused = true;
    this.isPlayed = false;
    this.loadBar.toArray()[this.index].pause();
  }

  done() {
    console.log('done()', this.secuencia.acciones[this.index].nombre);
    this.loadBar.toArray()[this.index].done();
  }

  generarTiempo() {
    this.endTime = new Date();
    this.elapsedTime += this.endTime - this.startTime;
    var registro = new Registro(new Date(), this.elapsedTime, this.secuencia.idsecuencia, this.idusuario);
    console.log(registro);
    this.usuariosService.crearRegistro(registro).subscribe(c => console.log(c));
  }

  ampliarPicto(accion: Pictograma) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.width = '60%';
    dialogConfig.data = {
      src: accion.src,
      nombre: accion.nombre
    };
    this.dialogRef = this.dialog.open(ImageExpandComponent, dialogConfig);

    this.dialogRef.afterClosed().subscribe(data => {});
  }

  get idusuario(): number | null {
    const credentials = this.credentialsService.credentials;
    return credentials ? credentials.id : null;
  }
}
