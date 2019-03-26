
import {Injectable} from "@angular/core";
import {ExperimentService} from "./experiment.service";
import {CurrentExperimentService} from "./current-experiment.service";
import {FeedbackService} from "../feedback/feedback.service";
import {TitleSetterService} from "../core/titlesetter.service";
import {Router} from "@angular/router";

@Injectable()
export class ExperimentComponentsDependencies {

  constructor(public experimentService: ExperimentService,
              public currentExperiment: CurrentExperimentService,
              public feedback: FeedbackService,
              public titleSetter: TitleSetterService,
              public router: Router) {

  }
}