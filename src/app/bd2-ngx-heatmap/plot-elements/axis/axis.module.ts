import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AxisBoxComponent} from './axis-box/axis-box.component';
import {YAxisComponent} from './axis-box/y-axis/y-axis.component';
import {VTickMarkComponent} from './axis-box/x-axis/v-tick-mark/v-tick-mark.component';
import {NumXAxisComponent} from './axis-box/x-axis/num-x-axis.component';


@NgModule({
  declarations: [
    AxisBoxComponent,
    NumXAxisComponent,
    YAxisComponent,
    VTickMarkComponent,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    AxisBoxComponent,
    NumXAxisComponent,
    YAxisComponent,
    VTickMarkComponent,
  ],
})
export class AxisModule { }
