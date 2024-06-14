import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {GraphicContext} from '../../../bd2-heatmap.dom';

@Component({
  selector: '[bd2hm-axis-box]',
  template: `
    <svg:g *ngIf="graphic" class="bd2hm-axisWrapper">
      <g bd2hm-num-x-axis class="xTopAxis" [top]="true" [xScale]="graphic.xScale"
         [yPosition]="0" [xDomain]="graphic.xDomain"></g>
      <g bd2hm-num-x-axis class="xBottomAxis" [top]="false" [xScale]="graphic.xScale"
         [yPosition]="graphic.workspaceHeight" [xDomain]="graphic.xDomain"></g>

      <g bd2hm-y-axis class="yLeftAxis" [left]="true" [yScale]="graphic.yScale" [xPosition]="0"></g>
      <g bd2hm-y-axis class="yRightAxis" [left]="false" [yScale]="graphic.yScale" [xPosition]="graphic.workspaceWidth"></g>
    </svg:g>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AxisBoxComponent implements OnInit {

  @Input()
  graphic: GraphicContext;

  constructor() {
  }

  ngOnInit(): void {
  }


}
