import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {BoxSerie, GraphicContext} from '../../bd2-heatmap.dom';

@Component({
    selector: '[bd2hm-series-box]',
    template: `
    @for (serie of series; track trackByIndex($index, serie)) {
      <svg:g
        bd2hm-serie-row
        [graphic]="graphic"
        [serie]="serie"
        [usePattern]="usePattern">
      </svg:g>
      }
    `,
    styles: [],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class SeriesBoxComponent implements OnInit {

  @Input()
  series: BoxSerie[];

  @Input()
  graphic: GraphicContext;

  @Input()
  usePattern: boolean = false;

  constructor() {
  }

  trackByIndex(index: number, item: any) {
    return index;
  }

  ngOnInit(): void {
  }


}
