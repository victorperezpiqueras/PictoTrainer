import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatSnackBar } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Pictograma } from '@app/models/pictogramas';

@Component({
  selector: 'app-finDialog',
  templateUrl: './finDialog.component.html',
  styleUrls: ['./finDialog.component.scss']
})
export class FinDialogComponent implements OnInit {
  form: FormGroup;

  constructor(public dialogRef: MatDialogRef<FinDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {}

  ngOnInit() {}

  cerrar() {
    this.dialogRef.close();
  }
}
