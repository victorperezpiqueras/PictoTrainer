import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { MatDialogRef, MatDialogConfig, MatDialog } from '@angular/material';
import { Proyecto } from '@app/models/proyectos';
import { ProyectoDialogComponent } from '@app/proyectos/proyectoDialog/proyectoDialog.component';
import { PictoDialogComponent } from './pictoDialog/pictoDialog.component';
import { CredentialsService } from '@app/core';
import { UsuariosService } from '@app/services/usuarios-service';
import { PictoService } from '@app/services/picto-service';

export interface Pictograma {
  nombre: string;
  src: string;
  tiempo: number;
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
  resultado: Pictograma[] = [];
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
    public pictoService: PictoService
  ) {}

  ngOnInit() {
    var picto: Pictograma = { nombre: 'nombre', src: 'test.PNG', tiempo: 100 };
    for (var i = 0; i < 10; i++) {
      this.pictos.push(picto);
      //this.resultado.push(picto);
    }

    /*  this.barColor = localStorage.getItem('bar-color');
     if (!this.barColor || this.barColor!=undefined || this.barColor!=null) this.barColor = '#FFEA82'; 
    /*  var line = new ProgressBar.Line('#container'); */
    /* this.bar = new ProgressBar.Line('#container', {
      strokeWidth: 30,
      duration: 10000,
      color: this.barColor,
      trailColor: '#eee',
      trailWidth: 30,
      svgStyle: { width: '100%', height: '100%' },
      from: { color: this.barColor },
      to: { color: '#ED6A5A' },
      step: (state: any, bar: any) => {
        bar.path.setAttribute('stroke', state.color);
      }
    }); */

    /*  this.bar.animate(1.0); */
  }

  seleccionarPicto(picto: Pictograma) {
    const dialogConfig = new MatDialogConfig();
    //dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '300px';
    dialogConfig.data = {
      pictograma: picto
    };
    this.dialogRef = this.dialog.open(PictoDialogComponent, dialogConfig);

    this.dialogRef.afterClosed().subscribe(data => {
      if (data != undefined) {
        this.resultado.push(data.picto);
        //if(this.actualIndex>0)this.actualIndex+=1;
        this.actualIndex = this.resultado.length - 1;
        this.selected = this.resultado[this.actualIndex];

        //this.reconfigurarBarra();
        /*  console.log(data.picto)
         console.log(this.resultado) */
      }
    });
  }

  reconfigurarBarra() {
    this.tiempoActual = 0;
    for (var picto of this.pictos) {
      this.tiempoActual += picto.tiempo;
    }
    /*  this.bar.animate(1.0); */
  }

  clickLeft() {
    /*     console.log(this.actualIndex)
     */ if (this.actualIndex > 0) {
      this.actualIndex -= 1;
      this.selected = this.resultado[this.actualIndex];
    }
  }

  clickRight() {
    /*     console.log(this.actualIndex)
     */ this.actualIndex += 1;
    this.selected = this.resultado[this.actualIndex];
  }

  guardar() {
    this.usuariosService.crearSecuencia({ idusuario: this.idusuario, secuencia: this.resultado });
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

  get idusuario(): number | null {
    const credentials = this.credentialsService.credentials;
    return credentials ? credentials.id : null;
  }
}
