import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatSnackBar } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Proyecto } from '@app/models/proyectos';

@Component({
  selector: 'app-proyectoDialog',
  templateUrl: './proyectoDialog.component.html',
  styleUrls: ['./proyectoDialog.component.scss']
})
export class ProyectoDialogComponent implements OnInit {
  form: FormGroup;

  name: string;
  descripcion: string;

  dialogMode: string;

  constructor(
    public dialogRef: MatDialogRef<ProyectoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _snackBar: MatSnackBar
  ) {
    this.dialogMode = data.dialogMode;

    this.name = data.proyecto.name;
    this.descripcion = data.proyecto.descripcion;
  }

  ngOnInit() {}

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000 //miliseconds
    });
  }

  save() {
    this.dialogRef.close({
      proyecto: new Proyecto(null, this.name, this.descripcion, [])
    });
    //show snackbar on success:
    if (this.dialogMode == 'edit') this.openSnackBar('Proyecto editado correctamente', 'Cerrar');
    else if (this.dialogMode == 'create') this.openSnackBar('Proyecto creado correctamente', 'Cerrar');
  }

  close() {
    this.dialogRef.close();
  }
}
