import {Component, OnDestroy, OnInit} from '@angular/core';
import {ExperimentBaseComponent} from '../../../experiment-base.component';
import {RDMSocialServiceService} from '../../../../rdmsocial/rdmsocial-service.service';
import {AnalyticsService} from '../../../../analytics/analytics.service';
import {ExperimentComponentsDependencies} from '../../../experiment-components.dependencies';
import {debounceTime} from 'rxjs/operators';
import {Subscription} from 'rxjs';
import {DisplayParameters} from '../../../../tsdata/plots/ts-display.dom';
import {Trace} from '../../../../tsdata/plots/ts-plot.dom';
import {PageEvent} from '@angular/material/paginator';
import {TimeSeriesMetrics} from '../../../../tsdata/ts-data-dom';
import {ExperimentalAssayView} from '../../../../dom/repo/exp/experimental-assay-view';
import {TimeSeriesPack, TSFetcher} from '../../../../tsdata/plots/ts-fetcher';
import * as FileSaver from 'file-saver';
import {CSVExporter} from '../../../../tsdata/export/csv-exporter';
import {DataJobsService} from '../../data-jobs.service';

@Component({
  selector: 'bd2-ts-heatmap-view',
  templateUrl: './ts-heatmap-view.component.html',
  styles: [
  ],
  providers: [TSFetcher, DataJobsService]
})
export class TsHeatmapViewComponent extends ExperimentBaseComponent implements OnDestroy, OnInit {

  currentParams: DisplayParameters;

  timeseries: Trace[] = [];
  totalTraces = 0;
  currentPage: PageEvent = DisplayParameters.firstPage();
  tracesPerPlot = 5;

  middleZero = false;

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

    analysis.allowedPPAMethods = ['NLLS'];
    
    this.titlePart = ' Data';
  }

  sort(val: any) {
    console.log("Sorting ",val);
  }

  ngOnInit(): void {
    super.ngOnInit();

    this.timeSeriesSubsripction = this.fetcher.seriesPackStream.pipe(
      debounceTime(1000)) // debounced added to reduce screen flickering on updates
      .subscribe(
        (pack) => {
          if (!this.assay) { return; }

          const data = pack.data;
          this.currentParams = pack.params;
          this.middleZero = this.isRangeSimetrical(pack.params);
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

  exportDataView() {

    const data = this.fetcher.current;
    this.exportSeriesPack(data);
  }

  exportFullData() {

    this.fetcher.getFullDataSet(this.assay, this.fetcher.current.params).subscribe( data => {

      this.exportSeriesPack(data, true);
    });
  }

  protected exportSeriesPack(data: TimeSeriesPack, full = false) {

    if (!data) { return; }
    const csv = this.csvExporter.renderCSVTable(data.data, data.params, data.currentPage, this.assay);
    const blob = new Blob([csv], {type: 'text/csv'});

    const pageSuffix = full ? '.full' : `.page${data.currentPage.pageIndex + 1}`;
    const fileName = `${this.assay.id}_data.${data.params.detrending.name}${pageSuffix}.csv`;
    FileSaver.saveAs(blob, fileName);
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
    this.analysis.experiment(exp);
  }

  protected isRangeSimetrical(params: DisplayParameters) {
    if (params.normalisation === 'RANGE' || params.normalisation === 'Z_SCORE') {
      return true;
    }
    if (params.align === 'MEAN') {
      return true;
    }
    return false;
  }
}
