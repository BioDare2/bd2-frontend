import {Injectable} from '@angular/core';
import {BioDareRestService} from '../../backend/biodare-rest.service';
import {ExperimentalAssayView} from '../../dom/repo/exp/experimental-assay-view';
import {FileAsset} from '../../file-asset/dom/file-asset';

/**
 * Service for handling file attachments to experiments
 */
@Injectable({
  providedIn: 'root'
})
export class AttachmentsService {

  constructor(private BD2REST: BioDareRestService) {
  }

  /* Upload a list of files and attach them to the experiment */
  upload(exp: ExperimentalAssayView, files: File[]): Promise<any> {

    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append('file', files[i], files[i].name);
    }

    return this.BD2REST.expFileUpload(exp.id, formData)
      .then(jsonObj => jsonObj.data);
  }

  /* Get the list of files attached to an experiment */
  getFiles(assay: ExperimentalAssayView): Promise<FileAsset[]> {

    return this.BD2REST.files(assay.id)
      .then(jsonObj => jsonObj.data)
      .then(objs => this.json2AssetsList(objs))
      .then(files => this.fillURLs(files, assay))
      ;
  }

  /* Fill URL attributes for a list of files in an experiment */
  fillURLs(files: FileAsset[], exp: ExperimentalAssayView): FileAsset[] {
    return files.map(file => this.fillURL(file, exp));
  }

  /* Fill the URL attribute based on experiment ID, file ID and version number */
  fillURL(file: FileAsset, exp: ExperimentalAssayView): FileAsset {

    const url = this.BD2REST.fileURL(exp.id, file.id);
    file.url = url;
    file.versions.forEach(ver => {
      ver.url = url + '/' + ver.versionId;
    });
    return file;
  }

  /* Convert a list of JSON objects to a list of FileAsset instances */
  json2AssetsList(objs: any[]): FileAsset[] {
    return objs.map(obj => FileAsset.deserialize(obj));
  }
}
