import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import {AccountActivationComponent} from './account-activation.component';
import {RouterTestingModule} from '@angular/router/testing';
import {UserService} from '../../auth/user.service';
import {fakeUserService} from '../../auth/auth_test_tool.spec';

describe('AccountActivatationComponent', () => {
  let component: AccountActivationComponent;
  let fixture: ComponentFixture<AccountActivationComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [AccountActivationComponent],
      imports: [RouterTestingModule],
      providers: [
        {provide: UserService, useValue: fakeUserService()}
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountActivationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
