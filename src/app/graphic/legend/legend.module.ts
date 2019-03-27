import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SimpleLegendComponent} from './simple-legend/simple-legend.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [SimpleLegendComponent],
  exports: [SimpleLegendComponent]
})
export class LegendModule {
}
