import {Component, OnInit} from '@angular/core';
import {ValidableFormComponent} from '../../shared/validable-form.component';
import {ExperimentalAssayView} from '../../dom/repo/exp/experimental-assay-view';
import {ExperimentService} from '../experiment.service';
import {FeedbackService} from '../../feedback/feedback.service';
import {Router} from '@angular/router';
import {ExperimentalAssayViewValidator} from '../../dom/repo/exp/experimental-assay-view.validator';
import {RDMSocialServiceService} from '../../rdmsocial/rdmsocial-service.service';

@Component({
  templateUrl: './experiment-assay-create-form.component.html',
  styles: []
})
export class ExperimentAssayCreateFormComponent extends ValidableFormComponent<ExperimentalAssayView> implements OnInit {


  assay: ExperimentalAssayView;

  isUnauthorised = false;
  blocked = false;

  activeGeneralDescForm = true;
  activeContributionDescForm = false;
  activeSimpleBioDescForm = true;
  activeMeasurementDescForm = false;

  constructor(private experimentService: ExperimentService,
              private RDMSocial: RDMSocialServiceService,
              private feedback: FeedbackService,
              private router: Router) {
    super(ExperimentalAssayViewValidator.INSTANCE);
    // this.validator = ;
  }

  ngOnInit() {

    this.experimentService.newDraft()
      .then(exp => {
        this.assay = exp;
      })
      .catch(reason => {
        this.isUnauthorised = reason.isUnauthorised;
        this.feedback.error(reason);
      });
  }

  hideEdits(event: any) {
    // console.log("Hide "+event);
    if (this.assay.generalDesc.name) {
      this.activeGeneralDescForm = false;
    } else {
      this.activeGeneralDescForm = true;
    }

    if (this.assay.species && this.assay.dataCategory) {
      this.activeSimpleBioDescForm = false;
    } else {
      this.activeSimpleBioDescForm = true;
    }

    this.activeContributionDescForm = false;
    this.activeMeasurementDescForm = false;

    this.triggerValidation();
  }

  cancel() {
    // console.log("cancel");
    this.clearErrors();
    this.router.navigate(['/experiments']);
  }

  save() {
    // console.log("save");
    if (this.assay) {

      if (this.triggerValidation()) {
        this.blocked = true;
        this.experimentService.newExperiment(this.assay)
          .then(exp => {
            this.feedback.success('Experiment: "' + exp.name + '" created.');
            // this.RDMSocial.registerNewAssay(exp);
            return exp;
          })
          .then(exp => this.router.navigate(['/experiment', exp.id]))
          .catch(reason => {
            this.blocked = false;
            this.feedback.error(reason);
          });
      }
    }
  }

  protected getModel(): ExperimentalAssayView {
    return this.assay;
  }


}
