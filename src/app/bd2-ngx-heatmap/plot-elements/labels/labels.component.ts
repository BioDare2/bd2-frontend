import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {GraphicContext, Serie} from '../../bd2-heatmap.dom';

/**
 * Component to render the labels for each row in the heatmap.
 */
@Component({
    selector: '[bd2hm-labels]',
    templateUrl: './labels.component.html',
    styles: [],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class LabelsComponent implements OnInit {

  @Input()
  graphic: GraphicContext;

  @Input()
  data: Serie[];

  @Input()
  alwaysOn = true;

  constructor() {
  }

  trackByIndex(index: number, item: any) {
    return index;
  }

  ngOnInit(): void {
  }

  /* Get the y-coordinate for the label */
  yStart(serie: Serie) {
    return this.graphic.yScale(serie.key);
  }

  /* Get the maximum height for the label */
  maxHeight() {
    return this.graphic.yScale.bandwidth();
  }

  /* Get the color for the label */
  color(ix: number) {
    return this.graphic.labelsColors(ix);
  }
}
