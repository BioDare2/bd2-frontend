import {fakeAsync, tick} from '@angular/core/testing';
import {of} from 'rxjs';
import {PageEvent} from '@angular/material/paginator';
import {Sort} from '@angular/material/sort';
import {arraysMatch} from '../shared/collections-util';
import {RemotelyPageableSortableFetcher} from './remotely-pageable-sortable-fetcher.service';
import {ListWrapper} from '../shared/common-interfaces';

class TestableRemotelyPageableSortableFetcher extends RemotelyPageableSortableFetcher<number[], string, ListWrapper<string>, string[]> {

  constructor(removeDebounce = true) {
    super(removeDebounce);
  }

  protected sameInput(def1: any, def2: any): boolean {
    if (Array.isArray(def1)) {
      return arraysMatch(def1, def2);
    }
    return def1 === def2;
  }

  protected fetchAsset(input: number[], sort: Sort, page: PageEvent) {
    const val = input.map( v => '' + (v + 1));
    const wrap = new ListWrapper<string>();
    wrap.data = val;
    wrap.currentPage.pageIndex = page.pageIndex;
    wrap.currentPage.pageSize = page.pageSize;
    wrap.currentPage.length = (page.pageIndex + 1) * page.pageSize;

    return of(wrap);
  }

  protected assetToDataLength(asset: ListWrapper<string>): number {
    return asset.currentPage.length;
  }



  protected processData(asset: ListWrapper<string>, params: string) {

    return asset.data;
  }

  protected assetToPage(asset: ListWrapper<string>) {
    return asset.currentPage;
  }



}

describe('RemotelyPageableSortableFetcher', () => {

  let service: RemotelyPageableSortableFetcher<number[], string, ListWrapper<string>, string[]>;

  beforeEach(() => {


    service = new TestableRemotelyPageableSortableFetcher(true);

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

  it('fetches the requested data', fakeAsync( () => {

    const vals = [];
    let error;

    service.data$.subscribe( v =>  vals.push(v), err => error = err);

    service.on(true);
    service.input([2, 4]);
    const s = {active: 'id', direction: 'asc'} as Sort;
    service.sort(s);
    const p = new PageEvent();
    p.pageIndex = 1;
    p.pageSize = 10;
    service.page(p);

    tick();
    expect(vals.length).toEqual(1);
    expect(vals).toEqual([['3', '5']]);
    expect(service.dataLength).toEqual(20);
    expect(service.currentPage.pageSize).toEqual(p.pageSize);
    expect(service.currentSort).toBe(s);
    expect(service.currentInput).toEqual([2, 4]);

    expect(error).toBeUndefined();


  }));


  it('loadAsset emits true in busy', fakeAsync( () => {

    const val: boolean[] = [];

    service.isBusy$.subscribe( b => val.push(b));

    tick();
    expect(val).toEqual([false]);

    // @ts-ignore
    service.loadAsset([1], undefined, new PageEvent());
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
    service.loadAsset([1, 2], undefined, new PageEvent());
    tick();

    expect(error).toBeUndefined();
    expect(val.data).toEqual(['2', '3']);


  }));

  it('set asset updates state and emits asset', fakeAsync( () => {


    let val;
    let error;

    // @ts-ignore
    service.asset$.subscribe( a1 => val = a1);
    service.error$.subscribe( err => error = err);

    tick();
    expect(val).toBeUndefined();
    expect(error).toBeUndefined();

    const a = new ListWrapper<string>();
    a.data = ['A'];
    a.currentPage.pageIndex = 1;
    a.currentPage.pageSize = 10;
    a.currentPage.length = 100;

    const sort: Sort = {active: 'id', direction: 'asc'};
    const page = new PageEvent();

    // @ts-ignore
    service.setAsset(a, [1, 2], sort, page);
    tick();

    expect(error).toBeUndefined();
    expect(val).toBe(a);
    expect(service.currentInput).toEqual([1, 2]);
    expect(service.currentAsset).toBe(a);
    expect(service.currentPage).toBe(a.currentPage);
    expect(service.currentSort).toBe(sort);
    expect(service.dataLength).toBe(100);

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

  it('asset mutators filter empty page', fakeAsync( () => {

    // @ts-ignore
    const [assets, sorts, pages] = service.assetsMutators();

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

  it('assets stream does not emits without a page set', fakeAsync( () => {

    const val = [];
    let error;

    // @ts-ignore
    service.asset$.subscribe( a => val.push(a));
    service.error$.subscribe( err => error = err);

    tick();
    expect(val).toEqual([undefined]);
    expect(error).toBeUndefined();

    // @ts-ignore
    service.input([1, 2]);
    service.on(true);
    tick();
    expect(val).toEqual([undefined]);
    expect(error).toBeUndefined();

    const sort: Sort = {active: 'id', direction: 'asc'};
    service.sort(sort);

    tick();
    expect(val).toEqual([undefined]);
    expect(error).toBeUndefined();

    const page = new PageEvent();
    page.pageIndex = 1;
    page.pageSize = 3;
    service.page(page);

    tick();
    expect(error).toBeUndefined();
    expect(val.length).toEqual(2);
    expect(val[1].data).toEqual(['2', '3']);

  }));

  it('asset stream responds to inputs, sort and page events', fakeAsync( () => {

    const val = [];
    let error;

    // @ts-ignore
    service.asset$.subscribe( a => val.push(a));
    service.error$.subscribe( err => error = err);

    tick();
    expect(val).toEqual([undefined]);
    expect(error).toBeUndefined();

    // @ts-ignore
    service.input([1, 2]);
    service.on(true);
    tick();
    expect(val).toEqual([undefined]);
    expect(error).toBeUndefined();

    const sort: Sort = {active: 'id', direction: 'asc'};
    service.sort(sort);

    tick();
    expect(val).toEqual([undefined]);
    expect(error).toBeUndefined();

    const page = new PageEvent();
    page.pageIndex = 1;
    page.pageSize = 3;
    service.page(page);

    tick();
    expect(error).toBeUndefined();
    expect(val.length).toEqual(2);
    expect(val[1].data).toEqual(['2', '3']);

    service.page(page);
    // @ts-ignore
    service.input([2, 2]);
    service.sort(sort);

    tick();
    expect(error).toBeUndefined();
    // one extra B as sort trigers page as well
    // expect(val).toEqual([undefined, ['1', '2'], ['1', '2'], ['2', '2'], ['2', '2'], ['2', '2']]);
    expect(val.length).toEqual(7);
    expect(val[6].data).toEqual(['3', '3']);

    service.sort(undefined);
    expect(error).toBeUndefined();
    // two extra B as sort trigers page as well
    // expect(val).toEqual([['1', '2'], ['1', '2'], ['2', '2'], ['2', '2'], ['2', '2'], ['2', '2'], ['2', '2']]);
    expect(val.length).toEqual(9);
    expect(val[8].data).toEqual(['3', '3']);

  }));


  /*
  it('data mutators filter empty page', fakeAsync( () => {

    // @ts-ignore
    const [assets, params] = service.dataMutators();

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


  }));*/


  /*
  it('data stream does not emits without a page set', fakeAsync( () => {

    const val = [];
    let error;

    service.data$.subscribe( a => val.push(a));
    service.error$.subscribe( err => error = err);

    tick();
    expect(val).toEqual([]);
    expect(error).toBeUndefined();

    const a = new ListWrapper<string>()
    a.data = ['A']
    a.currentPage.pageIndex = 1;
    a.currentPage.pageSize = 10;
    a.currentPage.length = 100;

    // @ts-ignore
    service.setAsset(['A'], [1, 2], );
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

  }));*/

  /*
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
  */

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


  it('input resets the page to first one', fakeAsync( () => {


    const vals: PageEvent[] = [];

    // @ts-ignore
    service.page$.subscribe( p => vals.push(p));

    let inp = [1, 2];
    service.input(inp);

    tick();
    // cause pages is behaviour subject and starts with undefined
    expect(vals).toEqual([undefined]);

    const page = new PageEvent();
    page.pageIndex = 2;
    page.pageSize = 11;
    service.page(page);

    tick();
    expect(vals).toEqual([undefined, page]);

    inp = [2, 2];
    service.input(inp);

    tick();
    expect(vals.length).toEqual(3);

    const page2 = vals[2];
    expect(page2.pageIndex).toBe(0);
    expect(page2.pageSize).toBe(11);

  }));



  it('data stream sets busy during processing', fakeAsync( () => {

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



    const sort: Sort = {active: 'id', direction: 'asc'};
    service.sort(sort);

    const page = new PageEvent();
    page.pageIndex = 1;
    page.pageSize = 3;
    service.page(page);

    const ass = new ListWrapper<string>();
    // @ts-ignore
    service.setAsset(ass, [1, 2], sort, page);

    tick();
    expect(error).toBeUndefined();
    expect(val).toEqual([false, true, false]);


    service.params('a');
    tick();
    expect(error).toBeUndefined();
    expect(val).toEqual([false, true, false, true, false]);


  }));

  it('close completes the stream', fakeAsync(() => {


    let running;
    let cRunning;
    let finished;
    let cFinished;
    let errors;
    let cErrors;
    let err;

    service.data$.subscribe( v => running = v, e => err = e, () => cRunning = true);
    service.isBusy$.subscribe( v => finished = v, e => err = e, () => cFinished = true);
    service.error$.subscribe( v => errors = v, e => err = e, () => cErrors = true);

    service.close();
    // tick();

    expect(cRunning).toBe(true);
    expect(cFinished).toBe(true);
    expect(cErrors).toBe(true);
    expect(errors).toBeUndefined();
    expect(err).toBeUndefined();

  }));

});
