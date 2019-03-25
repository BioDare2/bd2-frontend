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

  const ser = jasmine.createSpyObj('BioDareRestService', ['login', 'logout', 'refreshUser']);

  ser.login.and.returnValue(of(user));
  ser.logout.and.returnValue(of(true));
  ser.refreshUser.and.returnValue(BD2User.deserialize(testUserData));
  return ser;
}
