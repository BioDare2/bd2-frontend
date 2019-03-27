import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SVGSaverComponent} from './svg-saver/svg-saver.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [SVGSaverComponent],
  exports: [SVGSaverComponent]
})
export class SVGSaverModule {
}
