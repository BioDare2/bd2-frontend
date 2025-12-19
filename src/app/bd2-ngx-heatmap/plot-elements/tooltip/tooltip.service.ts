import {Injectable, OnDestroy} from '@angular/core';
import {Point} from '../../bd2-heatmap.dom';
import {Subject} from 'rxjs';

/**
 * Service to request tooltip show/hide
 */
@Injectable()
export class TooltipService implements OnDestroy{

  request$ = new Subject<[boolean, string, Point, Point]>();

  constructor() {
  }

  /* Request showing of tooltip */
  showTooltip(label: string, point: Point, location: Point) {
    this.request$.next([true, label, point, location]);
  }

  /* Request hiding of tooltip */
  hideTooltip() {
    this.request$.next([false, undefined, undefined, undefined]);
  }

  ngOnDestroy(): void {
    this.request$.complete();
  }
}
