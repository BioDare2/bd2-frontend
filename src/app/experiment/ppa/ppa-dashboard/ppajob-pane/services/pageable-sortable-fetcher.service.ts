import {BehaviorSubject, combineLatest, merge, Observable, of, Subject} from 'rxjs';
import {PageEvent, Sort} from '@angular/material';
import {catchError, debounceTime, distinctUntilChanged, filter, flatMap, map, take, tap} from 'rxjs/operators';

export abstract class PageableSortableFetcherService<I, P, A, D> {

  readonly data$: Observable<D>;
  readonly error$ = new Subject<any>();
  readonly isFetching$ = new BehaviorSubject<boolean>(false);
  readonly isProcessing$ = new BehaviorSubject<boolean>(false);
  readonly isBusy$: Observable<boolean>;
  currentPage: PageEvent;
  currentSort: Sort;
  currentAsset: A;
  currentData: D;
  currentInput: I;
  currentParams: P;
  dataLength = 0;

  protected readonly page$ = new BehaviorSubject<PageEvent>(undefined);
  protected readonly sort$ = new BehaviorSubject<Sort>(undefined);
  protected readonly on$ = new BehaviorSubject<boolean>(false);
  protected readonly refresh$ = new Subject<boolean>();

  protected readonly input$ = new BehaviorSubject<I>(undefined);
  protected readonly params$ = new BehaviorSubject<P>(undefined);
  protected readonly asset$ = new BehaviorSubject<A>(undefined);

  protected constructor(protected removeDebounce = false) {

    this.initAssetsStream();
    this.isBusy$ = this.initBusyStream();

    this.data$ = this.initDataStream();
  }

  public input(v: I) {
    if (v) { this.input$.next(v); }
  }

  public params(v: P) {
    this.params$.next(v);
  }

  public on(state = true) {
    this.on$.next(state);
  }

  public refresh() {
    this.refresh$.next(true);
  }

  public page(page: PageEvent) {
    this.page$.next(page);
  }

  public sort(sort: Sort) {
    this.sort$.next(sort);
  }

  public close() {
    this.asset$.complete();
    this.error$.complete();
    this.isFetching$.complete();
    this.isProcessing$.complete();

    this.input$.complete();
    this.params$.complete();
    this.on$.complete();
    this.refresh$.complete();
    this.page$.complete();
    this.sort$.complete();
  }

  protected abstract sameInput(def1: I, def2: I): boolean;

  protected abstract fetchAsset(input: I): Observable<A>;

  protected abstract processSortedPagedData(asset: A, sort: Sort, page: PageEvent, params: P): D;

  protected abstract assetToDataLength(asset: A, params?: P): number;


  /**
   * @ToBeOverwritten
   */
  protected errorToData(err: any): Observable<D> {
    return of(undefined);
  }

  protected initBusyStream(): Observable<boolean> {

    if (this.removeDebounce) {
      return combineLatest([this.isFetching$, this.isProcessing$]).pipe(
        map(([fetching, processing]) => fetching || processing),
      );
    } else {
      return combineLatest([this.isFetching$, this.isProcessing$]).pipe(
        debounceTime(50),
        map(([fetching, processing]) => fetching || processing)
      );
    }
  }

  protected initDataStream() {

    const dataMutations = this.dataMutators();

    return combineLatest(dataMutations).pipe(
      tap( v => this.isProcessing$.next(true)),
      map( ([asset, sort, page, params]) => {
        // maybe this should be in set asset instead, but in that place the current params are not known
        // do params influence the data length?
        this.dataLength = this.assetToDataLength(asset, params);
        const data = this.processSortedPagedData(asset, sort, page, params);
        this.currentSort = sort;
        this.currentPage = page;
        this.currentParams = params;
        this.currentData = data;
        return data;
      }),
      catchError( err => {
        this.error$.next(err);
        return this.errorToData(err);
      }),
      // delay(2000),
      tap( v => this.isProcessing$.next(false)),
    );

  }


  protected dataMutators(): [Observable<A>, Observable<Sort>, Observable<PageEvent>, Observable<P>] {
    return [
      this.asset$.pipe(filter(v => !!v)),
      this.sort$,
      this.page$.pipe(filter(v => !!v)),
      this.params$
    ];
  }

  protected initAssetsStream() {

    this.initAssetsInput().subscribe(
      input => this.loadAsset(input),
      error => this.error$.next(error)
    );
  }

  protected loadAsset(input: I) {

    this.isFetching$.next(true);
    this.fetchAsset(input)
      // .pipe(delay(2000))
      .subscribe(
      asset => {
        this.isFetching$.next(false);
        this.setAsset(asset, input);
      },
      error => {
        this.isFetching$.next(false);
        this.error$.next(error);
      }
    );
  }



  protected setAsset(asset: A, input: I) {
    this.currentInput = input;
    this.currentAsset = asset;
    this.asset$.next(asset);
  }



  protected initAssetsInput(): Observable<I> {

    const onInput$ = combineLatest( [this.input$, this.on$]).pipe(
      filter( ([val, isOn]) => val && isOn),
      map( ([val, isOn]) => val)
    );

    const distinctInput$ = onInput$.pipe(
      distinctUntilChanged( (def1: I, def2: I) => this.sameInput(def1, def2)),
    );

    const refreshedInput$ = this.refresh$.pipe(
      flatMap( v => distinctInput$.pipe(take(1))),
    );

    const merged = merge(distinctInput$, refreshedInput$);

    return merged;
  }




}
