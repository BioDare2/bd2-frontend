import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {PPARoutingModule} from './ppa-routing.module';
import {PPAStartFormComponent} from './ppa-start-form/ppa-start-form.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {PPAJobParamsRFormComponent} from './ppa-start-form/ppajob-params-rform/ppajob-params-rform.component';
import {StaticContentModule} from '../../documents/static-content.module';
import {TSPlotModule} from '../../tsdata/plots/ts-plot.module';
import {AlertModule} from 'ngx-bootstrap/alert';

@NgModule({
  declarations: [PPAStartFormComponent, PPAJobParamsRFormComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AlertModule,
    StaticContentModule,
    TSPlotModule,
    PPARoutingModule
  ]
})
export class PPAModule {
}
