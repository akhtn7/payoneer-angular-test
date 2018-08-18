import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatTableModule,
  MatInputModule,
  MatButtonModule,
  MatIconModule,
  MatDialogModule,
  MatSelectModule,
  MatCheckboxModule
} from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    MatTableModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatSelectModule,
    MatCheckboxModule,
  ],
  exports: [
    MatTableModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatSelectModule,
    MatCheckboxModule
  ]
})
export class MaterialModule { }
