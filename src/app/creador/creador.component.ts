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
  dialogRef: MatDialogRef<any>;
  pictos: Pictograma[] = [];

  palabraBuscar: string = '';
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

  constructor(
    public dialog: MatDialog,
    public credentialsService: CredentialsService,
    public usuariosService: UsuariosService,
    public secuenciasService: SecuenciaService,
    public pictoService: PictoService
  ) {}

  ngOnInit() {
    var picto: Pictograma = { nombre: 'nombre', src: 'test.PNG', duracion: 100 };
    for (var i = 0; i < 10; i++) {
      this.pictos.push(picto);
      //this.listaAcciones.push(picto);
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
      acciones: this.listaAcciones
    };
    console.log(secuencia);
    this.secuenciasService.crearSecuenciaUsuario(secuencia).subscribe(result => {
      console.log('subscribe', result);
    });
  }

  buscar(palabra: string) {
    console.log('palabra:', palabra);
    this.pictoService.buscarPicto(palabra).subscribe(picto => {
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
}
