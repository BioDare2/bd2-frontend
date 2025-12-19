import {ChangeDetectionStrategy, Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {ScaleBand} from 'd3-scale';

/**
 * Render a y-axis for the heatmap.
 */
@Component({
    selector: '[bd2hm-y-axis]',
    templateUrl: './y-axis.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
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
