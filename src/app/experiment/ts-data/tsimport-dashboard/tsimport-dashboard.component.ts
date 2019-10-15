import {Component, OnInit, ViewChild} from '@angular/core';
import {ConfirmDialogComponent} from '../../../shared/confirm-dialog.component';
import {MatVerticalStepper} from '@angular/material';
import {TSFileService} from './ts-file.service';
import {ImportDetails, ImportFormat} from '../import-dom';
import {FeedbackService} from '../../../feedback/feedback.service';
import {DefineTimeStepComponent} from './define-time-step/define-time-step.component';



@Component({
  selector: 'bd2-tsimport-dashboard',
  templateUrl: './tsimport-dashboard.component.html',
  styles: []
})
export class TSImportDashboardComponent implements OnInit {


  @ViewChild('stepper', { static: false })
  stepper: MatVerticalStepper;

  importDetails: ImportDetails;
  inRows: any;

  constructor(private fileService: TSFileService,
              private feedback: FeedbackService) {

    this.importDetails = new ImportDetails();
    this.importDetails.inRows = true;
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

  loadData(step: DefineTimeStepComponent) {
    step.loadData();
    // console.log('Loading data');
  }

  startLabelling() {
    console.log('Starting labeling');
  }

  importData() {

  }
}
