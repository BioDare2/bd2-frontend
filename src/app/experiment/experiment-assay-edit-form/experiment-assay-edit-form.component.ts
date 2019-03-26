import {Component, AfterViewInit} from '@angular/core';
import {ExperimentBaseComponent} from '../experiment-base.component';
import {ExperimentComponentsDependencies} from '../experiment-components.dependencies';
import {ActivatedRoute} from '@angular/router';
import {ExperimentalAssayView} from "../../dom/repo/exp/experimental-assay-view";
import {ExperimentalAssayViewValidator} from "../../dom/repo/exp/experimental-assay-view.validator";

@Component({
  templateUrl: './experiment-assay-edit-form.component.html',
  providers:  []
})
export class ExperimentAssayEditFormComponent extends ExperimentBaseComponent implements AfterViewInit {

  blocked = false;
  activeGeneralDescForm = false;
  activeContributionDescForm = false;
  activeSimpleBioDescForm = false;
  activeMeasurementDescForm = false;

  requestedSection: string;

  _orgModel: ExperimentalAssayView;

  constructor(private route: ActivatedRoute, serviceDependencies: ExperimentComponentsDependencies) {
    super(serviceDependencies);

    this.titlePart = ' Edit';
    this.validator = ExperimentalAssayViewValidator.INSTANCE;
  }

  ngOnInit(): any {
    super.ngOnInit();

    this.route.fragment.subscribe(
      fragment => {
          this.requestedSection = fragment;
          this.focusOnSection(fragment);
      }
    );
  }

  ngAfterViewInit() {

    this.focusOnSection(this.requestedSection);
  }

  focusOnSection(section: string) {
    // console.log("Focus on: "+section);

    if (!section) { return; }

    const element = document.getElementById(section);
    if (element) {
      // console.log("Scrolling to: ",element);
      element.scrollIntoView();
    } /* else {
      console.log("No element");
    } */

    if (section === 'MeasurementSection') {
      this.activeMeasurementDescForm = true;
    }
  }



  protected updateModel(exp: ExperimentalAssayView) {
    this._orgModel = exp;
    this.assay = exp ? exp.clone() : null;
    this.setTitle();

  }

  saveEdits(event: any) {
    // console.log("save edits: "+(event ? JSON.stringify(event) : "null"));

    if (this.assay && event) {

      if (this.triggerValidation()) {
        this.blocked = true;
        this.experimentService.save(this.assay)
          .then( exp => {
            this.feedback.success('Experiment: "' + exp.name + '" updated.');
            return exp;
          })
          .then( exp => {
            this.currentExperiment.push(exp);
            return exp;
          })
          .then( exp => {
            this.blocked = false;
            this.hideEdits(event);
          })
          .catch( reason => {
            this.blocked = false;
            this.feedback.error(reason);
          });
      }
    }
  }

  hideEdits(event: any) {
    // console.log("Hide called");
    this.activeGeneralDescForm = false;
    this.activeContributionDescForm = false;
    this.activeSimpleBioDescForm = false;
    this.activeMeasurementDescForm = false;
    this.triggerValidation();
  }

  cancel() {
    // console.log("cancel");
    this.clearErrors();
    this.router.navigate(['/experiment', this.assay.id]);
  }

  /*
  save() {
    //console.log("save");
    if (this.assay) {

      if (this.triggerValidation()) {
        this.blocked = true;
        this.experimentService.save(this.assay)
          .then( exp => {
            this.feedback.success("Experiment: \""+exp.name+"\" updated.");
            return exp;
          })
          .then( exp => {
            this.currentExperiment.push(exp);
            return exp;
          })
          .then( exp => this.goToExpHome(exp.id))
          .catch( reason => {
            this.blocked = false;
            this.feedback.error(reason);
          })
      }
    }
  }*/

  /*
  validate(obj:ExperimentalAssayView):string[] {
    return null;
  }*/

}
