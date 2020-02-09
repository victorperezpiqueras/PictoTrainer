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
  minutos: number;
  segundos: number;

  listaMin: number[] = [];
  listaSeg: number[] = [];

  nombre: string;
  src: string;
  tiempo: number;

  constructor(
    public dialogRef: MatDialogRef<PictoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _snackBar: MatSnackBar
  ) {
    this.nombre = data.pictograma.nombre;
    this.src = data.pictograma.src;
    this.tiempo = data.pictograma.tiempo;
  }

  ngOnInit() {
    for (var i = 1; i < 60; i++) {
      this.listaMin.push(i);
      this.listaSeg.push(i);
    }
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000 //miliseconds
    });
  }

  save() {
    this.tiempo = Number(this.minutos * 60) + Number(this.segundos);
    this.dialogRef.close({
      picto: new Pictograma(this.nombre, this.src, this.tiempo)
    });
    //show snackbar on success:
    this.openSnackBar('Pictograma configurado correctamente', 'Cerrar');
  }

  close() {
    this.dialogRef.close();
  }
}
