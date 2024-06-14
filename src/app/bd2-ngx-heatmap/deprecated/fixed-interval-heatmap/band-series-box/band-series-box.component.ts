import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {Serie} from '../../../bd2-heatmap.dom';
import {FixedGraphicContext} from '../bd2-fixed-heatmap.dom';


@Component({
  selector: '[bd2hm-band-series-box]',
  template: `
    <svg:g *ngFor="let serie of series; trackBy: trackByIndex"
           bd2hm-band-serie-row [graphic]="graphic" [serie]="serie"></svg:g>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BandSeriesBoxComponent implements OnInit {

  @Input()
  series: Serie[];

  @Input()
  graphic: FixedGraphicContext;

  constructor() {
  }

  trackByIndex(index: number, item: any) {
    return index;
  }

  ngOnInit(): void {
  }


}
