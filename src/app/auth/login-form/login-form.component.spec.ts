import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import {LoginFormComponent} from './login-form.component';
import {FormsModule} from '@angular/forms';
import {UserService} from '../user.service';
import {fakeUserService, MockUserService} from '../auth_test_tool.spec';

describe('LoginFormComponent', () => {
  let component: LoginFormComponent;
  let fixture: ComponentFixture<LoginFormComponent>;
  let mockedUserService: MockUserService;

  beforeEach(waitForAsync(() => {
    mockedUserService = fakeUserService();
    TestBed.configureTestingModule({
      declarations: [LoginFormComponent],
      imports: [FormsModule],
      providers: [
        {provide: UserService, useValue: mockedUserService}
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
