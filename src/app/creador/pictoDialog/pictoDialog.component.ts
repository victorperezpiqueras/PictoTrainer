import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatSnackBar } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Pictograma } from '@app/models/pictogramas';

@Component({
  selector: 'app-pictoDialog',
  templateUrl: './pictoDialog.component.html',
  styleUrls: ['./pictoDialog.component.scss']
})
export class PictoDialogComponent implements OnInit {
  form: FormGroup;
  segundos: number = 0;
  minutos: number = 1;
  mode: string;
  nombreBoton: string;

  listaMin: number[] = [];
  listaSeg: number[] = [];

  nombre: string;
  src: string;
  duracion: number;

  constructor(
    public dialogRef: MatDialogRef<PictoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _snackBar: MatSnackBar
  ) {
    this.nombre = data.pictograma.nombre;
    this.src = data.pictograma.src;
    this.duracion = data.pictograma.duracion;
    this.mode = data.mode;

    if (this.duracion) {
      this.minutos = Number((this.duracion / 60).toFixed());
      this.segundos = this.duracion % 60;
      console.log(this.minutos);
    } else {
      this.minutos = 0;
      this.segundos = 0;
    }
  }

  ngOnInit() {
    for (var i = 0; i < 60; i++) {
      this.listaMin.push(i);
    }
    for (var j = 0; j < 60; j++) {
      this.listaSeg.push(j);
      j = j + 4;
    }

    if (this.mode == 'edit') {
      this.mode = 'Edita';
      this.nombreBoton = 'Guardar';
    } else if (this.mode == 'create') {
      this.mode = 'Crea';
      this.nombreBoton = 'Crear';
    }
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000 //miliseconds
    });
  }

  save() {
    this.duracion = Number(this.minutos * 60) + Number(this.segundos);
    console.log(this.duracion);
    console.log(new Pictograma(this.nombre, this.src, this.duracion));
    this.dialogRef.close({
      picto: new Pictograma(this.nombre, this.src, this.duracion)
    });
    //show snackbar on success:
    //this.openSnackBar('Pictograma configurado correctamente', 'Cerrar');
  }

  close() {
    this.dialogRef.close();
  }
}
