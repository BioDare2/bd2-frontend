import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {GraphicContext} from '../../../bd2-heatmap.dom';

/**
 * Component for rendering the 4 axes (= axis box) in the heatmap plot.
 */
@Component({
    selector: '[bd2hm-axis-box]',
    templateUrl: './axis-box.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class AxisBoxComponent implements OnInit {

  @Input()
  graphic: GraphicContext;

  constructor() {
  }

  ngOnInit(): void {
  }
}
