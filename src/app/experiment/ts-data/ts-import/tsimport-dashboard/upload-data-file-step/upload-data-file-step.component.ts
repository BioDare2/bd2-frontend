import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ImportFormat, ImportFormatOptions} from '../../import-dom';

@Component({
  selector: 'bd2-upload-data-file-step',
  templateUrl: './upload-data-file-step.component.html',
  styles: []
})
export class UploadDataFileStepComponent implements OnInit {

  importFormat: ImportFormat;
  importFormatOptions: ImportFormat[];
  blocked = false;
  formatWarning: string;
  lastFiles: File[];

  @Output()
  uploadFiles = new EventEmitter<{files: File[], importFormat: ImportFormat}>();

  constructor() {

    this.importFormatOptions = ImportFormatOptions;
    this.importFormat = ImportFormat.EXCEL_TABLE;
  }

  ngOnInit(): void {
  }

  upload(filesA: File[]) {
    // console.log('Upload', filesA);
    this.uploadFiles.next({files: filesA, importFormat: this.importFormat});
  }

  formatChanged(event: any) {
    // console.log("FChange " + this.importFormat, event);
    if (this.lastFiles) {
      this.checkFormat(this.lastFiles);
    }
  }

  checkFormat(files: File[]) {

    this.lastFiles = files;
    this.formatWarning = undefined;
    files.forEach(file => {
      if (this.importFormat === ImportFormat.TOPCOUNT) {
        const err = this.isTopCount(file);
        if (err) {
          this.formatWarning = 'The selected file does not seem to be a topcount file/archive but rather: ' + err
            + '. If you sure it is a valid topcount file/archive you can continue upload.';
        }
      } else if (this.importFormat === ImportFormat.EXCEL_TABLE) {
        const err = this.isExcel(file);
        if (err) {
          this.formatWarning = 'The selected file does not seem to be an excel file but rather: ' + err
            + '. If you sure it is a valid excel file you can continue upload.';
        }
      } else if (this.importFormat === ImportFormat.TAB_SEP) {
        const err = this.isTab(file);
        if (err) {
          this.formatWarning = 'The selected file does not seem to be a tab-separated file but rather: ' + err
            + '. If you sure it is a valid tsv file you can continue upload.';
        }
      } else if (this.importFormat === ImportFormat.COMA_SEP) {
        const err = this.isComa(file);
        if (err) {
          this.formatWarning = 'The selected file does not seem to be a coma-separated file but rather: ' + err
            + '. If you sure it is a valid csv file you can continue upload.';
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

  isTab(file: File): string {
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
    if (file.name.endsWith('.txt')) {
      return 'Text';
    }
    if (file.name.endsWith('.tsv')) {
      return null;
    }

    return 'Unrecognized';
  }

  isComa(file: File): string {
    const name = file.name;
    let type = file.type as string;
    if (!name) {
      return 'Unknown';
    }
    if (!type) {
      type = 'Unknown';
    }

    if (file.name.endsWith('.tsv')) {
      return 'tab separated';
    }
    if (file.name.endsWith('.xls')) {
      return 'Excel';
    }
    if (file.name.endsWith('.xlsx')) {
      return 'Excel';
    }
    if (file.name.endsWith('.txt')) {
      return 'Text';
    }
    if (file.name.endsWith('.csv')) {
      return null;
    }

    return 'Unrecognized';
  }
}
