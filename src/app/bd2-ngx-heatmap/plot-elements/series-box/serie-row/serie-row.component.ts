import {ChangeDetectionStrategy, Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {BoxSerie, GraphicContext} from '../../../bd2-heatmap.dom';

/**
 * A single row in the series box plot (= one timeseries)
 */
@Component({
    selector: '[bd2hm-serie-row]',
    templateUrl: './serie-row.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class SerieRowComponent implements OnInit, OnChanges {

  @Input()
  graphic: GraphicContext;

  @Input()
  serie: BoxSerie;

  @Input()
  usePattern: boolean = false;

  yPosition: number;

  yHeight: number;

  constructor() {
  }

  trackByIndex(index: number, item: any) {
    return index;
  }

  ngOnInit(): void {
  }

  /* Update position and height on input changes */
  ngOnChanges(changes: SimpleChanges): void {
    if (this.graphic && this.serie) {
      this.yPosition = this.graphic.yScale(this.serie.key);
      this.yHeight = this.graphic.yScale.bandwidth();
    }
  }
}
