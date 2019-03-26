import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {ModalModule} from "ngx-bootstrap";
import {ConfirmDialogComponent} from "./confirm-dialog.component";

@NgModule({
  imports:      [
    CommonModule,
    ModalModule,
  ],
  declarations: [
    ConfirmDialogComponent,
  ],
  exports:      [
    ModalModule,
    ConfirmDialogComponent,
  ]
})
export class SharedComponentsModule { };
