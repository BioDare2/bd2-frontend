import {ChangeDetectionStrategy, Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {GraphicContext} from '../../bd2-heatmap.dom';

@Component({
  selector: '[bd2hm-pane-back]',
  template: `
    <svg:rect class="bd2hm-dataBackground" [attr.x]="margin" [attr.y]="margin"
              [attr.width]="width" [attr.height]="height"
    >
    </svg:rect>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush
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
