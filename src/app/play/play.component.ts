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

  dialogRef: MatDialogRef<any>;

  @ViewChildren(LoadBarComponent) loadBar: QueryList<any>;

  blankImage: string = '../../assets/blank.png';
  imagenAnterior: any;
  imagenActual: any;
  imagenSiguiente: any;

  index: number;

  isPlayed: boolean = false;

  constructor(
    public dialog: MatDialog,
    public secuenciasService: SecuenciaService,
    private activeRoute: ActivatedRoute
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
    if (this.index < this.secuencia.acciones.length - 1) {
      this.index++;
      this.loadBar.forEach(loadBar => loadBar.comprobarSiguiente(this.secuencia.acciones[this.index].nombre));
      this.actualizarImagenes();
    } else if (this.index >= this.secuencia.acciones.length - 1) {
      this.stop();
    }
  }

  play() {
    this.isPlayed = true;
    this.loadBar.toArray()[0].iniciar();
  }

  stop() {
    this.isPlayed = false;
    this.loadBar.forEach(loadBar => loadBar.reset());
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
}
