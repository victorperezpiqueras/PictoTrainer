import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatSnackBar } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Pictograma } from '@app/models/pictogramas';

@Component({
  selector: 'app-imageExpand',
  templateUrl: './imageExpand.component.html',
  styleUrls: ['./imageExpand.component.scss']
})
export class ImageExpandComponent implements OnInit {
  src: string;
  nombre: string;

  constructor(
    public dialogRef: MatDialogRef<ImageExpandComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _snackBar: MatSnackBar
  ) {
    this.src = data.src;
    this.nombre = data.nombre;
  }

  ngOnInit() {}

  close() {
    this.dialogRef.close();
  }
}
