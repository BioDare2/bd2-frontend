import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import {PasswordResetComponent} from './password-reset.component';
import {FormsModule} from '@angular/forms';
import {UserService} from '../../auth/user.service';
import {fakeUserService} from '../../auth/auth_test_tool.spec';
import {RouterTestingModule} from '@angular/router/testing';

describe('PasswordResetComponent', () => {
  let component: PasswordResetComponent;
  let fixture: ComponentFixture<PasswordResetComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [PasswordResetComponent],
      imports: [FormsModule, RouterTestingModule],
      providers: [
        {provide: UserService, useValue: fakeUserService()}
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PasswordResetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
