import {Injectable} from '@angular/core';
import {BioDareRestService} from '../../../backend/biodare-rest.service';
import {ImportFormat} from '../import-dom';
import {UploadService} from '../../../file-asset/upload-service';
import {Observable, from, throwError} from 'rxjs';
import {flatMap, map} from 'rxjs/operators';


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


}

