import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { MatDialogRef, MatDialogConfig, MatDialog } from '@angular/material';
import { Proyecto } from '@app/models/proyectos';
import { ProyectoDialogComponent } from '@app/proyectos/proyectoDialog/proyectoDialog.component';
import { CredentialsService } from '@app/core';
import { UsuariosService } from '@app/services/usuarios-service';
import { PictoService } from '@app/services/picto-service';
import { SecuenciaService } from '@app/services/secuencia-service';
import { Secuencia } from '@app/models/secuencias';
import { Pictograma } from '@app/models/pictogramas';
import { ImageExpandComponent } from '@app/play/image-expand/imageExpand.component';

@Component({
  selector: 'app-biblioteca',
  templateUrl: './biblioteca.component.html',
  styleUrls: ['./biblioteca.component.scss']
})
export class BibliotecaComponent implements OnInit {
  secuencias: Secuencia[] = [];
  isLoading: boolean = false;
  dialogRef: MatDialogRef<any>;

  constructor(
    public dialog: MatDialog,
    public credentialsService: CredentialsService,
    public usuariosService: UsuariosService,
    public pictoService: PictoService,
    public secuenciaService: SecuenciaService
  ) {}

  ngOnInit() {
    this.actualizarSecuencias();
  }

  actualizarSecuencias() {
    this.isLoading = true;
    this.usuariosService.getSecuenciasAcciones(this.idusuario).subscribe(secuencias => {
      this.secuencias = secuencias;
      for (var sec of this.secuencias) {
        for (var ac of sec.acciones) {
          ac.src = Buffer.from(ac.src, 'base64').toString();
        }
      }
      this.isLoading = false;
      //console.log(secuencias);
    });
  }

  borrarSecuencia(secuencia: any) {
    this.secuenciaService.borrarSecuencia(secuencia.idsecuencia).subscribe(res => {
      this.actualizarSecuencias();
    });
  }
  calcularFlecha(secuencia: any, accion: any) {
    if (secuencia.acciones.indexOf(accion) < secuencia.acciones.length - 1) return true;
    else return false;
  }

  get idusuario(): number | null {
    const credentials = this.credentialsService.credentials;
    return credentials ? credentials.id : null;
  }

  ampliarPicto(accion: Pictograma) {
    const dialogConfig = new MatDialogConfig();
    //dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    // dialogConfig.position = {right:"200px", top: "100px"};
    dialogConfig.width = '70%';
    dialogConfig.data = {
      src: accion.src,
      nombre: accion.nombre
    };
    this.dialogRef = this.dialog.open(ImageExpandComponent, dialogConfig);

    this.dialogRef.afterClosed().subscribe(data => {});
  }
}
