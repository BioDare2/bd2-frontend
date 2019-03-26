import {BD2User} from '../auth/user.dom';
import {of} from 'rxjs';

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
    'rdmAssayGuiAspects', 'rdmRegisterWarning'
  ]);

  ser.login.and.returnValue(of(user));
  ser.logout.and.returnValue(of(true));
  ser.refreshUser.and.returnValue(of(unlogged));

  ser.experiments.and.returnValue(Promise.resolve([]));
  return ser;
}
