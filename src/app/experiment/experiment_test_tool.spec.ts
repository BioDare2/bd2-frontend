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


export function fakeExperimentService() {


  const ser = jasmine.createSpyObj('ExperimentService', [
    'newDraft', 'newExperiment'
  ]);


  ser.newDraft.and.returnValue(Promise.resolve({}));
  ser.newExperiment.and.returnValue(Promise.resolve({}));
  return ser;
}


@NgModule({
  declarations: [],
  imports: [FormsModule, ButtonsModule, RouterTestingModule,
    RepoComponentsModule
  ],
  providers: [
    {provide: ExperimentService, useValue: fakeExperimentService()},
    {provide: UserService, useValue: fakeUserService()},
    {provide: BioDareRestService, useValue: fakeBioDareRestService()}
  ],
  exports: [FormsModule, ButtonsModule, RouterTestingModule,
    RepoComponentsModule
  ]
})
export class ExperimentsTestToolModule {
}
