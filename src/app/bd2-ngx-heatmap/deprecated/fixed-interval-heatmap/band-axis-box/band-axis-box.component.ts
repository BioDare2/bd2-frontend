import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {FixedGraphicContext} from '../bd2-fixed-heatmap.dom';

@Component({
  selector: '[bd2hm-band-axis-box]',
  template: `
    <svg:g *ngIf="graphic" class="bd2hm-axisWrapper">

      <g bd2hm-band-x-axis class="xTopAxis" [top]="true" [xScale]="graphic.xBandScale" [yPosition]="0"></g>
      <g bd2hm-band-x-axis class="xBottomAxis" [top]="false" [xScale]="graphic.xBandScale" [yPosition]="graphic.workspaceHeight"></g>

      <g bd2hm-y-axis class="yLeftAxis" [left]="true" [yScale]="graphic.yScale" [xPosition]="0"></g>
      <g bd2hm-y-axis class="yRightAxis" [left]="false" [yScale]="graphic.yScale" [xPosition]="graphic.workspaceWidth"></g>
    </svg:g>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BandAxisBoxComponent implements OnInit {

  @Input()
  graphic: FixedGraphicContext;

  constructor() {
  }

  ngOnInit(): void {
  }
}
