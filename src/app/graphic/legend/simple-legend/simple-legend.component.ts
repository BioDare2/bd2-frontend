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
      @for (item of items; track item) {
      <div class="legend-item float-left"
        [class.marked]="item.marked"
        tabindex="0"
        role="button"
        (click)="toggleMark(item)"
        (keydown)="onLegendKeydown($event, item)">
        <div class="color-box float-left"
          [style.border-color]="item.borderColor"
          [style.background]="item.bcgColor"></div>
        <span>{{item.title}}</span>
      </div>
      }
    </div>
    `,
    styleUrls: ["./simple-legend.component.css"],
    standalone: false
})
export class SimpleLegendComponent implements OnInit, OnChanges {

  @Input()
  labels: string[] = [];

  @Input()
  palette: string[] = [];

  @Input()
  opacity = 1;

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

  onLegendKeydown(event: KeyboardEvent, item: LegendItem) {
    if (event.key === 'Enter' || event.key === ' ') {
      this.toggleMark(item);
      event.preventDefault();
    }
  }


}
