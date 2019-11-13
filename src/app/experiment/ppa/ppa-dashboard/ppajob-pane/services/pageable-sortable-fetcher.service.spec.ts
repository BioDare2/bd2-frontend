import {PageableSortableFetcherService} from './pageable-sortable-fetcher.service';
import {fakeAsync, tick} from '@angular/core/testing';
import {of} from 'rxjs';
import {PageEvent, Sort} from '@angular/material';
import {arraysMatch} from '../../../../../shared/collections-util';

class TestablePageableSortableFetcherService extends PageableSortableFetcherService<number[], string, string[], string[]> {

  constructor(removeDebounce = true) {
    super(removeDebounce);
  }

  protected sameInput(def1: any, def2: any): boolean {
    if (Array.isArray(def1)) {
      return arraysMatch(def1, def2);
    }
    return def1 === def2;
  }

  protected fetchAsset(input: number[]) {
    const val = input.map( v => '' + (v + 1));
    return of(val);
  }

  protected assetToDataLength(asset: string[], parmas?: any): number {
    return asset.length;
  }



  protected processSortedPagedData(asset: string[], sort: Sort, page: PageEvent, params: string) {

    const sorted = this.sortAsset(asset, sort, params);
    const paged = this.pageAsset(sorted, page, params);
    const processed = this.processAsset(paged, params);
    return processed;
  }

  protected sortAsset(asset: string[], sort: Sort, params?: string) {
    return asset;
  }

  protected pageAsset(asset: string[], page: PageEvent, params?: string) {
    return asset;
  }

  protected processAsset(asset: string[], params: string) {
    return asset;
  }




}

describe('PageableSortableFetcherService', () => {

  let service: PageableSortableFetcherService<number[], string, string[], string[]>;

  beforeEach(() => {


    service = new TestablePageableSortableFetcherService(true);

  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('initAssetsInput gives ids only on ON and valid ids', fakeAsync( () => {

    let val;
    let error;

    // @ts-ignore
    service.initAssetsInput().subscribe( ids => val = ids, err => error = err );

    expect(val).toBeUndefined();
    expect(error).toBeUndefined();

    service.input(undefined);
    tick();
    expect(val).toBeUndefined();
    expect(error).toBeUndefined();

    service.input([] as any);
    tick();
    expect(val).toBeUndefined();
    expect(error).toBeUndefined();

    service.input([0] as any);
    tick();
    expect(val).toBeUndefined();
    expect(error).toBeUndefined();

    service.on(true);
    tick();
    expect(val).toEqual([0]);
    expect(error).toBeUndefined();

    service.input([120, 340]);
    tick();
    expect(val).toEqual([120, 340]);
    expect(error).toBeUndefined();

    val = undefined;
    service.on(false);
    service.input([1200, 3400]);
    tick();
    expect(val).toBeUndefined();
    expect(error).toBeUndefined();

  }));

  it('initAssetsInput gives only distinct ids', fakeAsync( () => {

    let val = [1, 1];
    let error;

    // @ts-ignore
    service.initAssetsInput().subscribe( ids => val = ids, err => error = err );
    service.on(true);

    tick();
    expect(val).toEqual([1, 1]);
    expect(error).toBeUndefined();


    service.input([12, 34]);
    tick();
    expect(val).toEqual([12, 34]);
    expect(error).toBeUndefined();

    val = undefined;
    service.input([12, 34]);
    tick();
    expect(val).toBeUndefined();
    expect(error).toBeUndefined();

    service.input([12, 340]);
    tick();
    expect(val).toEqual([12, 340]);
    expect(error).toBeUndefined();

    service.input([12, 341]);
    tick();
    expect(val).toEqual([12, 341]);
    expect(error).toBeUndefined();

    val = undefined;
    service.input([12, 341]);
    tick();
    expect(val).toBeUndefined();
    expect(error).toBeUndefined();

    service.input([1, 341]);
    tick();
    expect(val).toEqual([1, 341]);
    expect(error).toBeUndefined();

  }));

  it('initAssetsInput gives last on refresh', fakeAsync( () => {

    let val = [1, 1];
    let error;

    // @ts-ignore
    service.initAssetsInput().subscribe( ids => val = ids, err => error = err );
    service.on(true);

    tick();
    expect(val).toEqual([1, 1]);
    expect(error).toBeUndefined();

    service.refresh();
    tick();
    expect(val).toEqual([1, 1]);
    expect(error).toBeUndefined();

    service.input([12, 34]);
    tick();

    val = undefined;

    service.refresh();
    tick();
    expect(val).toEqual([12, 34]);
    expect(error).toBeUndefined();

    val = undefined;
    service.refresh();
    tick();
    expect(val).toEqual([12, 34]);
    expect(error).toBeUndefined();

    service.input([120, 34]);
    tick();
    val = undefined;
    service.refresh();
    tick();
    expect(val).toEqual([120, 34]);
    expect(error).toBeUndefined();

  }));

  it('multiple refresh when off give only one when back on', fakeAsync( () => {

    const vals = [];
    let error;

    // @ts-ignore
    service.initAssetsInput().subscribe( ids => vals.push(ids), err => error = err );
    service.on(true);
    service.input([12, 34]);
    tick();

    expect(vals).toEqual([[12, 34]]);
    expect(error).toBeUndefined();

    service.refresh();
    tick();
    expect(vals).toEqual([[12, 34], [12, 34]]);
    expect(error).toBeUndefined();


    service.on(false);
    service.refresh();
    service.refresh();
    service.refresh();
    service.on(true);
    expect(vals).toEqual([[12, 34], [12, 34], [12, 34]]);

  }));


  it('loadAsset emits true in busy', fakeAsync( () => {

    const val: boolean[] = [];

    service.isBusy$.subscribe( b => val.push(b));

    tick();
    expect(val).toEqual([false]);

    // @ts-ignore
    service.loadAsset([1]);
    tick();
    expect(val).toEqual([false, true, false]);

  }));

  it('loadAsset fetches assets and puts them in stream', fakeAsync( () => {

    let val;
    let error;

    // @ts-ignore
    service.asset$.subscribe( a => val = a);
    service.error$.subscribe( err => error = err);

    tick();
    expect(val).toBeUndefined();
    expect(error).toBeUndefined();

    // @ts-ignore
    service.loadAsset([1, 2]);
    tick();

    expect(error).toBeUndefined();
    expect(val).toEqual(['2', '3']);


  }));

  it('set asset updates state and emits asset', fakeAsync( () => {


    let val;
    let error;

    // @ts-ignore
    service.asset$.subscribe( a => val = a);
    service.error$.subscribe( err => error = err);

    tick();
    expect(val).toBeUndefined();
    expect(error).toBeUndefined();

    // @ts-ignore
    service.setAsset(['A'], [1, 2]);
    tick();

    expect(error).toBeUndefined();
    expect(val).toEqual(['A']);
    expect(service.currentInput).toEqual([1, 2]);
    expect(service.currentAsset).toEqual(['A']);
    // now it happens in paging and sorting
    // expect(service.dataLength).toBe(1);

  }));

  it('data mutators filter empty assets', fakeAsync( () => {

    // @ts-ignore
    const [assets, sorts, pages, params] = service.dataMutators();

    const val: any[] = [];
    assets.subscribe( v => val.push(v));
    tick();
    expect(val).toEqual([]);

    // @ts-ignore
    service.asset$.next(['A']);
    tick();
    expect(val).toEqual([['A']]);

    // @ts-ignore
    service.asset$.next(undefined);
    // @ts-ignore
    service.asset$.next(['B']);

    tick();
    expect(val).toEqual([['A'], ['B']]);

  }));

  it('data mutators filter empty page', fakeAsync( () => {

    // @ts-ignore
    const [assets, sorts, pages, params] = service.dataMutators();

    const val: any[] = [];
    pages.subscribe( v => val.push(v));
    tick();
    expect(val).toEqual([]);

    const page1 = new PageEvent();
    const page2 = new PageEvent();
    page2.pageIndex = 2;

    // @ts-ignore
    service.page$.next(undefined);

    service.page(page1);
    // @ts-ignore
    service.page$.next(undefined);

    service.page(page2);
    tick();

    expect(val).toEqual([page1, page2]);


  }));


  it('data stream does not emits without a page set', fakeAsync( () => {

    const val = [];
    let error;

    service.data$.subscribe( a => val.push(a));
    service.error$.subscribe( err => error = err);

    tick();
    expect(val).toEqual([]);
    expect(error).toBeUndefined();

    // @ts-ignore
    service.setAsset(['A'], [1, 2]);
    tick();
    expect(val).toEqual([]);
    expect(error).toBeUndefined();

    const sort: Sort = {active: 'id', direction: 'asc'};
    service.sort(sort);

    tick();
    expect(val).toEqual([]);
    expect(error).toBeUndefined();

    const page = new PageEvent();
    page.pageIndex = 1;
    page.pageSize = 3;
    service.page(page);

    tick();
    expect(error).toBeUndefined();
    expect(val).toEqual([['A']]);

  }));

  it('data stream responds to assets, sort and page events', fakeAsync( () => {

    const val = [];
    let error;

    service.data$.subscribe( a => val.push(a));
    service.error$.subscribe( err => error = err);

    tick();
    expect(val).toEqual([]);
    expect(error).toBeUndefined();

    // @ts-ignore
    service.setAsset(['A'], [1, 2]);
    tick();
    expect(val).toEqual([]);
    expect(error).toBeUndefined();

    const sort: Sort = {active: 'id', direction: 'asc'};
    service.sort(sort);

    tick();
    expect(val).toEqual([]);
    expect(error).toBeUndefined();

    const page = new PageEvent();
    page.pageIndex = 1;
    page.pageSize = 3;
    service.page(page);

    tick();
    expect(error).toBeUndefined();
    expect(val).toEqual([['A']]);

    service.page(page);
    // @ts-ignore
    service.setAsset(['B'], [1, 2]);
    service.sort(sort);

    tick();
    expect(error).toBeUndefined();
    // one extra B as sort trigers page as well
    expect(val).toEqual([['A'], ['A'], ['B'], ['B'], ['B']]);

    service.sort(undefined);
    expect(error).toBeUndefined();
    // two extra B as sort trigers page as well
    expect(val).toEqual([['A'], ['A'], ['B'], ['B'], ['B'], ['B'], ['B']]);

  }));

  it('sort resets the page to first one', fakeAsync( () => {


    const vals: PageEvent[] = [];

    // @ts-ignore
    service.page$.subscribe( p => vals.push(p));

    let sort: Sort = {active: 'id', direction: 'asc'};
    service.sort(sort);

    tick();
    // cause pages is behaviour subject and starts with undefined
    expect(vals).toEqual([undefined]);

    const page = new PageEvent();
    page.pageIndex = 2;
    page.pageSize = 11;
    service.page(page);

    tick();
    expect(vals).toEqual([undefined, page]);

    sort = {active: 'id', direction: 'desc'};
    service.sort(sort);

    tick();
    expect(vals.length).toEqual(3);

    const page2 = vals[2];
    expect(page2.pageIndex).toBe(0);
    expect(page2.pageSize).toBe(11);

  }));


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
});
