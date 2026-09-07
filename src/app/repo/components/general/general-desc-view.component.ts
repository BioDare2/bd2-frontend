import {Component, Input, ChangeDetectionStrategy} from '@angular/core';
import {ExperimentGeneralDescView} from '../../../dom/repo/exp/experiment-general-desc-view';


@Component({
    selector: 'bd2-general-desc-view',
    templateUrl: './general-desc-view.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class GeneralDescViewComponent {

  @Input()
  model: ExperimentGeneralDescView;


}
