import {fakeAsync, tick} from '@angular/core/testing';
import {Observable, of} from 'rxjs';
import { PageEvent } from '@angular/material/paginator';
import { Sort } from '@angular/material/sort';
import {PageableSortableArraysFetcherService} from './pageable-sortable-arrays-fetcher.service';
import {arraysMatch} from '../shared/collections-util';


class TestablePageableSortableArraysFetcherService extends PageableSortableArraysFetcherService<number[], string, string[], string> {

  public constructor(removeDebounce= true) {
    super(removeDebounce);
  }

  protected sameInput(def1: any, def2: any): boolean {
    if (Array.isArray(def1)) {
      return arraysMatch(def1, def2);
    }
    return def1 === def2;
  }

  protected assetToData(asset: string[], params?: string): string[] {
    return asset;
  }

  protected fetchAsset(input: number[]): Observable<string[]> {
    const val = input.map( v => '' + (v + 1));
    return of(val);
  }

}

describe('PageableSortableArraysFetcherService', () => {

  let service: PageableSortableArraysFetcherService<number[], string, string[], string>;

  beforeEach(() => {

    function fetching(ids: number[]) {
      const val = ids.map( v => '' + (v + 1));
      return of(val);
    }
    service = new TestablePageableSortableArraysFetcherService(true);


  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });


  it('data stream sets busy during sorting and pagination', fakeAsync( () => {

    const val = [];
    const data = [];
    let error;

    service.isBusy$.subscribe( a => val.push(a));
    service.error$.subscribe( err => error = err);
    // otherwise the data stream is not consumed
    service.data$.subscribe( d => data.push(d));

    tick();
    expect(val).toEqual([false]);
    expect(error).toBeUndefined();


    // @ts-ignore
    service.setAsset(['A'], [1, 2]);

    const sort: Sort = {active: 'id', direction: 'asc'};
    service.sort(sort);

    const page = new PageEvent();
    page.pageIndex = 1;
    page.pageSize = 3;
    service.page(page);

    tick();
    expect(error).toBeUndefined();
    expect(val).toEqual([false, true, false]);


    service.page(page);
    tick();
    expect(error).toBeUndefined();
    expect(val).toEqual([false, true, false, true, false]);


  }));

  it('sorts preserves the original if applied', () => {

    const asset = ['a', 'c', 'e', 'b', 'd'];

    const orgOrder = Array.from(asset);


    let sort: Sort;

    // @ts-ignore
    let sorted = service.sortData(asset, sort);
    expect(sorted).toBe(asset);


    sort = {active: 'label', direction: 'asc'};

    // @ts-ignore
    sorted = service.sortData(asset, sort);
    expect(sorted).not.toBe(asset);

    const sortedOrder = sorted;
    const currentOrder = asset;

    expect(sortedOrder).not.toEqual(orgOrder);
    expect(currentOrder).toEqual(orgOrder);

  });

  it('sorts by key', () => {

    const asset = ['a', 'c', 'e', 'b', 'd'];

    let sort =  {active: 'label', direction: 'asc'};
    // @ts-ignore
    const keyF = service.sortingKey(sort);

    expect(keyF('a')).toBe('a');

    // @ts-ignore
    let sorted = service.sortData(asset, sort);
    expect(sorted).not.toBe(asset);

    let exp = ['a', 'b', 'c', 'd', 'e'];
    expect(sorted).toEqual(exp);

    sort =  {active: 'label', direction: 'desc'};
    // @ts-ignore
    sorted = service.sortData(asset, sort);
    exp = exp.reverse();
    expect(sorted).toEqual(exp);

  });

  it('page preserves original if applied', () => {

    const asset = ['a', 'c', 'e', 'b', 'd'];

    const orgOrder = Array.from(asset);


    let page: PageEvent;

    // @ts-ignore
    let paged = service.pageData(asset, page);
    expect(paged).toBe(asset);


    page = new PageEvent();
    page.pageIndex = 1;
    page.pageSize = 2;

    // @ts-ignore
    paged = service.pageData(asset, page);
    expect(paged).not.toBe(asset);

    const currentOrder = asset;
    expect(currentOrder).toEqual(orgOrder);

    expect(paged.length).toEqual(2);
    expect(paged.length).toBeLessThan(asset.length);

  });

  it('page pages', () => {

    const asset = ['a', 'c', 'e', 'b', 'd'];

    const orgOrder = Array.from(asset);


    let page = new PageEvent();
    page.pageIndex = 0;
    page.pageSize = 3;

    // @ts-ignore
    let paged = service.pageData(asset, page);
    let currentOrder = paged;
    let exp = [ orgOrder[0], orgOrder[1], orgOrder[2]];
    expect(currentOrder).toEqual(exp);


    page = new PageEvent();
    page.pageIndex = 1;
    page.pageSize = 2;

    // @ts-ignore
    paged = service.pageData(asset, page);
    currentOrder = paged;

    exp = [ orgOrder[2], orgOrder[3]];
    expect(currentOrder).toEqual(exp);

    page = new PageEvent();
    page.pageIndex = 10;
    page.pageSize = 20;

    // @ts-ignore
    paged = service.pageData(asset, page);
    currentOrder = paged;

    exp = [];
    expect(currentOrder).toEqual(exp);

  });

});
