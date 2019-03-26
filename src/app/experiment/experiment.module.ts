import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ExperimentRoutingModule} from './experiment-routing.module';
import { ExperimentFeatureComponent } from './experiment-feature/experiment-feature.component';
import {SharedComponentsModule} from '../shared/shared-components.module';
import {ExperimentNavigationComponent} from './experiment-navigation.component';
import {ExperimentBasicInfoViewComponent} from './experiment-basic-info-view.component';

@NgModule({
  declarations: [ExperimentFeatureComponent, ExperimentNavigationComponent,  ExperimentBasicInfoViewComponent],
  imports: [
    CommonModule,
    SharedComponentsModule,
    ExperimentRoutingModule
  ]
})
export class ExperimentModule {
}
