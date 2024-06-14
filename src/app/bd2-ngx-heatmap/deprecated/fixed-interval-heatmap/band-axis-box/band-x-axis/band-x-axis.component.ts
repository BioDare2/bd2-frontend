import {ChangeDetectionStrategy, Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {ScaleBand} from 'd3-scale';
import {Tick} from '../../../../bd2-heatmap.dom';

//

@Component({
  selector: '[bd2hm-band-x-axis]',
  template: `
    <svg:g class="bd2hm-x-axis" [attr.transform]="axisTransform" >
      <svg:line x1="0" y1="0" y2="0" [attr.x2]="x2"></svg:line>
      <svg:g *ngFor="let tick of ticks; trackBy: trackByIndex" bd2hm-vtick-mark class="bd2hm-tickMark" [tick]="tick"></svg:g>
    </svg:g>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BandXAxisComponent implements OnInit, OnChanges {

  @Input()
  xScale: ScaleBand<any>;

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


  prepareTicks(xScale: ScaleBand<any>): Tick[] {
    const positions = this.calculateTicksPosition(xScale);

    return positions.map(tick => new Tick(this.tickXPosition(tick, xScale), 0, tick, this.top, false));
  }

  tickXPosition(tick: any, xScale: ScaleBand<any>) {
    return xScale(tick) + xScale.bandwidth() / 2;
  }


  calculateTicksPosition(xScale: ScaleBand<any>) {
    if (!xScale) {
      return [];
    }
    const ticks = [];
    const domain = xScale.domain();
    const step = this.domainStep(domain.length);
    for (let i = 0; i < domain.length; i += step) {
      ticks.push(domain[i]);
    }
    // console.log('T', ticks);
    return ticks;
  }

  domainStep(length: number) {
    if (length <= 25) {
      return 4;
    }
    if (length <= 73) {
      return 6;
    }
    if (length <= 169) {
      return 12;
    }
    return 24;
  }

}
