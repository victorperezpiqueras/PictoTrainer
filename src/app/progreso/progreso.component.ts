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

import * as Highcharts from 'highcharts';
import HC_exporting from 'highcharts/modules/exporting';

@Component({
  selector: 'app-progreso',
  templateUrl: './progreso.component.html',
  styleUrls: ['./progreso.component.scss']
})
export class ProgresoComponent implements OnInit {
  dialogRef: MatDialogRef<any>;

  progresos: boolean = true;
  isLoading: boolean = false;

  Highcharts: typeof Highcharts = Highcharts;

  charts: [] = [];

  secuencias: any[] = [];

  constructor(
    public dialog: MatDialog,
    public credentialsService: CredentialsService,
    public usuariosService: UsuariosService,
    public pictoService: PictoService,
    public secuenciaService: SecuenciaService
  ) {}

  ngOnInit() {
    this.isLoading = true;
    this.usuariosService.getSecuenciasRegistros(this.idusuario).subscribe(secuencias => {
      this.usuariosService.getSecuenciasAcciones(this.idusuario).subscribe(secuenciasAcciones => {
        this.secuencias = secuencias;
        for (var i = 0; i < this.secuencias.length; i++) {
          this.secuencias[i].acciones = secuenciasAcciones[i].acciones;
          for (var ac of this.secuencias[i].acciones) {
            ac.src = Buffer.from(ac.src, 'base64').toString();
          }
        }
        console.log(this.secuencias);
        this.generarGraficos();
        if (!this.secuencias.length) this.progresos = false;
      });
      this.isLoading = false;
    });
  }

  generarGraficos() {
    var x,
      y = [];

    for (var sec of this.secuencias) {
      var newData = [];
      for (var reg of sec.registros) {
        //cada registro un punto
        newData.push([Date.parse(reg.fecha), reg.duracionTotal / 1000]);
        console.log(Date.parse(reg.fecha));
      }
      if (newData.length > 1) {
        var options = {
          chart: {
            backgroundColor: '#ffebdb'
            /*  events: {
              load: function() {
                const chart = this
                // Export chart one second after initial load
                setTimeout(() => chart.exportChart({ type: 'application/pdf' }, 1000))
              }
            } */
          },
          title: {
            text: 'Progreso de la tarea: ' + sec.nombre
          },
          yAxis: {
            title: {
              text: 'Segundos'
            }
          },
          xAxis: {
            title: {
              text: 'Fechas'
            },
            labels: {
              format: '{value:%e %b %H:%M:%S}'
            }
          },
          series: [
            {
              name: sec.nombre.toUpperCase(),
              data: newData,
              type: 'line'
            }
          ],
          credits: {
            enabled: false
          }
        };
        sec.options = options;
      } else {
        sec.options = null;
      }
      console.log(sec);
    }
  }

  get idusuario(): number | null {
    const credentials = this.credentialsService.credentials;
    return credentials ? credentials.id : null;
  }

  calcularFlecha(secuencia: any, accion: any) {
    if (secuencia.acciones.indexOf(accion) < secuencia.acciones.length - 1) return true;
    else return false;
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
