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

@Component({
  selector: 'app-progreso',
  templateUrl: './progreso.component.html',
  styleUrls: ['./progreso.component.scss']
})
export class ProgresoComponent implements OnInit {
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
    this.usuariosService.getSecuenciasRegistros(this.idusuario).subscribe(secuencias => {
      this.secuencias = secuencias;
      this.generarGraficos();
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
          },
          title: {
            text: 'Progreso de la secuencia: ' + sec.nombre
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
              name: sec.nombre,
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
}
