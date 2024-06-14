import {Injectable, OnDestroy} from '@angular/core';
import {Point} from '../../bd2-heatmap.dom';
import {Subject} from 'rxjs';

@Injectable()
export class TooltipService implements OnDestroy{

  request$ = new Subject<[boolean, string, Point, Point]>();

  constructor() {
  }

  showTooltip(label: string, point: Point, location: Point) {
    this.request$.next([true, label, point, location]);
  }

  hideTooltip(point: Point, location: Point) {
    this.request$.next([false, undefined, point, location]);
  }

  ngOnDestroy(): void {
    this.request$.complete();
  }

}
