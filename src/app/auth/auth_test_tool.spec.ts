import {UserService} from './user.service';
import {BD2User} from "./user.dom";


export class MockUserService extends UserService {

  constructor() {

    super();

  }

  public setUser(user: BD2User) {
    super.setUser(user);
  }
}


export function fakeUserService()  {

  return new MockUserService();

}
