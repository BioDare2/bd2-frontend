import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import {RegistrationRFormComponent} from './registration-rform.component';
import {ReactiveFormsModule} from '@angular/forms';
import {fakeUserService} from '../../auth/auth_test_tool.spec';
import {ReCaptchaModule} from '../../recaptcha/recaptcha.module';
import {UserService} from '../../auth/user.service';
import {StaticContentModule} from '../../documents/static-content/static-content.module';
import {StaticContentService} from '../../documents/static-content/static-content.service';
import {MaterialsModule} from '../../shared/materials.module';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';

describe('RegistrationRFormComponent', () => {
  let component: RegistrationRFormComponent;
  let fixture: ComponentFixture<RegistrationRFormComponent>;

  beforeEach(waitForAsync(() => {

    const contentService = jasmine.createSpyObj('contentService', ['getDocs']);
    contentService.getDocs.and.returnValue(Promise.resolve('Interesting document'));

    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule, ReCaptchaModule, StaticContentModule, MaterialsModule, NoopAnimationsModule

      ],
      declarations: [RegistrationRFormComponent],
      providers: [
        {provide: UserService, useValue: fakeUserService()},
        {provide: StaticContentService, useValue: contentService} // for documents popup
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
