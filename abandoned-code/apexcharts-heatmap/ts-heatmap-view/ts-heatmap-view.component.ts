import {Component, OnDestroy, OnInit} from '@angular/core';
import {ExperimentBaseComponent} from '../../../experiment-base.component';
import {TSDataService} from '../../../../tsdata/ts-data.service';
import {RDMSocialServiceService} from '../../../../rdmsocial/rdmsocial-service.service';
import {AnalyticsService} from '../../../../analytics/analytics.service';
import {ExperimentComponentsDependencies} from '../../../experiment-components.dependencies';
import {HeatmapFetcher} from '../heatmap-fetcher.service';
import {debounceTime} from 'rxjs/operators';
import {Subscription} from 'rxjs';
import {DisplayParameters} from '../../../../tsdata/plots/ts-display.dom';
import {Trace} from '../../../../tsdata/plots/ts-plot.dom';
import {PageEvent} from '@angular/material/paginator';
import {TimeSeriesMetrics} from '../../../../tsdata/ts-data-dom';
import {ExperimentalAssayView} from '../../../../dom/repo/exp/experimental-assay-view';

@Component({
  selector: 'bd2-ts-heatmap-view',
  templateUrl: './ts-heatmap-view.component.html',
  styles: [
  ],
  providers: [HeatmapFetcher]
})
export class TsHeatmapViewComponent extends ExperimentBaseComponent implements OnDestroy, OnInit {

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

  constructor(private fetcher: HeatmapFetcher,
              private tsdataService: TSDataService,
              private RDMSocial: RDMSocialServiceService,
              private analytics: AnalyticsService,
              serviceDependencies: ExperimentComponentsDependencies) {

    super(serviceDependencies);

    this.titlePart = ' Data';
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
