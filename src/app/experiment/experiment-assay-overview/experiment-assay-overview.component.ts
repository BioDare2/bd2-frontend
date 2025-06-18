import {Component} from '@angular/core';
import {ExperimentBaseComponent} from '../experiment-base.component';
import {ExperimentComponentsDependencies} from '../experiment-components.dependencies';

@Component({
    template: `
    @if (assay) {
      <div>
        <h3>Overview of experimental details</h3>
        <div class="card mb-2">
          <div class="card-header">General description</div>
          <div class="card-body">
            <bd2-general-desc-view
              [model]="assay.generalDesc"
            ></bd2-general-desc-view>
          </div>
        </div>
        <div class="card mb-2">
          <div class="card-header">Contributions</div>
          <div class="card-body">
            <bd2-contr-desc-view
              [model]="assay.contributionDesc"
            ></bd2-contr-desc-view>
          </div>
        </div>
        <div class="card mb-2">
          <div class="card-header">Biological details</div>
          <div class="card-body">
            <bd2-simple-bio-desc-view
              [model]="assay"
            ></bd2-simple-bio-desc-view>
          </div>
        </div>
        <div class="card mb-2">
          <div class="card-header">Measurement details</div>
          <div class="card-body">
            <bd2-measurement-desc-view
              [model]="assay.experimentalDetails.measurementDesc"
              >
            </bd2-measurement-desc-view>
          </div>
        </div>
      </div>
    }
    `,
    providers: [],
    standalone: false
})
export class ExperimentAssayOverviewComponent extends ExperimentBaseComponent {

  constructor(serviceDependencies: ExperimentComponentsDependencies) {
    super(serviceDependencies);
  }


}
