import {RunnableFetcherService} from './runnable-fetcher.service';
import {Observable, of} from 'rxjs';
import {IntervalsKeeper} from './intervals-keeper';
import {arraysMatch} from '../shared/collections-util';
import {fakeAsync, tick} from '@angular/core/testing';


class TestableRunnableFetcherService extends RunnableFetcherService<number[], number, string[]> {

  constructor(removeDebounce = true) {
    super(removeDebounce);
  }

  protected initIntervalsKeeper(): IntervalsKeeper<number> {
    return new IntervalsKeeper<number>(100, 5 * 100, 10 * 100, 2);
  }

  protected assetToId(a: string[]): number {
    return (+a[0] - 1);
  }

  protected assetToInput(asset: string[]): number[] {
    const val = asset.map( v => (+v - 1));
    return val;
  }

  protected fetchAsset(input: number[]): Observable<string[]> {
    const val = input.map( v => '' + (v + 1));
    return of(val);
  }

  hasFailed(asset: string[]): boolean {
    const id = this.assetToId(asset);
    return id <= 0;
  }



  isFinished(asset: string[]): boolean {
    const id = this.assetToId(asset);
    return id > 0 && ((id % 2) === 1);
  }

  isRunning(asset: string[]): boolean {
    const id = this.assetToId(asset);
    return id > 0 && ((id % 2) === 0);
  }

  protected sameInput(def1: any, def2: any): boolean {
    if (Array.isArray(def1)) {
      return arraysMatch(def1, def2);
    }
    return def1 === def2;
  }

}

describe('RunnableFetcherService', () => {

  let service: RunnableFetcherService<number[], number, string[]>;

  beforeEach(() => {

    service = new TestableRunnableFetcherService();
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

    service.input([1] as any);
    tick();
    expect(val).toBeUndefined();
    expect(error).toBeUndefined();

    service.on(true);
    tick();
    expect(val).toEqual([1]);
    expect(error).toBeUndefined();

    service.input([121, 340]);
    tick();
    expect(val).toEqual([121, 340]);
    expect(error).toBeUndefined();

    val = undefined;
    service.on(false);
    service.input([1201, 3400]);
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


    service.input([11, 34]);
    tick();
    expect(val).toEqual([11, 34]);
    expect(error).toBeUndefined();

    val = undefined;
    service.input([11, 34]);
    tick();
    expect(val).toBeUndefined();
    expect(error).toBeUndefined();

    service.input([11, 340]);
    tick();
    expect(val).toEqual([11, 340]);
    expect(error).toBeUndefined();

    service.input([11, 341]);
    tick();
    expect(val).toEqual([11, 341]);
    expect(error).toBeUndefined();

    val = undefined;
    service.input([11, 341]);
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

    service.input([11, 34]);
    tick();

    val = undefined;

    service.refresh();
    tick();
    expect(val).toEqual([11, 34]);
    expect(error).toBeUndefined();

    val = undefined;
    service.refresh();
    tick();
    expect(val).toEqual([11, 34]);
    expect(error).toBeUndefined();

    service.input([121, 34]);
    tick();
    val = undefined;
    service.refresh();
    tick();
    expect(val).toEqual([121, 34]);
    expect(error).toBeUndefined();

  }));

  it('multiple refresh when off give only one when back on', fakeAsync( () => {

    const vals = [];
    let error;

    // @ts-ignore
    service.initAssetsInput().subscribe( ids => vals.push(ids), err => error = err );
    service.on(true);
    service.input([11, 34]);
    tick();

    expect(vals).toEqual([[11, 34]]);
    expect(error).toBeUndefined();

    service.refresh();
    tick();
    expect(vals).toEqual([[11, 34], [11, 34]]);
    expect(error).toBeUndefined();


    service.on(false);
    service.refresh();
    service.refresh();
    service.refresh();
    service.on(true);
    expect(vals).toEqual([[11, 34], [11, 34], [11, 34]]);

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
    service.loadAsset([1, 3]);
    tick();

    expect(error).toBeUndefined();
    expect(val).toEqual(['2', '4']);


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


});
