import {Component, OnDestroy, OnInit} from '@angular/core';
import {ExperimentBaseComponent} from '../../experiment-base.component';
import {RDMSocialServiceService} from '../../../rdmsocial/rdmsocial-service.service';
import {ExperimentalAssayView} from '../../../dom/repo/exp/experimental-assay-view';
import {ExperimentComponentsDependencies} from '../../experiment-components.dependencies';
import {Subscription} from 'rxjs';
import {AnalyticsService} from '../../../analytics/analytics.service';
import {DisplayParameters} from '../../../tsdata/plots/ts-display.dom';
import {Trace} from '../../../tsdata/plots/ts-plot.dom';
import {TimeSeriesPack, TSFetcher} from '../../../tsdata/plots/ts-fetcher';
import {CSVExporter} from '../../../tsdata/export/csv-exporter';
import {debounceTime} from 'rxjs/operators';
// a explanation how to save files https://nils-mehlhorn.de/posts/angular-file-download-progress
// in case I want to remove filesaver
// import * as FileSaver from 'file-saver';

import {  fileSave } from 'browser-fs-access';

import {PageEvent} from '@angular/material/paginator';
import {TimeSeriesMetrics} from '../../../tsdata/ts-data-dom';
import {DataJobsService} from '../data-jobs.service';

@Component({
    templateUrl: './ts-view.component.html',
    providers: [TSFetcher, DataJobsService],
    standalone: false
})
export class TSViewComponent extends ExperimentBaseComponent implements OnDestroy, OnInit {

  // exportURL: string;
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


  constructor(public analysis: DataJobsService,
              private fetcher: TSFetcher,
              private RDMSocial: RDMSocialServiceService,
              private analytics: AnalyticsService,
              serviceDependencies: ExperimentComponentsDependencies) {

    super(serviceDependencies);

    analysis.allowedPPAMethods = ['NLLS','MESA'];

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
          // this.exportURL = this.tsdataService.exportURL(this.assay, pack.params);
          // console.log("P: "+pack.params.detrending.name+"; "+this.exportURL);
          this.timeseries = data;
          this.tracesPerPlot = Math.max(5, data.length / 20);
          this.totalTraces = pack.totalTraces;
          this.currentPage = pack.currentPage;
          this.analytics.experimentDataView(this.assay.id);

        },
        (err) => {
          console.log('Error in TS subscription: ' + err);
          this.feedback.error(err);
        },
        // () => console.log('Timeseries stream finished')
      );

    this.fetcher.error$.subscribe( err => this.feedback.error(err));
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

  exportDataView() {

    const data = this.fetcher.current;
    this.exportSeriesPack(data);
  }

  exportFullData() {

    this.fetcher.getFullDataSet(this.assay, this.fetcher.current.params, this.fetcher.current.sorting)
      .subscribe( data => {
        this.exportSeriesPack(data, true);
    });
  }

  protected exportSeriesPack(data: TimeSeriesPack, full = false) {

    if (!data) { return; }
    const csv = this.csvExporter.renderCSVTable(data.data, data.params, data.currentPage, data.sorting, this.assay);
    const blob = new Blob([csv], {type: 'text/csv'});

    const pageSuffix = full ? '.full' : `.page${data.currentPage.pageIndex + 1}`;
    const fileName = `${this.assay.id}_data.${data.params.detrending.name}${pageSuffix}.csv`;

    //FileSaver.saveAs(blob, fileName);

    const opt = {
      fileName: fileName,
      extensions: ['.csv']
    }

    fileSave(blob, opt)
      .then( v => {
        //console.log('Saved export as '+v.name);
        this.recordExport();
      })
      .catch( v => console.log('could not save export', v));

    // console.log(csv);

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
    this.analysis.experiment(exp);


  }

}
