import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {ButtonsModule} from 'ngx-bootstrap/buttons';
import {RouterTestingModule} from '@angular/router/testing';
import {UserService} from '../auth/user.service';
import {fakeUserService} from '../auth/auth_test_tool.spec';
import {BioDareRestService} from '../backend/biodare-rest.service';
import {fakeBioDareRestService} from '../backend/biodare-rest_test_tool.spec';
import {RepoComponentsModule} from '../repo/components/repo-comp.module';
import {ExperimentService} from './experiment.service';
import {SharedComponentsModule} from '../shared/shared-components.module';
import {AnalyticsService} from '../analytics/analytics.service';
import {fakeAnalyticsService} from '../analytics/analytics_test_tool.spec';
import {ModalModule} from 'ngx-bootstrap/modal';


export function fakeExperimentService() {


  const ser = jasmine.createSpyObj('ExperimentService', [
    'newDraft', 'newExperiment', 'getExperiment'
  ]);


  ser.newDraft.and.returnValue(Promise.resolve({}));
  ser.newExperiment.and.returnValue(Promise.resolve({}));
  ser.getExperiment.and.returnValue(Promise.resolve({}));
  return ser;
}


@NgModule({
  declarations: [],
  imports: [FormsModule, ButtonsModule, RouterTestingModule,
    RepoComponentsModule, SharedComponentsModule, ModalModule.forRoot()
  ],
  providers: [
    {provide: ExperimentService, useValue: fakeExperimentService()},
    {provide: UserService, useValue: fakeUserService()},
    {provide: BioDareRestService, useValue: fakeBioDareRestService()},
    {provide: AnalyticsService, useValue: fakeAnalyticsService()}
  ],
  exports: [FormsModule, ButtonsModule, RouterTestingModule,
    RepoComponentsModule, SharedComponentsModule
  ]
})
export class ExperimentsTestToolModule {
}
