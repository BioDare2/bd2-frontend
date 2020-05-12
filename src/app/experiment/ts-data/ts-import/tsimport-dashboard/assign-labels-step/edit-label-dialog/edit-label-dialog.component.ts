import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';


export interface EditLabelDialogData {
  title: string;
  regionName: string;
  label: string;
}

@Component({
  selector: 'bd2-edit-label-dialog',
  templateUrl: './edit-label-dialog.component.html',
  styles: []
})
export class EditLabelDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<EditLabelDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: EditLabelDialogData) { }

  ngOnInit() {
  }

  sendLabel() {
    this.dialogRef.close(this.data.label);
  }

}
