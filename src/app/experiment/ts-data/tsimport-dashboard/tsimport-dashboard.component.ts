import {Component, OnInit} from '@angular/core';
import {FileImportRequest, ImportDetails} from '../import-dom';
import {ExperimentBaseComponent} from '../../experiment-base.component';
import {ExperimentComponentsDependencies} from '../../experiment-components.dependencies';
import {BioDareRestService} from '../../../backend/biodare-rest.service';


@Component({
  selector: 'bd2-tsimport-dashboard',
  templateUrl: './tsimport-dashboard.component.html',
  styles: [],
})
export class TSImportDashboardComponent extends ExperimentBaseComponent implements OnInit {

  importing = false;

  constructor(private BD2REST: BioDareRestService, serviceDependencies: ExperimentComponentsDependencies) {
    super(serviceDependencies);

    this.titlePart = ' Import Data';
  }

  ngOnInit() {
    super.ngOnInit();
  }



  importData(importDetails: ImportDetails) {
    // console.log('Import data');

    if (this.importing) {
      return;
    }

    const request = new FileImportRequest();
    request.fileId = importDetails.fileId;
    request.importFormat = importDetails.importFormat;
    request.importParameters = importDetails;

    this.importing = true;
    this.BD2REST.experimentImportTS2(this.assay.id, request)
      .subscribe( res => {
          const msg = 'Imported ' + res.imported + ' timeseries';
          this.feedback.success(msg);
          this.refreshModel();
          this.importing = false;
          this.goToTSView();
        },
        err => {
          this.importing = false;
          this.feedback.error(err);
        });
  }

  goToTSView() {
    const path = this.expHomePath();
    path.push('data');
    path.push('view');
    path.push('ts');
    this.router.navigate(path);
  }

  goToOldImport(importDetails: ImportDetails) {
    const path = this.expHomePath();
    path.push('data', 'ts-import', importDetails.importFormat.name, importDetails.fileId);
    this.router.navigate(path);
  }
}
