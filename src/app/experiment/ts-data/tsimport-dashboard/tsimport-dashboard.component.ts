import {Component, OnInit, ViewChild} from '@angular/core';

import {MatVerticalStepper} from '@angular/material';
import {TSFileService} from './ts-file.service';
import {DataTableImportParameters, ImportDetails, ImportFormat} from '../import-dom';
import {FeedbackService} from '../../../feedback/feedback.service';

import {CellSelection} from './data-table-dom';
import {TimeColumnType} from '../ts-import/sheet-dom';
import {DataTableDependentStep} from './data-table-dependent-step';
import {DataTableService} from './data-table.service';



@Component({
  selector: 'bd2-tsimport-dashboard',
  templateUrl: './tsimport-dashboard.component.html',
  styles: [],
  providers: [ DataTableService]
})
export class TSImportDashboardComponent implements OnInit {


  @ViewChild('stepper', { static: false })
  stepper: MatVerticalStepper;

  importDetails: ImportDetails;
  inRows: any;

  constructor(private fileService: TSFileService,
              private feedback: FeedbackService) {

    this.importDetails = new DataTableImportParameters(); // ImportDetails();
    this.importDetails.inRows = true;
    this.importDetails.timeType = TimeColumnType.TIME_IN_HOURS;
    this.importDetails.firstTimeCell = new CellSelection(1, 1, 'B',
      1, 1, '2', undefined);
  }

  ngOnInit() {
  }

  upload(upload: {files: File[], importFormat: ImportFormat}) {
    // console.log('Upload', upload);

    if (!upload.files || upload.files.length !== 1) {
      console.error('Wrong upload files size', upload.files);
      return;
    }

    this.fileService.uploadFile(upload.files[0], upload.importFormat).subscribe(
      fileId => {
        this.importDetails.fileId = fileId;
        this.importDetails.fileName = upload.files[0].name;
        this.importDetails.importFormat = upload.importFormat;
        this.stepper.next();
      },
      err => {
        this.feedback.error(err);
      }
    );

  }

  loadData(step: DataTableDependentStep) {
    step.loadData();
    // console.log('Loading data');
  }

  startLabelling() {
    console.log('Starting labeling');
  }

  importData() {

  }
}
