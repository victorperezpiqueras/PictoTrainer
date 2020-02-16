import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { MatDialogRef, MatDialogConfig, MatDialog } from '@angular/material';
import { Proyecto } from '@app/models/proyectos';
import { ProyectoDialogComponent } from '@app/proyectos/proyectoDialog/proyectoDialog.component';
import { PictoDialogComponent } from './pictoDialog/pictoDialog.component';
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
  selector: 'app-creador',
  templateUrl: './creador.component.html',
  styleUrls: ['./creador.component.scss']
})
export class CreadorComponent implements OnInit {
  editMode: boolean;
  idSec: number;

  isLoading = false;
  dialogRef: MatDialogRef<any>;
  pictos: Pictograma[] = [];

  palabraBuscar: string = '';
  palabraPropiaBuscar: string = '';
  listaAcciones: Pictograma[] = [];
  selected: Pictograma;
  index: number = 0;
  actualIndex: number = 0;
  barColor: string;
  bar: any = null;
  nombreSecuencia: string;

  tiempoTotal: number = 100;
  tiempoActual: number = 0;

  busqueda: any;
  found: number = 0;

  private image: ImageSelected = null;

  constructor(
    public dialog: MatDialog,
    public credentialsService: CredentialsService,
    public usuariosService: UsuariosService,
    public secuenciasService: SecuenciaService,
    public pictoService: PictoService,
    public imagenService: ImagenService,
    private activeRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.editMode = false;
    var picto: Pictograma = { nombre: 'nombre', src: 'test.PNG', duracion: 100 };
    for (var i = 0; i < 10; i++) {
      this.pictos.push(picto);
      //this.listaAcciones.push(picto);
    }
    console.log(this.activeRoute.snapshot.params);
    if (this.activeRoute.snapshot.params['id']) {
      this.idSec = this.activeRoute.snapshot.params['id'];
      this.secuenciasService.getSecuenciaAccionesId(this.activeRoute.snapshot.params['id']).subscribe(sec => {
        console.log(sec);
        this.listaAcciones = sec.acciones;
        this.selected = this.listaAcciones[0];
        this.nombreSecuencia = sec.nombre;
      });
      this.editMode = true;
    }
  }

  seleccionarPicto(picto: Pictograma) {
    const dialogConfig = new MatDialogConfig();
    //dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '300px';
    dialogConfig.data = {
      pictograma: picto,
      mode: 'create'
    };
    this.dialogRef = this.dialog.open(PictoDialogComponent, dialogConfig);

    this.dialogRef.afterClosed().subscribe(data => {
      if (data != undefined) {
        this.listaAcciones.push(data.picto);
        //if(this.actualIndex>0)this.actualIndex+=1;
        this.actualIndex = this.listaAcciones.length - 1;
        this.selected = this.listaAcciones[this.actualIndex];

        //this.reconfigurarBarra();
        /*  console.log(data.picto)
         console.log(this.listaAcciones) */
      }
    });
  }

  reconfigurarBarra() {
    this.tiempoActual = 0;
    for (var picto of this.pictos) {
      this.tiempoActual += picto.duracion;
    }
    /*  this.bar.animate(1.0); */
  }

  clickLeft() {
    /*     console.log(this.actualIndex)
     */ if (this.actualIndex > 0) {
      this.actualIndex -= 1;
      this.selected = this.listaAcciones[this.actualIndex];
    }
  }

  clickRight() {
    /*     console.log(this.actualIndex)
     */ this.actualIndex += 1;
    this.selected = this.listaAcciones[this.actualIndex];
  }

  guardar() {
    var secuencia = {
      idusuario: this.idusuario,
      nombre: this.nombreSecuencia,
      acciones: this.listaAcciones,
      idsecuencia: this.idSec
    };
    console.log(secuencia);
    if (!this.editMode) {
      this.secuenciasService.crearSecuenciaUsuario(secuencia).subscribe(result => {
        console.log('create secuencia', result);
      });
    } else {
      this.secuenciasService
        .actualizarSecuenciaUsuario({ secuencia: secuencia, idusuario: this.idusuario })
        .subscribe(result => {
          console.log('edit secuencia', result);
        });
    }
  }

  buscar(palabra: string) {
    this.isLoading = true;
    console.log('palabra:', palabra);
    this.pictoService.buscarPicto(palabra).subscribe(picto => {
      this.isLoading = false;
      console.log('picto:', picto);
      if (picto.src == 'x;font-size:120px;margin-top:80px;margin-bottom:80px; text-align:center"><font>ER') {
        this.busqueda = false;
        this.found = 1;
      } else {
        this.busqueda = picto;
        this.found = 2;
      }
    });
  }

  buscarPropia(palabra: string) {
    this.isLoading = true;
    console.log('palabra:', palabra);
    this.imagenService.buscarImagen(palabra).subscribe(imagen => {
      this.isLoading = false;
      console.log('imagen:', imagen);
      if (imagen.src == 'x;font-size:120px;margin-top:80px;margin-bottom:80px; text-align:center"><font>ER') {
        this.busqueda = false;
        this.found = 1;
      } else {
        this.busqueda = imagen;
        this.found = 2;
      }
    });
  }
  borrarAccion(selected: Pictograma) {
    const index = this.listaAcciones.indexOf(selected, 0);
    if (index > -1) {
      this.listaAcciones.splice(index, 1);
    }
    if (this.actualIndex > 0) {
      this.actualIndex -= 1;
      this.selected = this.listaAcciones[this.actualIndex];
    } else {
      this.selected = this.listaAcciones[this.actualIndex];
    }
    if (this.listaAcciones.length <= 0) {
      this.selected = null;
    }
  }

  editarAccion(selected: Pictograma) {
    console.log(selected);
    const dialogConfig = new MatDialogConfig();
    //dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '300px';
    dialogConfig.data = {
      pictograma: selected,
      mode: 'edit'
    };
    this.dialogRef = this.dialog.open(PictoDialogComponent, dialogConfig);

    this.dialogRef.afterClosed().subscribe(data => {
      if (data != undefined) {
        const index = this.listaAcciones.indexOf(selected, 0);
        this.listaAcciones[index] = data.picto;
        this.selected = data.picto;
      }
    });
  }

  get idusuario(): number | null {
    const credentials = this.credentialsService.credentials;
    return credentials ? credentials.id : null;
  }

  onUploadFinish(event: any) {
    console.log(event);
    this.image = new ImageSelected();
    this.image.src = event.src;
    this.image.nombre = event.file.name;
    this.image.idusuario = this.idusuario;
  }

  sendImage() {
    console.log(this.image);
    this.imagenService.subirImagen(this.image).subscribe(result => {
      console.log('subscribe', result);
    });
  }
}
class ImageSelected {
  public nombre: String;
  public src: String;
  public idusuario: number;
}
