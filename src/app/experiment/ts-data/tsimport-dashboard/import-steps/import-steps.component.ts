import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {MatVerticalStepper} from '@angular/material';
import {DataTableDependentStep} from '../data-table-dependent-step';
import {DataTableImportParameters, ImportDetails, ImportFormat} from '../../import-dom';
import {TimeColumnType} from '../../ts-import/sheet-dom';
import {TSFileService} from '../ts-file.service';
import {FeedbackService} from '../../../../feedback/feedback.service';
import {DataTableService} from '../data-table.service';

@Component({
  selector: 'bd2-import-steps',
  templateUrl: './import-steps.component.html',
  styles: [],
  providers: [ DataTableService]
})
export class ImportStepsComponent implements OnInit {

  @Output()
  import = new EventEmitter<ImportDetails>();

  @Output()
  oldImport  = new EventEmitter<ImportDetails>();

  @Input()
  blocked = false;

  @ViewChild('stepper', { static: false })
  stepper: MatVerticalStepper;

  @ViewChild('importLabelsStep', { static: false })
  importLabelsStep: DataTableDependentStep;

  importDetails: ImportDetails;


  constructor(private fileService: TSFileService,
              private feedback: FeedbackService ) {

    this.importDetails = new DataTableImportParameters(); // ImportDetails();
    this.importDetails.inRows = true;
    this.importDetails.timeType = TimeColumnType.TIME_IN_HOURS;
    // this.importDetails.firstTimeCell = new CellSelection(1, 1, 'B', 1, 1, '2', undefined);
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
        if (upload.importFormat == ImportFormat.EXCEL_TABLE || upload.importFormat == ImportFormat.TOPCOUNT) {
          this.oldImport.next(this.importDetails);
        }
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
    if (this.importDetails.importLabels) {
      if (this.importLabelsStep) {
        this.importLabelsStep.loadData();
      } else {
        console.error('Missing importLabelStep');
      }
    } else {
      this.feedback.error('Manual labelling not implemented');
    }
  }

  importData() {
    if (this.importDetails.isComplete()) {
      this.import.next(this.importDetails);
    }
  }

}
