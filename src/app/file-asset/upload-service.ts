import {Injectable} from '@angular/core';
import {BioDareRestService} from '../backend/biodare-rest.service';


@Injectable({
  providedIn: 'root'
})
export class UploadService {


  constructor(private BD2REST: BioDareRestService) {
  }

  uploadFile(file: File): Promise<string> {

    const formData = new FormData();
    formData.append('file', file, file.name);

    return this.BD2REST.fileUpload(formData)
      .then(jsonObj => jsonObj.id);

  }

}
