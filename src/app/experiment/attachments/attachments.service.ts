import {Injectable} from '@angular/core';
import {BioDareRestService} from '../../backend/biodare-rest.service';
import {ExperimentalAssayView} from '../../dom/repo/exp/experimental-assay-view';
import {FileAsset} from '../../file-asset/dom/file-asset';

@Injectable({
  providedIn: 'root'
})
export class AttachmentsService {

  constructor(private BD2REST: BioDareRestService) {
  }

  upload(exp: ExperimentalAssayView, files: File[]): Promise<any> {

    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append('file', files[i], files[i].name);
    }

    return this.BD2REST.expFileUpload(exp.id, formData)
      .then(jsonObj => jsonObj.data);

  }

  getFiles(assay: ExperimentalAssayView): Promise<FileAsset[]> {

    return this.BD2REST.files(assay.id)
      .then(jsonObj => jsonObj.data)
      .then(objs => this.json2AssetsList(objs))
      // return Promise.resolve(this.fakeFileAssets())
      .then(files => this.fillURLs(files, assay))
      ;

  }

  fillURLs(files: FileAsset[], exp: ExperimentalAssayView): FileAsset[] {
    return files.map(file => this.fillURL(file, exp));
  }

  fillURL(file: FileAsset, exp: ExperimentalAssayView): FileAsset {

    const url = this.BD2REST.fileURL(exp.id, file.id);
    file.url = url;
    file.versions.forEach(ver => {
      ver.url = url + '/' + ver.versionId;
    });
    return file;
  }

  json2AssetsList(objs: any[]): FileAsset[] {
    return objs.map(obj => FileAsset.deserialize(obj));
  }


}
