import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ExperimentalAssayView} from '../../dom/repo/exp/experimental-assay-view';
import {Subscription} from 'rxjs';
import {ExperimentService} from '../experiment.service';
import {RDMSocialServiceService} from '../../rdmsocial/rdmsocial-service.service';
import {FeedbackService} from '../../feedback/feedback.service';
import {AnalyticsService} from '../../analytics/analytics.service';
import {ActivatedRoute, Router} from '@angular/router';
import {filter, map} from 'rxjs/operators';
import {CurrentExperimentService} from '../current-experiment.service';
import {ExperimentComponentsDependencies} from '../experiment-components.dependencies';
import {SharedDialogsService} from '../../shared/shared-dialogs/shared-dialogs.service';

@Component({
  templateUrl: './experiment-feature.component.html',
  styles: [],
  providers: [CurrentExperimentService, ExperimentComponentsDependencies]
})
export class ExperimentFeatureComponent implements OnInit, OnDestroy {

  model: ExperimentalAssayView;
  isUnauthorised = false;

  private expSubscription: Subscription;
  private paramsSubscription: Subscription;

  // @ViewChild('warningDialog', { static: true })
  // private warningDialog: ConfirmDialogComponent;

  constructor(private experimentService: ExperimentService,
              private RDMSocial: RDMSocialServiceService,
              private currentExperiment: CurrentExperimentService,
              private feedback: FeedbackService,
              private analytics: AnalyticsService,
              private route: ActivatedRoute,
              private router: Router,
              private dialogs: SharedDialogsService) {

  }

  ngOnInit() {

    this.expSubscription = this.currentExperiment.experiment().pipe(
      filter(exp => exp ? true : false)
    )
      .subscribe(
        exp => {
          this.model = exp;
          this.analytics.experimentView(exp.id);

          this.RDMSocial.shouldShowMeasurementWarning(exp)
            .then(resp => {
              if (resp) {
                this.showMetadataWarning();
              }
            });
          // console.log("Feature changed exp to model: "+( exp != null ? exp.id : "null" ));
        },
        err => this.feedback.error(err),
        () => console.log('currentExperimentStream completed')
      );


    this.paramsSubscription = this.route.paramMap.pipe(
      map(p => p.get('id')),
      filter(id => id ? true : false)
    )
      .subscribe(id => this.loadExperiment(+id));
  }

  ngOnDestroy(): void {
    // console.log("Feature on destroy called");
    if (this.paramsSubscription) {
      this.paramsSubscription.unsubscribe();
    }

    if (this.expSubscription) {
      this.expSubscription.unsubscribe();
    }

    if (this.currentExperiment) {
      this.currentExperiment.close();
    }
  }

  refresh() {
    if (this.model) {
      this.loadExperiment(this.model.id);
    }

  }

  loadExperiment(expId: number) {

    this.experimentService.getExperiment(expId)
      .then(exp => {
        this.currentExperiment.push(exp);
        this.isUnauthorised = false;
      })
      .catch(reason => {
        this.isUnauthorised = reason.isUnauthorised;
        this.feedback.error(reason);
      });
  }

  handleWarningResponse(resp: boolean) {
    console.log('Dialog: ' + resp);
  }

  showMetadataWarning() {

      this.dialogs.confirm(
        'Metadata reminder',
        `
        <p>
        Please add measurements details, like technique, equipment and short description.
        </p>
        <p>
        It will improve the metadata quality and it will help you when searching for the data.
        </p>
`,
        'Not now'
      ).subscribe(resp => {
          this.RDMSocial.registerMeasurementWarning(this.model);
          if (resp) {
            this.router.navigate(['edit'], {relativeTo: this.route, fragment: 'MeasurementSection'});
          }
        });
    /*
    if (this.warningDialog) {
      this.warningDialog.ask(
        'Metadata reminder',
        `
        <p>
        Please add measurements details, like technique, equipment and short description.
        </p>
        <p>
        It will improve the metadata quality and it will help you when searching for the data.
        </p>
`
      )
        .then(resp => {
          this.RDMSocial.registerMeasurementWarning(this.model);
          if (resp) {
            this.router.navigate(['edit'], {relativeTo: this.route, fragment: 'MeasurementSection'});
          }
        });
    }*/
  }

}
