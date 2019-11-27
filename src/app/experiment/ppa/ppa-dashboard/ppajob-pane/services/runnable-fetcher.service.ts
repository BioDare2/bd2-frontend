import {BehaviorSubject, combineLatest, merge, Observable, Subject, Subscription, timer} from 'rxjs';
import {debounceTime, distinctUntilChanged, filter, map, switchMap, take, tap} from 'rxjs/operators';
import {IntervalsKeeper} from './intervals-keeper';


export abstract class RunnableFetcherService<I, ID, A> {

  protected constructor(protected removeDebounce = false) {

    this.id = RunnableFetcherService.ids++;
    this.logMe('created');

    this.currentReloadStatus = this.initIntervalsKeeper();

    this.finished$ = this.asset$.asObservable().pipe(
      filter( j => j && this.isFinished(j))
    );

    this.running$ = this.asset$.asObservable().pipe(
      filter( j => j && this.isRunning(j))
    );

    this.failed$ = this.asset$.asObservable().pipe(
      filter( j => j && this.hasFailed(j))
    );


    this.all$ = this.asset$.asObservable().pipe(
      filter( j => j != null && j !== undefined)
    );

    this.isReloading$ = this.initReloadingStream();

    this.initAssetsStream();

    this.initReloads();

  }
  protected static ids = 0;


  public readonly id: number;
  readonly all$: Observable<A>;
  readonly failed$: Observable<A>;
  readonly finished$: Observable<A>;
  readonly running$: Observable<A>;

  readonly isReloading$: Observable<boolean>;
  readonly error$ = new Subject<any>();

  currentInput: I;
  currentAsset: A;

  protected readonly on$ = new BehaviorSubject<boolean>(false);
  protected readonly refresh$ = new Subject<boolean>();
  protected readonly input$ = new BehaviorSubject<I>(undefined);
  protected readonly asset$ = new BehaviorSubject<A>(undefined);
  protected readonly reloading$ = new BehaviorSubject<boolean>(false);

  protected DEBUG = false;
  protected reloadDebounce = 50;


  protected currentReloadStatus: IntervalsKeeper<ID>;
  protected reloadSubscription: Subscription;

  protected abstract initIntervalsKeeper(): IntervalsKeeper<ID>;

  logMe(msg: string, obj?: any) {
    if (!this.DEBUG) { return; }
    msg = this.constructor.name + ':' + this.id + ' ' + msg;
    if (obj) {
      console.log(msg, obj);
    } else {
      console.log(msg);
    }
  }

  public close() {
    this.asset$.complete();
    this.input$.complete();
    this.error$.complete();
    this.reloading$.complete();
    this.on$.complete();
    this.refresh$.complete();
    if (this.reloadSubscription) { this.reloadSubscription.unsubscribe(); }
  }

  public input(v: I) {
    if (v) { this.input$.next(v); }
  }

  public on(state = true) {
    this.on$.next(state);
  }

  public refresh() {
    // reset the reload
    this.currentReloadStatus.reset(undefined);
    if (this.reloadSubscription) { this.reloadSubscription.unsubscribe(); }
    this.refresh$.next(true);
  }

  abstract hasFailed(asset: A): boolean;

  abstract isFinished(asset: A): boolean;

  abstract isRunning(asset: A): boolean;

  protected abstract fetchAsset(input: I): Observable<A>;

  protected abstract sameInput(def1: I, def2: I): boolean;

  protected abstract assetToId(asset: A): ID;

  protected abstract assetToInput(asset: A): I;

  protected initReloadingStream(): Observable<boolean> {

    if (this.removeDebounce) {
      return this.reloading$.asObservable();
    } else {
      return this.reloading$.asObservable().pipe(
        debounceTime(this.reloadDebounce),
      );
    }
  }

  protected initAssetsStream() {

    this.initAssetsInput().subscribe(
      input => this.loadAsset(input),
      error => this.error$.next(error)
    );
  }

  protected initReloads() {
    this.running$.subscribe( job => this.reload(job));
  }


  protected loadAsset(input: I) {

    // this.isFetching$.next(true);
    this.fetchAsset(input)
    // .pipe(delay(2000))
      .subscribe(
        asset => {
          // this.isFetching$.next(false);
          this.setAsset(asset, input);
        },
        error => {
          // this.isFetching$.next(false);
          this.error$.next(error);
        }
      );
  }

  protected setAsset(asset: A, input: I) {
    this.currentInput = input;
    this.currentAsset = asset;
    this.reloading$.next(this.isRunning(asset));
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
      switchMap( v => distinctInput$.pipe(take(1))),
    );

    const merged = merge(distinctInput$, refreshedInput$)
      .pipe(
        tap( v => this.logMe('Assets input', v))
      );

    return merged;
  }


  protected reload(asset: A) {


    if (this.reloadSubscription) { this.reloadSubscription.unsubscribe(); }

    const interval = this.currentReloadStatus.nextInterval(this.assetToId(asset));


    if (!interval) {
      // cancel reloading
      this.reloading$.next(false);
      return;
    }

    const input = this.assetToInput(asset);

    this.reloadSubscription = timer( interval).subscribe(
      v => {
        if (this.sameInput(input, this.currentInput)) {
          this.reloadSubscription = undefined;
          this.loadAsset(input);
        } else {
          console.log('Disabled reload as input has changed');
        }
      });

  }



}
