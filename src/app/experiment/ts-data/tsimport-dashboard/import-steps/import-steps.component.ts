import {Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import {MatVerticalStepper} from '@angular/material';
import {DataTableDependentStep} from '../data-table-dependent-step';
import {DataTableImportParameters, ImportDetails, ImportFormat} from '../../import-dom';
import {TimeColumnType} from '../../ts-import/sheet-dom';
import {TSFileService} from '../ts-file.service';
import {FeedbackService} from '../../../../feedback/feedback.service';
import {DataTableService} from '../data-table.service';
import {StepperSelectionEvent} from "@angular/cdk/stepper";

@Component({
  selector: 'bd2-import-steps',
  templateUrl: './import-steps.component.html',
  styles: [],
  providers: [ DataTableService]
})
export class ImportStepsComponent implements OnInit, OnDestroy {

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


  @ViewChild('assignLabelsStep', { static: false })
  assignLabelsStep: DataTableDependentStep;

  importDetails: ImportDetails;


  constructor(private fileService: TSFileService,
              private feedback: FeedbackService,
              private dataService: DataTableService) {

    this.importDetails = new DataTableImportParameters(); // ImportDetails();
    this.importDetails.timeType = TimeColumnType.TIME_IN_HOURS;
    this.importDetails.containsBackgrounds = true;
  }

  ngOnInit() {
  }

  ngOnDestroy(): void {
    if (this.dataService) {
      // we injected it so we should close it
      this.dataService.close();
    }
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
        if (upload.importFormat == ImportFormat.EXCEL_TABLE) {
          this.importDetails.inRows = false;
        } else {
          this.importDetails.inRows = true;
        }
        this.stepper.next();
        if (upload.importFormat == ImportFormat.TOPCOUNT) {
          this.oldImport.next(this.importDetails);
        }
        /*if (upload.importFormat == ImportFormat.EXCEL_TABLE) {
          this.oldImport.next(this.importDetails);
        }*/
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
      // this.feedback.error('Manual labelling not implemented');
      if (this.assignLabelsStep) {
        this.assignLabelsStep.loadData();
      } else {
        console.error('Missing assignLabelsStep');
      }
    }
  }

  importData() {
    if (this.importDetails.isComplete()) {
      this.import.next(this.importDetails);
    }
  }

  stepChanged(event: StepperSelectionEvent) {
    console.log('step chagne', event);
  }

}
