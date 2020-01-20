import {Component, Input} from '@angular/core';
import {ExperimentalAssayView} from '../../../dom/repo/exp/experimental-assay-view';


@Component({
  selector: 'bd2-simple-bio-desc-view',
  template: `

<div *ngIf="model">

  <p>
  <strong>Species: </strong> {{model.species}}
  </p>
  <p>
  <strong>Data category: </strong> {{model.dataCategory?.longName}}
  </p>
</div>
`
})
export class SimpleBioDescViewComponent {

  @Input()
  model: ExperimentalAssayView;


}
