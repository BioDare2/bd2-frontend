import {PageEvent} from '@angular/material/paginator';

export interface SetAble<V> {

  setAll(v: any): void;

  clone(): V;
}

export interface Validator<T> {

  validate(obj: T): string[];

}

export class ListWrapper<T> {
  data: T[] = [];
  currentPage: PageEvent = new PageEvent();
}
