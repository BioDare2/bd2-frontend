import {TSFileService} from './ts-file.service';
import {DataTableService} from './data-table.service';
import {fakeAsync, tick} from '@angular/core/testing';
import {DataTableSlice, Slice} from './data-table-dom';
import {of, throwError} from 'rxjs';
import {ImportFormat} from '../import-dom';


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
