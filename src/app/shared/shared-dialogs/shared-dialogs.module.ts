import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ConfirmDialogComponentComponent} from './confirm-dialog-component/confirm-dialog-component.component';
import {MatLegacyDialogModule as MatDialogModule} from '@angular/material/legacy-dialog';


@NgModule({
  declarations: [ConfirmDialogComponentComponent],
  imports: [
    CommonModule,
    MatDialogModule
  ],
})
export class SharedDialogsModule { }
