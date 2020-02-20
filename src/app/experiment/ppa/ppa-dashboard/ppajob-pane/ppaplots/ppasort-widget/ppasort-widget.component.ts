import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import { Sort } from '@angular/material/sort';

@Component({
  selector: 'bd2-ppasort-widget',
  templateUrl: './ppasort-widget.component.html',
  styles: []
})
export class PPASortWidgetComponent implements OnInit {

  @Output()
  sort = new EventEmitter<Sort>();

  get sorted() {
    return this._sorted;
  }

  set sorted(val: string) {
    this._sorted = val;
    const sort: Sort = {
      active: this._sorted,
      direction: 'asc'
    };
    if (this._sorted === 'none') { sort.active = undefined; }
    // if (this._sorted === 'median') { sort.active = 'period'; }

    this.sort.next(sort);

  }

  constructor() { }

  // tslint:disable-next-line:variable-name
  _sorted = 'none';


  ngOnInit() {
  }

}
