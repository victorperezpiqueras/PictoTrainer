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

@Component({
  selector: 'app-biblioteca',
  templateUrl: './biblioteca.component.html',
  styleUrls: ['./biblioteca.component.scss']
})
export class BibliotecaComponent implements OnInit {
  secuencias: Secuencia[] = [];

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
    this.usuariosService.getSecuenciasAcciones(this.idusuario).subscribe(secuencias => {
      this.secuencias = secuencias;
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
}
