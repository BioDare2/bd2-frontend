import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ConfirmDialogComponentComponent} from './confirm-dialog-component/confirm-dialog-component.component';
import { MatDialogModule } from '@angular/material/dialog';


@NgModule({
  declarations: [ConfirmDialogComponentComponent],
  imports: [
    CommonModule,
    MatDialogModule
  ],
})
export class SharedDialogsModule { }
