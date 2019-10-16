import {TSFileService} from './ts-file.service';
import {DataTableService} from './data-table.service';
import {fakeAsync, tick} from '@angular/core/testing';
import {DataTableSlice, Slice} from './data-table-dom';
import {of, throwError} from 'rxjs';
import {ImportFormat} from '../import-dom';


/*
const data = new DataTableSlice();
data.columnsNames = ['0', 'A', 'B', 'C', 'D', 'E', 'F', 'G ', 'H' ];
data.columnsNumbers = [0, 1, 2,    3,   4,   5,   6,   7,    8];
data.rowsNames = [0, 1, 2, 3, 4, 5, 6, 7, 8].map( v => '' + v);
data.rowsNumbers = [0, 1, 2, 3, 4, 5, 6, 7, 8];

data.data = [
  [0, 'A', 'B', 'C', 'D', 'E', 'F', 'G ', 'H', ],
  [1, 'toc 1 tr tra', 12345600, 1, 'toc 1 tr tra', 12345600, 2, 'toc 3232 ', 12.00012, ],
  [2, 'toc 3232 ', 12.00012, 2, 'toc 3232 ', 12.00012, 2, 'toc 3232 ', 12.00012, ],
  [3, 'toc 2323a', '12E-07', 3, 'toc 2323a', 12E-07, 3, 'toc 2323a', 12E-07, ],
  [4, 'wt', 12345600, 4, 'wt', 12345600, 4, 'wt', 12345600],
  [5, 'wt', 12345600, 5, 'wt', 12345600, 5, 'wt', 12345600, ],
  [6, 'sf f sffsdffdf a', 12345600, 6, 'sf f sffsdffdf a', 12345600, 6, 'sf f sffsdffdf a', 12345600, ],
  [7, 'sdfdsffd sdfdsfdfdsdfdfds', 12345600, 7, 'sdfdsffd sdfdsfdfdsdfdfds', 12345600, 7, 'sdfdsffd sdfdsfdfdsdfdfds', 12345600, ],
  [8, 'sdf sdfdsfdfdfd', 12345600, 8, 'sdf sdfdsfdfdfd', 12345600, 8, 'sdf sdfdsfdfdfd', 12345600, ],
];

this.dataSlice = data;
*/

describe('DataTableService', () => {

  let tsFileService; // : TSFileService;
  let service: DataTableService;
  let data: DataTableSlice;

  beforeEach(() => {

    tsFileService = jasmine.createSpyObj('TSFileService', [
      'getTableSlice'
    ]);

    data = new DataTableSlice();
    data.columnsNames = ['A', 'B', 'C'];
    data.columnsNumbers = [0, 1, 2];
    data.rowsNames = ['1', '2', '3', '4'];
    data.rowsNumbers = [0, 1, 2, 3];
    data.totalColumns = 5;
    data.totalRows = 6;
    data.data.push(['1', 'B', 'C']);
    data.data.push(['2', 'B2', 'C2']);
    data.data.push(['3', 'B3', 'C3']);
    data.data.push(['4', 'B4', 'C4']);

    service = new DataTableService(tsFileService);
  });

  it('creates', () => {
    expect(service).toBeTruthy();
  });

  it('does not emits without params', fakeAsync( () => {

    // tsFileService.getTableSlice.and.returnValue(of(data));
    tsFileService.getTableSlice.and.returnValue(throwError('should not be called'));

    let error;
    let val;
    let err;

    service.dataSlice$.subscribe( d => val = d, e => err = e);
    service.error$.subscribe( e => error = e);

    tick();
    expect(val).toBeUndefined();
    expect(err).toBeUndefined();
    expect(error).toBeUndefined();
  }));

  it('retrieves from server on full params', fakeAsync( () => {

    // tsFileService.getTableSlice.and.returnValue(of(data));
    tsFileService.getTableSlice.and.returnValue(throwError('should not be called'));

    let error;
    let val;
    let err;

    service.dataSlice$.subscribe( d => val = d, e => err = e);
    service.error$.subscribe( e => error = e);

    service.fileIdFormat(['123', ImportFormat.COMA_SEP.name]);

    tick();
    expect(val).toBeUndefined();
    expect(err).toBeUndefined();
    expect(error).toBeUndefined();

    tsFileService.getTableSlice.and.returnValue(of(data));

    const slice = new Slice();
    slice.rowPage.pageSize = 25;
    slice.colPage.pageSize = 20;

    service.slice(slice);

    tick();
    expect(val).toBe(data);
    expect(err).toBeUndefined();
    expect(error).toBeUndefined();

  }));

  it('emits errors in stream', fakeAsync( () => {

    tsFileService.getTableSlice.and.returnValue(throwError('should not be called'));

    let error;
    let val;
    let err;

    service.dataSlice$.subscribe( d => val = d, e => err = e);
    service.error$.subscribe( e => error = e);

    service.fileIdFormat(['123', ImportFormat.COMA_SEP.name]);
    const slice = new Slice();
    slice.rowPage.pageSize = 25;
    slice.colPage.pageSize = 20;

    service.slice(slice);

    tick();
    expect(val).toBeUndefined();
    expect(err).toBeUndefined();
    expect(error).toEqual('should not be called');


  }));

});
