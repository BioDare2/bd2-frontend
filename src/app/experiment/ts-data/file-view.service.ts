import {Injectable} from '@angular/core';
import {BioDareRestService} from '../../backend/biodare-rest.service';
import {ImportFormat} from './ts-import/import-dom';


@Injectable({
  providedIn: 'root'
})
export class FileViewService {

  constructor(private BD2REST: BioDareRestService) {
  }

  getSimpleTableView(fileId: string): Promise<string[][]> {

    return this.BD2REST.fileViewSimpleTable(fileId)
      .then(jsonObj => jsonObj.data);
  }

  verifyFormat(format: ImportFormat, fileId: string): Promise<boolean> {

    return this.BD2REST.fileViewVerifyFormat(format, fileId).toPromise();
  }




}

