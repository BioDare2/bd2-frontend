import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ExperimentsRoutingModule} from './experiments-routing.module';
import {ExperimentsListComponent} from './experiments-list/experiments-list.component';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {ButtonsModule} from 'ngx-bootstrap/buttons';

@NgModule({
  declarations: [ExperimentsListComponent],
  imports: [
    CommonModule,
    FormsModule,
    ButtonsModule,
    RouterModule,
    ExperimentsRoutingModule
  ]
})
export class ExperimentsModule {
}
