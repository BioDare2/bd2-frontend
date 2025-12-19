import {ChangeDetectionStrategy, Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {ScaleLinear} from 'd3-scale';
import {Tick} from '../../../../bd2-heatmap.dom';

/**
 * Render a numerical x-axis for the heatmap.
 */
@Component({
    selector: '[bd2hm-num-x-axis]',
    templateUrl: './num-x-axis.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class NumXAxisComponent implements OnInit, OnChanges {

  @Input()
  xScale: ScaleLinear<number, number>;

  @Input()
  xDomain: [number, number];

  @Input()
  yPosition: number;

  @Input()
  top = false;

  axisTransform: string;
  x2: number;
  ticks: Tick[] = [];

  constructor() {
  }

  trackByIndex(index: number, item: any) {
    return index;
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.axisTransform = `translate(0,${this.yPosition})`;
    this.x2 = this.xScale?.range()[1];
    this.ticks = this.prepareTicks(this.xScale);
  }

  /* Map updated tick positions to Tick objects */
  prepareTicks(xScale: ScaleLinear<number, number>): Tick[] {
    const positions = this.calculateTicksPosition(xScale);

    return positions.map(tick => new Tick(xScale(tick), 0, tick, this.top, false));
  }

  /* Calculate tick positions based on the xScale and domain */
  calculateTicksPosition(xScale: ScaleLinear<number, number>) {
    if (!xScale) {
      return [];
    }
    const ticks = [];
    const domain = this.xDomain || xScale.domain();
    const first = Math.round(domain[0]);
    const last = Math.round(domain[1]);
    const step = this.domainStep(last - first);
    for (let i = first; i <= last; i += step) {
      ticks.push(i);
    }
    return ticks;
  }

  /* Determine an appropriate step size for tick marks based on the domain range */
  domainStep(range: number) {
    if (range <= 25) {
      return 4;
    }
    if (range <= 73) {
      return 6;
    }
    if (range <= 169) {
      return 12;
    }
    return 24;
  }
}
