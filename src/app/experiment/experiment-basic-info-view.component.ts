import {Component, Input} from '@angular/core';
import {ExperimentalAssayView} from '../dom/repo/exp/experimental-assay-view';

@Component({
  selector: 'bd2-experiment-basic-info-view',
  template: `
    <div *ngIf="model" class="summary-box">
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
      <div *ngIf="model.features.isOpenAccess" class="item">
        <strong>Open Access: </strong> under <strong>{{model.features.licence}}</strong> license
      </div>
      <div *ngIf="model.contributionDesc.authors" class="item">
        <strong>Authors: </strong>
        <span *ngFor="let author of model.contributionDesc.authors">{{ author.name }}, </span>
      </div>
      <div class="item item-last">
        <strong>Data category: </strong> {{model.dataCategory?.longName}}
      </div>


    </div>
  `
})
export class ExperimentBasicInfoViewComponent {

  @Input()
  model: ExperimentalAssayView;


}
