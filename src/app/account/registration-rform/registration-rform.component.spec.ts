import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {RegistrationRFormComponent} from './registration-rform.component';
import {ReactiveFormsModule} from '@angular/forms';
import {fakeUserService} from '../../auth/auth_test_tool.spec';
import {ReCaptchaModule} from '../../recaptcha/recaptcha.module';
import {UserService} from '../../auth/user.service';

describe('RegistrationRFormComponent', () => {
  let component: RegistrationRFormComponent;
  let fixture: ComponentFixture<RegistrationRFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule, ReCaptchaModule,
      ],
      declarations: [RegistrationRFormComponent],
      providers: [
        {provide: UserService, useValue: fakeUserService()}
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrationRFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
