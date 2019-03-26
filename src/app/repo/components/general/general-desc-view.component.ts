import {Component, Input} from '@angular/core';
import {GeneralDesc} from '../../../dom/repo/shared/general-desc';


@Component({
  selector: 'bd2-general-desc-view',
  templateUrl: './general-desc-view.component.html',
})
export class GeneralDescViewComponent {

  @Input()
  model: GeneralDesc;


}
