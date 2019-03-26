import {Component, Input} from '@angular/core';

import {ContributionDesc} from '../../../dom/repo/contribution/contribution-desc';

@Component({
  selector: 'bd2-contr-desc-view',
  templateUrl: './contribution-desc-view.component.html',
  outputs: ['onAccepted', 'onCancelled']
})
export class ContributionDescViewComponent {

  @Input()
  model: ContributionDesc;
}
