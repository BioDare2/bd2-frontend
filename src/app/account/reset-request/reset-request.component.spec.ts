import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import {ResetRequestComponent} from './reset-request.component';
import {FormsModule} from '@angular/forms';
import {ReCaptchaModule} from '../../recaptcha/recaptcha.module';
import {UserService} from '../../auth/user.service';
import {fakeUserService} from '../../auth/auth_test_tool.spec';

describe('ResetRequestComponent', () => {
  let component: ResetRequestComponent;
  let fixture: ComponentFixture<ResetRequestComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ResetRequestComponent],
      imports: [FormsModule, ReCaptchaModule],
      providers: [
        {provide: UserService, useValue: fakeUserService()}
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResetRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
