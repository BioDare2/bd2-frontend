import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {GraphicContext, Serie} from '../../bd2-heatmap.dom';

@Component({
    selector: '[bd2hm-labels]',
    template: `
    @if (graphic && data) {
      <svg:g class="bd2hm-labels">
        @for (serie of data; track trackByIndex(ix, serie); let ix = $index) {
          <svg:g bd2hm-label-box
            [serie]="serie"
            [yStart]="yStart(serie)"
            [maxHeight]="maxHeight()"
            [alwaysOn]="alwaysOn"
            >
          </svg:g>
          }
          </svg:g>
        }
    `,
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

  yStart(serie: Serie) {
    // return this.graphic.yScale(serie.key) + this.graphic.yScale.bandwidth() / 4;
    return this.graphic.yScale(serie.key);
  }

  maxHeight() {
    return this.graphic.yScale.bandwidth();
  }

  color(ix: number) {
    return this.graphic.labelsColors(ix);
  }

  /*
  yMiddle(serie: Serie) {
    // console.log("Band", this.graphic.yScale.bandwidth());
    return this.graphic.yScale(serie.key) + this.graphic.yScale.bandwidth() / 2;
  }*/


  /*yHeight() {
    return 2 + this.graphic.yScale.bandwidth() / 2;
  }*/


}
