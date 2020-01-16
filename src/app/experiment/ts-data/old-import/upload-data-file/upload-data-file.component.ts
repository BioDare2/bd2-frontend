import {Component} from '@angular/core';
import {ExperimentBaseComponent} from '../../../experiment-base.component';
import {ImportFormat, ImportFormatOptions} from '../../ts-import/import-dom';
import {ExperimentComponentsDependencies} from '../../../experiment-components.dependencies';
import {UploadService} from '../../../../file-asset/upload-service';
import {FileViewService} from '../../file-view.service';

@Component({
  templateUrl: './upload-data-file.component.html',
  styles: []
})
export class UploadDataFileComponent extends ExperimentBaseComponent {

  importFormat: string;
  importFormatOptions: ImportFormat[];
  blocked = false;
  formatWarning: string;
  lastFiles: File[];

  constructor(private uploadService: UploadService,
              private fileViewService: FileViewService,
              serviceDependencies: ExperimentComponentsDependencies) {
    super(serviceDependencies);

    this.titlePart = ' Upload Data';
    this.importFormatOptions = ImportFormatOptions;
    this.importFormat = ImportFormat.EXCEL_TABLE.name;
  }

  formatChanged(event: any) {
    // console.log("FChange " + this.importFormat, event);
    if (this.lastFiles) {
      this.checkFormat(this.lastFiles);
    }
  }

  upload(files: File[]) {
    // console.log("save");
    if (!files || files.length !== 1) {
      return;
    }

    const format = ImportFormat.get(this.importFormat);
    if (this.assay && format) {

      this.blocked = true;
      this.uploadService.uploadFile(files[0])
        .then(id => this.verifyFormatRemotely(format, id))
        .then(id => this.goToImport(this.importFormat, id))
        .catch(reason => {
          this.blocked = false;
          this.feedback.error(reason);
        });

    }
  }

  verifyFormatRemotely(format: ImportFormat, fileId: string): Promise<string> {

    return this.fileViewService.verifyFormat(format, fileId)
      .then((resp) => fileId);
  }

  goToImport(format: string, fileId: string) {
    const path = this.expHomePath();
    path.push('data', 'ts-import', format, fileId);
    this.router.navigate(path);
  }

  checkFormat(files: File[]) {

    this.lastFiles = files;
    this.formatWarning = undefined;
    files.forEach(file => {
      if (this.importFormat === ImportFormat.TOPCOUNT.name) {
        const err = this.isTopCount(file);
        if (err) {
          this.formatWarning = 'The selected file does not seem to be a topcount file/archive but rather: ' + err
            + '. If you sure it is a valid topcount file/archive you can continue upload.';
        }
      } else if (this.importFormat === ImportFormat.EXCEL_TABLE.name) {
        const err = this.isExcel(file);
        if (err) {
          this.formatWarning = 'The selected file does not seem to be an excel file but rather: ' + err
            + '. If you sure it is a valid excel file you can continue upload.';
        }
      }
    });
  }

  isTopCount(file: File): string {
    const name = file.name;
    let type = file.type as string;
    if (!name) {
      return 'Unknown';
    }
    if (!type) {
      type = 'Unknown';
    }

    if (file.name.endsWith('.csv')) {
      return 'CSV';
    }
    if (file.name.endsWith('.xls')) {
      return 'Excel';
    }
    if (file.name.endsWith('.xlsx')) {
      return 'Excel';
    }
    if (file.name.endsWith('.tsv')) {
      return 'tab separated';
    }

    return null;
  }

  isExcel(file: File): string {
    const name = file.name;
    const type = file.type as string;
    if (!type || !name) {
      return 'Unknown';
    }

    // console.log("T: "+type);
    if (file.name.endsWith('.csv')) {
      return 'CSV';
    }
    if (file.name.endsWith('.txt')) {
      return 'text';
    }
    if (file.name.endsWith('.tsv')) {
      return 'tab separated';
    }

    if (type.indexOf('excel') >= 0) {
      return null;
    }
    if (type.indexOf('sheet') >= 0) {
      return null;
    }
    return type;
  }


}
