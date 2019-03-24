import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {fakeUserService, MockUserService} from '../../auth/auth_test_tool.spec';
import {HeaderBarComponent} from './header-bar.component';
import {UserService} from '../../auth/user.service';

describe('HeaderBarComponent', () => {
  let component: HeaderBarComponent;
  let fixture: ComponentFixture<HeaderBarComponent>;
  let mockedUserService: MockUserService;

  beforeEach(async(() => {

    mockedUserService = fakeUserService();

    TestBed.configureTestingModule({
      declarations: [HeaderBarComponent],
      providers: [
        {provide: UserService, useValue: mockedUserService}
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('is initialized with anonymous', () => {

    expect(component.isJumbo).toBe(true);
    expect(component.logged).toBe(false);
    expect(component.user).toBe(mockedUserService.currentUser);
  });
});
