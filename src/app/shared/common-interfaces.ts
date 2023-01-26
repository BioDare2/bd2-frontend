import {LegacyPageEvent as PageEvent} from '@angular/material/legacy-paginator';

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
