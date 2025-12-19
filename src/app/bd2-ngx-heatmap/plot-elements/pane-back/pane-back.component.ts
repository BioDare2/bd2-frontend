import {ChangeDetectionStrategy, Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {GraphicContext} from '../../bd2-heatmap.dom';

/**
 * Background pane component for the heatmap plot area.
 *
 * Renders a rectangle as the background of the heatmap plot area.
 */
@Component({
    selector: '[bd2hm-pane-back]',
    templateUrl: './pane-back.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})

export class PaneBackComponent implements OnInit, OnChanges {

  @Input()
  graphic: GraphicContext;

  @Input()
  margin = 2;

  width: number;
  height: number;

  constructor() {
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.width = this.graphic.workspaceWidth - 2 * this.margin;
    this.height = this.graphic.workspaceHeight - 2 * this.margin;
    if (this.width < 0) {
      this.width = 0;
    }
    if (this.height < 0) {
      this.height = 0;
    }
  }

}
