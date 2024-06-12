import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {BD2ColorPalette} from '../../color/color-palette';

class LegendItem {

  constructor(public id: any, public title: string,
              public borderColor: string, public bcgColor: string,
              public marked?: boolean) {
  }
}

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'bd2-simple-legend',
  template: `
    <div class="simple-legend clearfix">
      <div *ngFor="let item of items" class="legend-item float-left"
           [class.marked]="item.marked"
           (click)="toggleMark(item)">
        <div class="color-box float-left"
             [style.border-color]="item.borderColor"
             [style.background]="item.bcgColor"></div>
        <span>{{item.title}}</span>
      </div>
    </div>
  `,
  styles: [

      `
                                 div.marked {
                                   text-decoration: line-through;
                                 }
                           
                                 div.legend-item {
                                   margin-right: 1.5em;
                                 }
                           
                                 div.color-box {
                                   width: 2.5em;
                                   height: 1.1em;
                                   margin-right: 0.5em;
                                   border-width: 3px;
                                   border-style: solid;
                                 }
                           
                                 div.legend-item span {
                                   word-wrap: break-word; /* All browsers since IE 5.5+ */
                                   overflow-wrap: break-word; /* Renamed property in CSS3 draft spec */
                                 }
                               `
  ]
})
export class SimpleLegendComponent implements OnInit, OnChanges {

  @Input()
  labels: string[] = [];

  @Input()
  palette: string[] = [];

  @Input()
  opacity = 0.35;

  @Output()
  marked = new EventEmitter<number[]>();

  items: LegendItem[] = [];

  constructor() {
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {

    this.items = this.buildItems(this.labels, this.palette);
  }

  buildItems(legend: string[], pallete: string[]): LegendItem[] {

    const tab: LegendItem[] = [];

    if (!legend) {
      return tab;
    }

    for (let i = 0; i < legend.length; i++) {
      tab.push(new LegendItem(i, legend[i], pallete[i] ? pallete[i] : 'black', pallete[i] ? BD2ColorPalette.toRGBA(pallete[i], this.opacity) : 'black'));
    }

    return tab;

  }

  toggleMark(item: LegendItem) {
    // console.log("Item marked",item);
    item.marked = !item.marked;

    this.emitMarked();
  }

  emitMarked() {
    const marked: number[] = [];
    this.items.forEach((item, ix) => {
      if (item.marked) {
        marked.push(ix);
      }
    });
    this.marked.emit(marked);
  }


}
