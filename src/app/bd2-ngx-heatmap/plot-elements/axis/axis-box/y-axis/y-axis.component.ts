import {ChangeDetectionStrategy, Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {ScaleBand} from 'd3-scale';

@Component({
  selector: '[bd2hm-y-axis]',
  template: `
    <svg:g class="bd2hm-y-axis" [attr.transform]="axisTransform">
      <svg:line x1="0" y1="0" x2="0" [attr.y2]="y2"></svg:line>
    </svg:g>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class YAxisComponent implements OnInit, OnChanges {

  @Input()
  yScale: ScaleBand<any>;

  @Input()
  xPosition: number;

  @Input()
  left = false;

  axisTransform: string;
  y2: number;

  constructor() {
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {

    this.axisTransform = `translate(${this.xPosition},0)`;
    this.y2 = this.yScale?.range()[1];
  }

}
