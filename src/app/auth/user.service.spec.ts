import {fakeAsync, TestBed, tick} from '@angular/core/testing';

import {UserService} from './user.service';
import {RouterTestingModule} from '@angular/router/testing';
import {AnalyticsService} from '../analytics/analytics.service';
import {fakeAnalyticsService} from '../analytics/analytics_test_tool.spec';
import {BioDareRestService} from '../backend/biodare-rest.service';
import {fakeBioDareRestService, testUserData} from '../backend/biodare-rest_test_tool.spec';
import {BD2User} from "./user.dom";
import {of, throwError} from "rxjs";

describe('UserService', () => {

  let BD2REST: jasmine.SpyObj<BioDareRestService>;
  let service: UserService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
      ],
      providers: [
        {provide: AnalyticsService, useValue: fakeAnalyticsService()},
        {provide: BioDareRestService, useValue: fakeBioDareRestService()}
      ]
    });

    service = TestBed.get(UserService);
    BD2REST = TestBed.get(BioDareRestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('login works', () => {
    expect(BD2REST).toBeDefined();

    BD2REST.login('t','p').subscribe(
      user => expect(user.login).toBe('test')
    );

    expect(service.isLoggedIn()).toBe(false);

    service.login('t', 'p');

    expect(service.isLoggedIn()).toBe(true);
    expect(service.currentUser.login).toBe('test');

  });

  it( 'login gives error on anonymous', () => {

    let u = BD2User.deserialize(testUserData);
    u.anonymous = true;

    BD2REST.login.and.returnValue(of(u));

    let p = service.currentUser;
    service.login('t', 'p')
      .then( a => fail('Expected error got'+a))
      .catch( e => expect(e.message).toBe('Login got anonymous user: test'));

    expect(service.currentUser).toBe(p);
  });

  it( 'login handles errors', () => {

    BD2REST.login.and.returnValue(throwError('Unknown user'));

    let p = service.currentUser;
    service.login('t', 'p')
      .then( a => fail('Expected error got'+a))
      .catch( e => expect(e).toBe('Unknown user'));

    expect(service.currentUser).toBe(p);
  });

  it('logout works', () => {

    let u = BD2User.deserialize(testUserData);
    u.login = 't2';
    u.anonymous = true;

    BD2REST.refreshUser.and.returnValue(of(u));

    service.currentUser.anonymous = false;
    expect(service.isLoggedIn()).toBe(true);

    service.logout();
    expect(service.isLoggedIn()).toBe(false);
    expect(service.currentUser.login).toBe(u.login);


  });
});
