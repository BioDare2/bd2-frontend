import {ChangeDetectionStrategy, Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {BoxSerie, GraphicContext} from '../../../bd2-heatmap.dom';

@Component({
    selector: '[bd2hm-serie-row]',
    template: `
    @if (graphic && serie) {
      <svg:g class="bd2hm-serie">
        @if (usePattern) {
          <svg:defs>
            <svg:pattern [attr.id]="'pos-stripes-' + serie.key" patternUnits="userSpaceOnUse" width="8" height="8" patternTransform="rotate(45)">
              <svg:rect x="0" y="0" width="8" height="8" fill="white"/>
              <svg:line x1="0" y1="0" x2="0" y2="8" stroke="#666" stroke-width="3"/>
            </svg:pattern>
            <svg:pattern [attr.id]="'neg-stripes-' + serie.key" patternUnits="userSpaceOnUse" width="8" height="8" patternTransform="rotate(-45)">
              <svg:rect x="0" y="0" width="8" height="8" fill="white"/>
              <svg:line x1="0" y1="0" x2="0" y2="8" stroke="#666" stroke-width="3"/>
            </svg:pattern>
          </svg:defs>
        }
        @for (point of serie.data; track trackByIndex($index, point)) {
          <svg:g bd2hm-data-point-box
            [point]="point"
            [xScale]="graphic.xScale"
            [yPosition]="yPosition"
            [yHeight]="yHeight"
            [colorScale]="graphic.colorScale"
            [label]="serie.label"
            [pattern]="usePattern ? (point.y > 0 ? 'pos-stripes-' + serie.key : 'neg-stripes-' + serie.key) : null"
          ></svg:g>
        }
      </svg:g>
    }
    `,
    styles: [],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class SerieRowComponent implements OnInit, OnChanges {

  @Input()
  graphic: GraphicContext;

  @Input()
  serie: BoxSerie;

  @Input()
  usePattern: boolean = true;

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
