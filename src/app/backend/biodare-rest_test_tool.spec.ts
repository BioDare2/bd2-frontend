import {BD2User} from '../auth/user.dom';
import {of} from 'rxjs';
import {ExperimentalAssayView} from '../dom/repo/exp/experimental-assay-view';
import {LegacyPageEvent as PageEvent} from '@angular/material/legacy-paginator';

export const testUserData = {
  firstName: 'Test',
  lastName: 'User',
  institution: 'University of Edinburgh',
  anonymous: false,
  login: 'test',
  email: 'biodare@ed.ac.uk'
};

export function fakeBioDareRestService() {


  const user = BD2User.deserialize(testUserData);
  const unlogged = BD2User.deserialize(testUserData);
  unlogged.anonymous = true;

  const ser = jasmine.createSpyObj('BioDareRestService', ['login', 'logout', 'refreshUser',
    'experiments', 'experimentNewDraft', 'experimentNewExperiment',
    'rdmAssayGuiAspects', 'rdmRegisterWarning', 'tsdataExportURL',
    'fileURL',
    'species'
  ]);

  ser.login.and.returnValue(of(user));
  ser.logout.and.returnValue(of(true));
  ser.refreshUser.and.returnValue(of(unlogged));

  ser.experiments.and.returnValue(of({ data: [], currentPage: new PageEvent()}));

  function f(exp: ExperimentalAssayView, id: any): string {
    return 'exp/file/' + id;
  }

  ser.fileURL.and.callFake(f);
  return ser;
}
