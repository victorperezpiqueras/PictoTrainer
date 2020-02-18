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
import { DomSanitizer } from '@angular/platform-browser';

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

  imagenesPropias: any[] = [];

  private image: ImageSelected = null;

  imageSrc: any = '';
  nombreImagen: string;
  constructor(
    public dialog: MatDialog,
    public credentialsService: CredentialsService,
    public usuariosService: UsuariosService,
    public secuenciasService: SecuenciaService,
    public pictoService: PictoService,
    public imagenService: ImagenService,
    private activeRoute: ActivatedRoute,
    public sanitizer: DomSanitizer
  ) {}

  ngOnInit() {
    this.editMode = false;
    if (this.activeRoute.snapshot.params['id']) {
      this.idSec = this.activeRoute.snapshot.params['id'];
      this.secuenciasService.getSecuenciaAccionesId(this.activeRoute.snapshot.params['id']).subscribe(sec => {
        console.log(sec);
        this.listaAcciones = sec.acciones;
        for (var ac of this.listaAcciones) {
          ac.src = Buffer.from(ac.src, 'base64').toString();
        }
        this.selected = this.listaAcciones[0];
        this.nombreSecuencia = sec.nombre;
      });
      this.editMode = true;
    }
    this.actualizarImagenes();
    /* this.isLoading = true;
    this.usuariosService.getImagenes(this.idusuario).subscribe((imagenes) => {
      this.imagenesPropias = imagenes;
      //console.log(imagenes)
      for (var im of this.imagenesPropias) {
        console.log("for", im.src);

        var base64Flag = 'data:image/jpeg;base64,';
        //im.src = this.arrayBufferToBase64(im.src.data);
        //im.src = this.bufferToBase64(im.src.data);

        im.src = Buffer.from(im.src, 'base64').toString();

        console.log("arraybuffer", im.src)
        //im.src = base64Flag + im.src;

        //console.log("base64",im.src)
        //im.src = this.sanitizer.bypassSecurityTrustResourceUrl(im.src);
        //im.src = this.sanitizer.bypassSecurityTrustResourceUrl(im.src);
        // console.log(im)
      }
      console.log(this.imagenesPropias)
      this.isLoading = false;
    }) */
  }

  /*  arrayBufferToBase64(buffer: any) {
     var binary = '';
     var bytes = new Uint8Array(buffer);
     var len = bytes.byteLength;
     for (var i = 0; i < len; i++) {
       binary += String.fromCharCode(bytes[i]);
     }
     return window.btoa(binary);
   } */

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
        console.log(data.picto);
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

  /*  buscarPropia(palabra: string) {
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
  } */

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

  /*  onUploadFinish(event: any) {
    console.log(event);
    this.image = new ImageSelected();
    this.image.src = event.src;
    this.image.nombre = event.file.name;
    this.image.idusuario = this.idusuario;
  } */

  sendImage() {
    //console.log(this.image);
    if (this.imageSrc && this.nombreImagen) {
      var imagen = {
        idusuario: this.idusuario,
        nombre: this.nombreImagen,
        src: this.imageSrc
      };
      console.log(imagen);
      this.imagenService.subirImagen(imagen).subscribe(result => {
        console.log('subscribe', result);
        this.nombreImagen = '';
        this.imageSrc = '';
        this.actualizarImagenes();
      });
    }
  }

  onFileSelected(event: any) {
    this.imageSrc = event.target.files[0];
    console.log(this.imageSrc);
    const reader = (file: any) => {
      return new Promise((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.onload = () => resolve(fileReader.result);
        fileReader.readAsDataURL(file);
      });
    };
    reader(this.imageSrc).then(result => {
      console.log(result);
      this.imageSrc = result;
    });
  }

  actualizarImagenes() {
    this.isLoading = true;
    this.usuariosService.getImagenes(this.idusuario).subscribe(imagenes => {
      this.imagenesPropias = imagenes;
      //console.log(imagenes)
      for (var im of this.imagenesPropias) {
        console.log('for', im.src);

        var base64Flag = 'data:image/jpeg;base64,';
        //im.src = this.arrayBufferToBase64(im.src.data);
        //im.src = this.bufferToBase64(im.src.data);

        im.src = Buffer.from(im.src, 'base64').toString();

        console.log('arraybuffer', im.src);
        //im.src = base64Flag + im.src;

        //console.log("base64",im.src)
        //im.src = this.sanitizer.bypassSecurityTrustResourceUrl(im.src);
        //im.src = this.sanitizer.bypassSecurityTrustResourceUrl(im.src);
        // console.log(im)
      }
      console.log(this.imagenesPropias);
      this.isLoading = false;
    });
  }

  /* 
    bufferToBase64(buf:any) {
      var binstr = Array.prototype.map.call(buf, function (ch:any) {
          return String.fromCharCode(ch);
      }).join('');
      return btoa(binstr);
  }
   */
}
class ImageSelected {
  public nombre: String;
  public src: String;
  public idusuario: number;
}
