import {UserService} from './user.service';


export class MockUserService extends UserService {

  constructor() {

    super();

  }
}


export function fakeUserService()  {

  return new MockUserService();

}
