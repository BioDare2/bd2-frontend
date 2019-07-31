import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RhythmicityDashboardComponent} from './rhythmicity-dashboard/rhythmicity-dashboard.component';
import {RhythmicityRoutingModule} from "./rhythmicity-routing.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AlertModule, ButtonsModule, ModalModule} from "ngx-bootstrap";
import {StaticContentModule} from "../../documents/static-content.module";
import {SharedComponentsModule} from "../../shared/shared-components.module";

@NgModule({
  declarations: [RhythmicityDashboardComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AlertModule,
    ButtonsModule,
    ModalModule,
    StaticContentModule,
    SharedComponentsModule,
    RhythmicityRoutingModule
  ]
})
export class RhythmicityModule {
}
