import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {TopBarComponent} from './top-bar.component';
import {fakeUserService, MockUserService} from '../../auth/auth_test_tool.spec';
import {UserService} from '../../auth/user.service';
import {BD2User} from '../../auth/user.dom';
import {TopBarMenuComponent} from '../top-bar-menu/top-bar-menu.component';
import {RouterTestingModule} from '@angular/router/testing';
import {AuthModule} from '../../auth/auth.module';

describe('TopBarComponent', () => {
  let component: TopBarComponent;
  let fixture: ComponentFixture<TopBarComponent>;
  let mockedUserService: MockUserService;

  beforeEach(async(() => {
    mockedUserService = fakeUserService();
    TestBed.configureTestingModule({
      declarations: [TopBarComponent,
        TopBarMenuComponent],
      imports: [RouterTestingModule, AuthModule],
      providers: [
        {provide: UserService, useValue: mockedUserService}
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('gets user fro the service', () => {

    expect(component.logged).toBe(false);
    expect(component.user).toBe(mockedUserService.currentUser);

    const user = new BD2User('user1', 'Tomek', 'Paluch');
    user.anonymous = false;

    mockedUserService.setUser(user);
    fixture.detectChanges();

    expect(component.logged).toBe(true);
    expect(component.user).toBe(user);
  });
});
