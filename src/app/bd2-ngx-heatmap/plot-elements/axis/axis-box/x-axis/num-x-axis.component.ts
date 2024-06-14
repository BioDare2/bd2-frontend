import {ChangeDetectionStrategy, Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {ScaleLinear} from 'd3-scale';
import {Tick} from '../../../../bd2-heatmap.dom';

//

@Component({
  selector: '[bd2hm-num-x-axis]',
  template: `
    <svg:g class="bd2hm-x-axis" [attr.transform]="axisTransform" >
      <svg:line x1="0" y1="0" y2="0" [attr.x2]="x2"></svg:line>
      <svg:g *ngFor="let tick of ticks; trackBy: trackByIndex" bd2hm-vtick-mark class="bd2hm-tickMark" [tick]="tick"></svg:g>
    </svg:g>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush
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


  prepareTicks(xScale: ScaleLinear<number, number>): Tick[] {
    const positions = this.calculateTicksPosition(xScale);

    return positions.map(tick => new Tick(xScale(tick), 0, tick, this.top, false));
  }



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
