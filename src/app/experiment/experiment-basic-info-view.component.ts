import {Component, Input, ChangeDetectionStrategy} from '@angular/core';
import {ExperimentalAssayView} from '../dom/repo/exp/experimental-assay-view';

@Component({
    selector: 'bd2-experiment-basic-info-view',
    template: `
    @if (model) {
      <div class="summary-box">
        <!--<div>
        <label>Experiment</label>
        <div>{{model.name}}</div>
      </div>-->
      <div class="item">
        <strong>Purpose: </strong> {{model.generalDesc.purpose}}
      </div>
      <!--<div *ngIf="model.generalDesc.description"  class="item">
      <strong>Description: </strong> {{model.generalDesc.description}}
    </div>
    <div *ngIf="model.generalDesc.comments"  class="item">
      <strong>Comments: </strong> {{model.generalDesc.comments}}
    </div>-->
    @if (model.features.isOpenAccess) {
      <div class="item">
        <strong>Open Access: </strong> under <strong>{{model.features.licence}}</strong> license
      </div>
    }
    @if (model.contributionDesc.authors) {
      <div class="item">
        <strong>Authors: </strong>
        @for (author of model.contributionDesc.authors; track author) {
          <span>{{ author.name }}, </span>
        }
      </div>
    }
    <div class="item item-last">
      <strong>Data category: </strong> {{model.dataCategory?.longName}}
    </div>
    </div>
    }
    `,
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class ExperimentBasicInfoViewComponent {

  @Input()
  model: ExperimentalAssayView;


}
