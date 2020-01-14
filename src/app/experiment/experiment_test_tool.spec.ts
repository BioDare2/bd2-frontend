import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ButtonsModule} from 'ngx-bootstrap/buttons';
import {RouterTestingModule} from '@angular/router/testing';
import {UserService} from '../auth/user.service';
import {fakeUserService} from '../auth/auth_test_tool.spec';
import {BioDareRestService} from '../backend/biodare-rest.service';
import {fakeBioDareRestService} from '../backend/biodare-rest_test_tool.spec';
import {RepoComponentsModule} from '../repo/components/repo-comp.module';
import {ExperimentService} from './experiment.service';
import {AnalyticsService} from '../analytics/analytics.service';
import {fakeAnalyticsService} from '../analytics/analytics_test_tool.spec';
import {ModalModule} from 'ngx-bootstrap/modal';
import {ExperimentComponentsDependencies} from './experiment-components.dependencies';
import {CurrentExperimentService} from './current-experiment.service';
import {CommonModule} from '@angular/common';


export function fakeExperimentService() {


  const ser = jasmine.createSpyObj('ExperimentService', [
    'newDraft', 'newExperiment', 'getExperiment', 'save'
  ]);


  ser.newDraft.and.returnValue(Promise.resolve({}));
  ser.newExperiment.and.returnValue(Promise.resolve({}));
  ser.getExperiment.and.returnValue(Promise.resolve({}));
  ser.save.and.returnValue(Promise.resolve({}));
  return ser;
}


@NgModule({
  declarations: [],
  imports: [CommonModule,
    FormsModule, ReactiveFormsModule,
    ButtonsModule.forRoot(),
    RouterTestingModule,
    RepoComponentsModule
  ],
  providers: [
    {provide: ExperimentService, useValue: fakeExperimentService()},
    {provide: UserService, useValue: fakeUserService()},
    {provide: BioDareRestService, useValue: fakeBioDareRestService()},
    {provide: AnalyticsService, useValue: fakeAnalyticsService()},
    CurrentExperimentService, ExperimentComponentsDependencies
  ],
  exports: [CommonModule,
    FormsModule, ReactiveFormsModule,
    ButtonsModule,
    RouterTestingModule,
    RepoComponentsModule
  ]
})
export class ExperimentsTestToolModule {
}
