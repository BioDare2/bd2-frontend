import {OnDestroy, OnInit} from '@angular/core';
import {ExperimentalAssayView} from '../dom/repo/exp/experimental-assay-view';
import {FeedbackService} from '../feedback/feedback.service';
import {CurrentExperimentService} from './current-experiment.service';
import {ValidableFormComponent} from '../shared/validable-form.component';
import {Router} from '@angular/router';
import {ExperimentService} from './experiment.service';
import {ExperimentComponentsDependencies} from './experiment-components.dependencies';
import {TitleSetterService} from '../core/titlesetter.service';
import {Subscription} from 'rxjs';
import {filter} from 'rxjs/operators';

export class ExperimentBaseComponent extends ValidableFormComponent<ExperimentalAssayView> implements OnInit, OnDestroy {

  assay: ExperimentalAssayView;
  protected experimentService: ExperimentService;
  protected currentExperiment: CurrentExperimentService;
  protected feedback: FeedbackService;
  protected router: Router;
  protected titleSetter: TitleSetterService;
  protected titlePart: string;
  private expSubscription: Subscription;

  constructor(protected serviceDependencies: ExperimentComponentsDependencies) {
    super();
    this.experimentService = serviceDependencies.experimentService;
    this.currentExperiment = serviceDependencies.currentExperiment;
    this.feedback = serviceDependencies.feedback;
    this.router = serviceDependencies.router;
    this.titleSetter = serviceDependencies.titleSetter;
    this.titlePart = '';
  }


  ngOnInit(): any {
    // console.log(this.constructor.name+" OnInit");
    this.subscribeToExperiment();


  }

  ngOnDestroy(): void {

    this.unsubscribeFromExperiment();
    // console.log(this.constructor.name+" OnDestroy");
  }

  protected getModel(): ExperimentalAssayView {
    return this.assay;
  }


  protected updateModel(exp: ExperimentalAssayView) {
    this.assay = exp;
    this.setTitle();


  }

  protected setTitle() {
    this.titleSetter.setTitle('Exp ' + this.assay.id + this.titlePart);
  }

  protected subscribeToExperiment() {

    // console.log('In subscribe');
    this.expSubscription = this.currentExperiment.experiment().pipe(
      filter(exp => (exp ? true : false))
    ).subscribe(
      exp => {
        this.updateModel(exp);
        // console.log(this.constructor.name+" changed exp to model: "+( exp != null ? exp.id : "null" ));
      },
      err => this.feedback.error(err),
      () => console.log(this.constructor.name + ' expSubscription completed')
    );
  }

  protected refreshModel(): Promise<ExperimentalAssayView> {
    // console.log("RefreshModel called");
    return this.experimentService.getExperiment(this.assay.id)
      .then(exp => {
        this.currentExperiment.push(exp);
        return exp;
      });
  }

  protected unsubscribeFromExperiment() {
    if (this.expSubscription) {
      this.expSubscription.unsubscribe();
    }
  }

  protected expHomePath(id?: number): any[] {
    id = id || this.assay.id;
    return ['/experiment', id];
  }

  protected goToExpHome(id?: number) {
    this.router.navigate(this.expHomePath(id));
  }

  public goToExpEdit(id?: number, section?: string) {
    const nav = this.expHomePath(id);
    nav.push('edit');
    if (section) {
      this.router.navigate(nav, {fragment: section});
    } else {
      this.router.navigate(nav);
    }
  }


}
