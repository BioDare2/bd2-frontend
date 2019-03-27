import {Injectable} from '@angular/core';
import {BioDareRestService} from '../backend/biodare-rest.service';
import {FileAsset} from './dom/file-asset';

@Injectable({
  providedIn: 'root'
})
export class FileAssetService {

  constructor(private BD2REST: BioDareRestService) {
  }


  updateFile(asset: FileAsset, file: File, description: string): Promise<FileAsset> {

    const formData = new FormData();
    if (file) {
      formData.append('file', file, file.name);
    }
    formData.append('description', description);

    return this.BD2REST.fileUpdate(asset.url, formData)
      .then(jsonObj => FileAsset.deserialize(jsonObj));
  }
}
