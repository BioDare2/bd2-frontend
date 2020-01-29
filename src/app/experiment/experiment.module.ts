import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ExperimentRoutingModule} from './experiment-routing.module';
import {ExperimentFeatureComponent} from './experiment-feature/experiment-feature.component';
import {ExperimentNavigationComponent} from './experiment-navigation.component';
import {ExperimentBasicInfoViewComponent} from './experiment-basic-info-view.component';
import {ExperimentAssayOverviewComponent} from './experiment-assay-overview/experiment-assay-overview.component';
import {RepoComponentsModule} from '../repo/components/repo-comp.module';
import {ExperimentAssayEditFormComponent} from './experiment-assay-edit-form/experiment-assay-edit-form.component';
import {AttachmentsModule} from './attachments/attachments.module';
import {PublishModule} from './publish/publish.module';
import {ExperimentAssayCreateFormComponent} from './experiment-assay-create-form/experiment-assay-create-form.component';

@NgModule({
  declarations: [ExperimentFeatureComponent, ExperimentNavigationComponent, ExperimentBasicInfoViewComponent,
    ExperimentAssayOverviewComponent, ExperimentAssayEditFormComponent, ExperimentAssayCreateFormComponent],
  imports: [
    CommonModule,
    RepoComponentsModule,
    AttachmentsModule,
    PublishModule,
    ExperimentRoutingModule
  ]
})
export class ExperimentModule {
}
