import {Component, OnDestroy, OnInit} from '@angular/core';
import {ExperimentBaseComponent} from '../../experiment-base.component';
import {RDMSocialServiceService} from '../../../rdmsocial/rdmsocial-service.service';
import {ExperimentalAssayView} from '../../../dom/repo/exp/experimental-assay-view';
import {ExperimentComponentsDependencies} from '../../experiment-components.dependencies';
import {Subscription} from 'rxjs';
import {AnalyticsService} from '../../../analytics/analytics.service';
import {DisplayParameters} from '../../../tsdata/plots/ts-display.dom';
import {Trace} from '../../../tsdata/plots/ts-plot.dom';
import {TSFetcher} from '../../../tsdata/plots/ts-fetcher';
import {CSVExporter} from '../../../tsdata/export/csv-exporter';
import {TSDataService} from '../../../tsdata/ts-data.service';
import {debounceTime} from 'rxjs/operators';
import * as FileSaver from 'file-saver';
import { PageEvent } from '@angular/material/paginator';
import {TimeSeriesMetrics} from '../../../tsdata/ts-data-dom';

@Component({
  template: `
    <div *ngIf="assay">
    <h3>Show timeseries</h3>
    <hr>

    <bd2-tsdisplay-params-rform
      (displayParams)="displayChanged($event)"
      [disabled]="disabledSecondary"
      [totalTraces]="totalTraces"
      [currentPage]="currentPage"
    ></bd2-tsdisplay-params-rform>

    <div *ngIf="disabledSecondary" type="danger" class="alert alert-danger" role="alert"
    >Please complete <a (click)="goToExpEdit(assay.id,'MeasurementSection')">Measurement details</a> to get access to
      the secondary data
    </div>

    <hr>
    <div
      type="info" class="alert alert-info" role="alert"
      dismissible="true" dismissOnTimeout="20000"
    >
      Hint: You can click on trace label box to remove it from the plot.
    </div>

    <div class="clearfix">
    <div *ngIf="timeseries && exportURL" class="float-right">
      <label class="mr-4">
        <a download (click)="exportData()" role="button" class="btn btn-primary" aria-label="download" style="color: white;">
          <i class="material-icons bd-icon">save_alt</i><span class="cdk-visually-hidden">Download</span></a>
        the current view
      </label>
      <label>
        <a download href="{{exportURL}}" (click)="recordExport()" role="button" class="btn btn-primary">
          <i class="material-icons bd-icon">save_alt</i><span class="cdk-visually-hidden">Download</span></a>
        the detrended dataset
      </label>

    </div>
    </div>
    <hr>

    <bd2-ts-plots *ngIf="timeseries"
                  [tracesPerPlot]="tracesPerPlot"
                  [data]="timeseries"
    ></bd2-ts-plots>
    </div>
  `,
  providers: [TSFetcher]
})
export class TSViewComponent extends ExperimentBaseComponent implements OnDestroy, OnInit {

  exportURL: string;
  currentParams: DisplayParameters;

  timeseries: Trace[] = [];
  totalTraces = 0;
  currentPage: PageEvent = DisplayParameters.firstPage();
  tracesPerPlot = 5;

  blocked = false;

  disabledSecondary = false;

  metrics: TimeSeriesMetrics;


  private timeSeriesSubsripction: Subscription;
  private csvExporter = new CSVExporter();


  constructor(private fetcher: TSFetcher,
              private tsdataService: TSDataService,
              private RDMSocial: RDMSocialServiceService,
              private analytics: AnalyticsService,
              serviceDependencies: ExperimentComponentsDependencies) {

    super(serviceDependencies);

    this.titlePart = ' Data';
  }

  ngOnInit(): any {
    super.ngOnInit();

    this.timeSeriesSubsripction = this.fetcher.seriesPackStream.pipe(
      debounceTime(1000)) // debounced added to reduce screen flickering on updates
      .subscribe(
        (pack) => {
          if (!this.assay) { return; }

          const data = pack.data;
          this.currentParams = pack.params;
          this.exportURL = this.tsdataService.exportURL(this.assay, pack.params);
          // console.log("P: "+pack.params.detrending.name+"; "+this.exportURL);
          this.timeseries = data;
          this.tracesPerPlot = Math.max(5, data.length / 20);
          this.totalTraces = pack.totalTraces;
          this.currentPage = pack.currentPage;
          this.analytics.experimentDataViev(this.assay.id);

        },
        (err) => {
          console.log('Error in TS subscription: ' + err);
          this.feedback.error(err);
        },
        // () => console.log('Timeseries stream finished')
      );
  }

  ngOnDestroy(): void {

    if (this.timeSeriesSubsripction) {
      this.timeSeriesSubsripction.unsubscribe();
    }

    this.fetcher.ngOnDestroy();
    super.ngOnDestroy();
  }

  displayChanged(params: DisplayParameters) {
    // console.log("New params",params);
    this.fetcher.changeDisplayParams(params);
  }

  exportData() {

    const data = this.fetcher.current;
    if (!data) { return; }
    const csv = this.csvExporter.renderCSVTable(data.data, data.params, data.currentPage, this.assay);
    const blob = new Blob([csv], {type: 'text/csv'});
    const page = data.currentPage.pageIndex + 1;
    FileSaver.saveAs(blob, this.assay.id + '_data.' + this.currentParams.detrending.name + '.page' + page + '.csv');
    // console.log(csv);
    this.recordExport();
  }

  recordExport() {
    this.analytics.experimentDataExport(this.assay.id);
  }

  protected updateModel(exp: ExperimentalAssayView) {
    super.updateModel(exp);

    this.RDMSocial.canProceedByMeasurement(exp)
      .then(resp => {
        if (!resp) {
          this.disabledSecondary = true;
        } else {
          this.disabledSecondary = false;
        }
      });

    this.fetcher.experiment(exp);



  }

}
