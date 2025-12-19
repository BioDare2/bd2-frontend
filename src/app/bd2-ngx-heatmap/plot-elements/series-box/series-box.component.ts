import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {BoxSerie, GraphicContext} from '../../bd2-heatmap.dom';

/**
 * Component to render a box series (contains multiple series rows)
 */
@Component({
    selector: '[bd2hm-series-box]',
    templateUrl: './series-box.component.html',
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
