import {Observable, of} from 'rxjs';
import {PageEvent} from '@angular/material/paginator';
import {Sort} from '@angular/material/sort';
import {pageObjectData, sortObjectData} from '../shared/collections-util';
import {PageableSortableFetcherService} from './pageable-sortable-fetcher.service';

export abstract class PageableSortableArraysFetcherService<I, P, A, D> extends PageableSortableFetcherService<I, P, A, D[]> {


  protected constructor(protected removeDebounce = false) {
    super(removeDebounce);
  }

  /**
   * @ToBeOverwritten
   */
  protected abstract assetToData(asset: A, params?: P): D[];

  /**
   * @ToBeOverwritten
   */
  protected sortingKey(sort: Sort, params?: P): (s: D) => any {

    return (s: D) => s;
  }

  /**
   * @ToBeOverwritten
   */
  protected processData(data: D[], params: P): D[] {
    return data;
  }


  protected errorToData(err: any): Observable<D[]> {
    return of([]);
  }

  protected processSortedPagedData(asset: A, sort: Sort, page: PageEvent, params: P): D[] {

    let data: D[] = this.assetToData(asset, params);
    data = this.sortData(data, sort, params);
    data = this.pageData(data, page, params);
    data = this.processData(data, params);
    return data;
  }

  protected sortData(data: D[], sort: Sort, params?: P): D[] {

    if (!sort || !sort.active || sort.direction === '') {
      return data;
    }

    const sortedEnt = sortObjectData(data, sort.direction, this.sortingKey(sort, params));

    return sortedEnt;

  }

  protected pageData(data: D[], page: PageEvent, params?: P): D[] {
    if (!page) { return data; }

    const pagedEnt = pageObjectData(data, page);
    return pagedEnt;
  }

  protected assetToDataLength(asset: A, params?: P): number {
    return this.assetToData(asset).length;
  }

}
