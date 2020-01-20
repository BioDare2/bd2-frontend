import {Component, Input} from '@angular/core';
import {GeneralDesc} from '../../../dom/repo/shared/general-desc';
import {ExperimentGeneralDescView} from '../../../dom/repo/exp/experiment-general-desc-view';


@Component({
  selector: 'bd2-general-desc-view',
  templateUrl: './general-desc-view.component.html',
})
export class GeneralDescViewComponent {

  @Input()
  model: GeneralDesc | ExperimentGeneralDescView;


}
