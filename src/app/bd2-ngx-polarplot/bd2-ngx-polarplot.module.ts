import { NgModule } from '@angular/core';
import {PolarPlotComponent} from './polar-plot/polar-plot.component';
import {CommonModule} from '@angular/common';

/**
 * Module to create BioDare2's polar plot to display fitted phases
 */
@NgModule({
  declarations: [PolarPlotComponent],
  imports: [
    // CommonModule
  ],
  exports: [PolarPlotComponent]
})
export class BD2NgxPolarplotModule { }
