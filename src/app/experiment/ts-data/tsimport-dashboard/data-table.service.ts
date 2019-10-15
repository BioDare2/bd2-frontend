import {Injectable} from '@angular/core';
import {BehaviorSubject, combineLatest, Observable, Subject} from 'rxjs';
import {DataTableSlice, Slice} from './data-table-dom';
import {filter, switchMap, tap} from 'rxjs/operators';

import {TSFileService} from './ts-file.service';


@Injectable()
export class DataTableService {


  readonly dataSlice$: Observable<DataTableSlice>;

  private readonly tableSlice$ = new BehaviorSubject<DataTableSlice>(undefined);
  private readonly slice$ = new BehaviorSubject<Slice>(undefined);
  private readonly fileIdFormat$ = new BehaviorSubject<string[]>(undefined);
  readonly error$ = new Subject<any>();


  constructor(private tsFileService: TSFileService) {

    this.dataSlice$ = this.tableSlice$.asObservable().pipe(
      filter( j => j != null && j !== undefined)
    );

    this.initDataStream();
  }

  public close() {
    this.slice$.complete();
    this.fileIdFormat$.complete();
    this.tableSlice$.complete();
    this.error$.complete();
  }

  public slice(slice: Slice) {
    if (slice) {
      this.slice$.next(slice);
    }
  }

  public fileIdFormat(fileIdFormat: string[]) {
    if (fileIdFormat && fileIdFormat[0] && fileIdFormat[1]) {
      this.fileIdFormat$.next(fileIdFormat);
    }
  }

  initDataStream() {

    const params = combineLatest([this.fileIdFormat$, this.slice$]).pipe(
      tap( r => console.log('Params', r)),
      filter( ([fileId, slice]) => fileId && !!slice)
    );

    params.pipe(
      tap( r => console.log('BF switch', r)),
      switchMap( ([fileIdFormat, slice]) => this.tsFileService.getTableSlice(fileIdFormat[0], fileIdFormat[1], slice)),
      tap( r => console.log('After switch', r))
    ).subscribe(
      data => this.tableSlice$.next(data),
      err => this.error$.next(err)
    );
  }

}
