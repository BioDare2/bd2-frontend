import {Component, OnDestroy, OnInit} from '@angular/core';
import {RhythmicityBaseComponent} from '../rhythmicity-base.component';
import {RhythmicityService} from '../rhythmicity.service';
import {ExperimentComponentsDependencies} from '../../experiment-components.dependencies';
import {TSFetcher} from '../../../tsdata/plots/ts-fetcher';
import {TSDataService} from '../../../tsdata/ts-data.service';
import {AnalyticsService} from '../../../analytics/analytics.service';
import {UserService} from '../../../auth/user.service';
import {Trace} from '../../../tsdata/plots/ts-plot.dom';
import {Subscription} from 'rxjs';
import {debounceTime} from 'rxjs/operators';
import {DisplayParameters} from '../../../tsdata/plots/ts-display.dom';
import {RhythmicityRequest} from '../rhythmicity-dom';


@Component({
  templateUrl: './rhythmicity-start-form.component.html',
  styles: []
})
export class RhythmicityStartFormComponent extends RhythmicityBaseComponent implements OnInit, OnDestroy {

  disabled = false;
  blocked = false;

  timeseries: Trace[];
  tracesPerPlot = 5;

  private timeSeriesSubsripction: Subscription;

  private fetcher: TSFetcher;

  constructor(
    private tsdataService: TSDataService,
    private analytics: AnalyticsService,
    private userService: UserService,
    rhythmicityService: RhythmicityService,
    serviceDependencies: ExperimentComponentsDependencies) {
    super(rhythmicityService, serviceDependencies);

    this.titlePart = ' New Test';
    this.fetcher = new TSFetcher(tsdataService);

  }


  ngOnInit() {
    super.ngOnInit();


    this.timeSeriesSubsripction = this.fetcher.seriesPackStream.pipe(
      debounceTime(1000) // debounced added to reduce screen flickering on updates
    )
      .subscribe(
        (pack) => {
          const data = pack.data;
          // console.log("Got data: "+data.length);
          this.tracesPerPlot = Math.max(5, data.length / 20);
          this.timeseries = data;
        },
        (err) => {
          console.log('Error in TS subscription: ' + err);
          this.feedback.error(err);
        },
        () => console.log('Timeseries stream finished')
      );
  }

  ngOnDestroy(): void {

    if (this.timeSeriesSubsripction) {
      this.timeSeriesSubsripction.unsubscribe();
    }

    this.fetcher.ngOnDestroy();
    super.ngOnDestroy();
  }

  emitDisplayParams(params: DisplayParameters) {
    this.fetcher.changeDisplayParams(params);
    // console.log("P"+params.timeStart+":"+params.timeEnd);
  }

  doAnalysis(req: RhythmicityRequest) {
    // console.log("R: "+JSON.stringify(req));

    if (req.isValid()) {
      this.blocked = true;
      this.rhythmicityService.newTest(this.assay, req).subscribe(
        res => {
          this.feedback.success('Rhythmicity test submitted');
          this.analytics.rhythmicityNew(req.method.name, this.assay.id, this.userService.currentUser.login);
          this.refreshModel();
          this.goToRhythmicityHome();
        },
        reason => {
          this.blocked = false;
          this.feedback.error(reason);
        });

    }
  }

}
