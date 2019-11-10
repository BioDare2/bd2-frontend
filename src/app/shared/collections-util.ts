import {PageEvent, SortDirection} from '@angular/material';

export function removeItemFromArr<V>(item: V, arr: V[]): boolean {
  const ix = arr.indexOf(item);
  if (ix >= 0) {
    arr.splice(ix, 1);
  }
  return ix >= 0;
}

export function shallowSet(source: any, destination: any) {
  for (const k in source) {
    destination[k] = source[k];
  }
}


export function arraysMatch(a: any[], b: any) {

  if (a === b) { return true; }
  if (a == null || b == null) { return false; }
  if (a.length !== b.length) { return false; }

  for (let i = 0; i < a.length; ++i) {
    if (a[i] !== b[i]) { return false; }
  }
  return true;
}


export function sortObjectData<T>(data: T[], direction: SortDirection, keyExtractor: (value: T) => any): T[] {

  const isAsc = direction === 'asc';
  return data.slice().sort((a, b) => {
      return simpleCompare(keyExtractor(a), keyExtractor(b), isAsc);
  });
}

export function simpleCompare(a, b, isAsc) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}

export function pageObjectData<T>(data: T[], page: PageEvent): T[] {
  if (!page) {
    return data;
  }

  const startIndex = page.pageIndex * page.pageSize;

  return data.slice().splice(startIndex, page.pageSize);
}


export function sortingMedian(data: number[]) {
  if (!data || data.length === 0) { return Number.MAX_VALUE; }
  data = data.slice().sort();
  return data[Math.floor(data.length / 2)];
}
