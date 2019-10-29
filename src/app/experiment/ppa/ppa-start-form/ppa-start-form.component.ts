import {Component, OnDestroy, OnInit} from '@angular/core';
import {PPABaseComponent} from '../ppa-base.component';
import {Trace} from '../../../tsdata/plots/ts-plot.dom';
import {Subscription} from 'rxjs';
import {TSFetcher} from '../../../tsdata/plots/ts-fetcher';
import {TSDataService} from '../../../tsdata/ts-data.service';
import {RDMSocialServiceService} from '../../../rdmsocial/rdmsocial-service.service';
import {AnalyticsService} from '../../../analytics/analytics.service';
import {ExperimentComponentsDependencies} from '../../experiment-components.dependencies';
import {PPAService} from '../ppa.service';
import {ExperimentalAssayView} from '../../../dom/repo/exp/experimental-assay-view';
import {debounceTime} from 'rxjs/operators';
import {DisplayParameters} from '../../../tsdata/plots/ts-display.dom';
import {PPARequest} from '../ppa-dom';
import {UserService} from '../../../auth/user.service';


@Component({
  templateUrl: './ppa-start-form.component.html',
  providers: [TSFetcher]
})
export class PPAStartFormComponent extends PPABaseComponent implements OnInit, OnDestroy {

  disabled = false;
  blocked = false;

  timeseries: Trace[];
  tracesPerPlot = 5;
  totalTraces = 0;
  currentPage = DisplayParameters.firstPage();

  private timeSeriesSubsripction: Subscription;


  constructor(
    private fetcher: TSFetcher,
    private RDMSocial: RDMSocialServiceService,
    private analytics: AnalyticsService,
    private userService: UserService,
    ppaService: PPAService,
    serviceDependencies: ExperimentComponentsDependencies) {
    super(ppaService, serviceDependencies);


    this.titlePart = ' New PPA';

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
          this.totalTraces = pack.totalTraces;
          this.currentPage = pack.currentPage;
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

  doAnalysis(req: PPARequest) {
    // console.log("R: "+JSON.stringify(req));

    if (req.isValid()) {
      this.blocked = true;
      this.ppaService.newPPA(this.assay, req)
        .then(res => {
          this.feedback.success('Analysis submitted');
          this.analytics.ppaNew(req.method.name, this.assay.id, this.userService.currentUser.login);
        })
        .then(() => this.refreshModel())
        .then(() => this.goToPPAHome())
        .catch(reason => {
          this.blocked = false;
          this.feedback.error(reason);
        });

    }
  }

  protected updateModel(exp: ExperimentalAssayView) {

    this.RDMSocial.canProceedByMeasurement(exp)
      .then(resp => {
        this.disabled = !resp;

        /*if (resp) {
          this.disabled = false;
        } else {
          this.disabled = true;
        }*/
      });

    this.fetcher.experiment(exp);

    super.updateModel(exp);


  }

  /*
   private defaultParameters(): PPARequest {
   let params = new PPARequest();
   params.windowStart = 0;
   params.windowEnd = 0;
   params.periodMin = 18;
   params.periodMax = 35;
   params.method= PPAMethod.NLLS;
   params.detrending = DetrendingType.LIN_DTR;

   params['methodN'] = params.method.name;
   params['detrendingN'] = params.detrending.name;
   return params;
   }

   protected params2display(params: PPARequest): DisplayParameters {
   let p = new DisplayParameters(params.windowStart,params.windowEnd,DetrendingType.get(params['detrendingN']));
   return p;
   }*/

}
