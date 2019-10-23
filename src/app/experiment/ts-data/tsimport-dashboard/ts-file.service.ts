import {Injectable} from '@angular/core';
import {BioDareRestService} from '../../../backend/biodare-rest.service';
import {ImportFormat} from '../import-dom';
import {UploadService} from '../../../file-asset/upload-service';
import {Observable, from, throwError, of} from 'rxjs';
import {flatMap, map} from 'rxjs/operators';
import {CellSelection, DataTableSlice, Slice} from './data-table-dom';


@Injectable({
  providedIn: 'root'
})
export class TSFileService {

  constructor(private uploadService: UploadService,
              private BD2REST: BioDareRestService) {
  }

  /*
  getSimpleTableView(fileId: string): Promise<string[][]> {

    return this.BD2REST.fileViewSimpleTable(fileId)
      .then(jsonObj => jsonObj.data);
  }*/

  uploadFile(file: File, format: ImportFormat): Observable<string> {

    return from(this.uploadService.uploadFile(file)).pipe(
      flatMap( fileId => this.verifyFormat(format, fileId)
                                    .pipe(map( res => fileId))
              )
      );


  }

  verifyFormat(format: ImportFormat, fileId: string): Observable<boolean> {

    return this.BD2REST.fileViewVerifyFormat(format, fileId);
  }

  getTableSlice(fileId: string, format: string, slice: Slice): Observable<DataTableSlice> {

    return this.BD2REST.fileViewTableSlice(fileId, format, slice);
  }

  previewLabels(fileId: string, format: string, labelsSelection: CellSelection, inRows: boolean): Observable<string[]> {

    const slice = new Slice();
    if (inRows) {
      slice.rowPage.pageSize = 500;
      slice.rowPage.pageIndex = 0;
      slice.colPage.pageSize = 1;
      slice.colPage.pageIndex = labelsSelection.colIx;
    } else {
      slice.rowPage.pageSize = 1;
      slice.rowPage.pageIndex = labelsSelection.rowIx;
      slice.colPage.pageSize = 500;
      slice.colPage.pageIndex = 0;
    }

    return this.getTableSlice(fileId, format, slice).pipe(
      map( (data: DataTableSlice) => {
        const set = new Set<string>();
        data.data.forEach( row => row.forEach( v => set.add(''+v)) );
        return [...set];
      })
    );

    /*return of(['A', 'B', 'C', 'Label1', 'Label2', 'Label10', 'Labellog1', 'Very very long Label1', 'Background',
      'Wilid Type', 'Again' ]);

     */
  }

}

