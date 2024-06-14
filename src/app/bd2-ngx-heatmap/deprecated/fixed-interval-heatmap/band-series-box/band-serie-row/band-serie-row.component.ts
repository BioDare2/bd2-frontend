import {ChangeDetectionStrategy, Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {FixedGraphicContext} from '../../bd2-fixed-heatmap.dom';
import {Serie} from '../../../../bd2-heatmap.dom';


@Component({
  selector: '[bd2hm-band-serie-row]',
  template: `
    <svg:g *ngIf="graphic && serie" class="bd2hm-serie">
      <svg:g *ngFor="let point of serie.data; trackBy: trackByIndex" bd2hm-band-point-box
             [point]="point" [xScale]="graphic.xBandScale"
             [yPosition]="yPosition"
             [yHeight]="yHeight" [colorScale]="graphic.colorScale"
             [label]="serie.label"
      ></svg:g>
    </svg:g>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BandSerieRowComponent implements OnInit, OnChanges {

  @Input()
  graphic: FixedGraphicContext;

  @Input()
  serie: Serie;

  yPosition: number;

  yHeight: number;

  constructor() {
  }

  trackByIndex(index: number, item: any) {
    return index;
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {

    if (this.graphic && this.serie) {
      this.yPosition = this.graphic.yScale(this.serie.key);
      this.yHeight = this.graphic.yScale.bandwidth();
    }
  }

}
