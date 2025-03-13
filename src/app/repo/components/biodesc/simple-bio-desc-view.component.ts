import {Component, Input} from '@angular/core';
import {ExperimentalAssayView} from '../../../dom/repo/exp/experimental-assay-view';


@Component({
    selector: 'bd2-simple-bio-desc-view',
    templateUrl: './simple-bio-desc-view.component.html',
    standalone: false
})
export class SimpleBioDescViewComponent {

  @Input()
  model: ExperimentalAssayView;


}
