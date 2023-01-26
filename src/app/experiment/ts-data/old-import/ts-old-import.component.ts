import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {ExperimentBaseComponent} from '../../experiment-base.component';
import {ExcelTSImportParameters, FileImportRequest, ImportFormat} from '../ts-import/import-dom';
import {FileViewService} from '../file-view.service';
import {ExperimentComponentsDependencies} from '../../experiment-components.dependencies';

@Component({
  template: `
    <h3>Timeseries import</h3>

    <!--
    <bd2-describe-ts-table *ngIf="format?.name === 'EXCEL_TABLE'" [dataTable]="dataTable"
                           [blocked]="blocked" [confirmDataLoss]="assay?.features.hasTSData"
                           (onAccepted)="import($event)"></bd2-describe-ts-table>-->
    <bd2-describe-topcount-table *ngIf="format?.name === 'TOPCOUNT'" [dataTable]="dataTable"
                                 [blocked]="blocked" [confirmDataLoss]="assay?.features.hasTSData"
                                 (onAccepted)="import($event)"></bd2-describe-topcount-table>
  `,
  providers: []
})
export class TSOldImportComponent extends ExperimentBaseComponent implements OnInit {

  format: ImportFormat;
  fileId: string;

  blocked = false;
  dataTable: string[][];

  constructor(private fileViewService: FileViewService,
              private route: ActivatedRoute,
              serviceDependencies: ExperimentComponentsDependencies) {
    super(serviceDependencies);

    this.titlePart = ' Import Data';

  }

  ngOnInit() {
    super.ngOnInit();

    this.route.params.forEach((params: Params) => {

      // console.log("Params: "+JSON.stringify(params));
      const fileId = params['fileId']; // (+) converts string 'id' to a number
      const format = params['format'];
      if (fileId && format) {
        this.loadData(format, fileId);
      } else {
        console.log(this.constructor.name + ' null parameters');
      }

    });
  }

  loadData(format: string, fileId: string) {
    // console.log("LoadData");
    this.format = ImportFormat.get(format);
    this.fileId = fileId;
    this.blocked = false;

    this.fileViewService.getSimpleTableView(fileId)
      .then((table: string[][]) => {
        this.dataTable = table;
        // console.log("Loaded data:\n"+JSON.stringify(table));
      })
      .catch(reason => {
        this.feedback.error(reason);
      });
  }

  import(params: ExcelTSImportParameters) {

    if (params && this.fileId && this.format) {

      this.blocked = true;
      const request = new FileImportRequest();
      request.fileId = this.fileId;
      request.importFormat = this.format;
      request.importParameters = params;

      this.experimentService.importTimeSeries(this.assay, request).toPromise()
        .then((res: any) => {
          const msg = 'Imported ' + res.imported + ' timeseries';
          this.feedback.success(msg);
          return res;
        })
        .then(() => this.refreshModel())
        .then(exp => this.goToTSView())
        .catch(reason => {
          this.blocked = false;
          this.feedback.error(reason);

        });

    }
  }

  goToTSView() {
    const path = this.expHomePath();
    path.push('data');
    path.push('view');
    path.push('ts');
    this.router.navigate(path);
  }


}
