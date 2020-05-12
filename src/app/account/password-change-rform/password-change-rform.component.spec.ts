import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {PasswordChangeRFormComponent} from './password-change-rform.component';
import {ReactiveFormsModule} from '@angular/forms';
import {MaterialsModule} from '../../shared/materials.module';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {UserService} from '../../auth/user.service';
import {fakeUserService} from '../../auth/auth_test_tool.spec';

describe('PasswordChangeRformComponent', () => {
  let component: PasswordChangeRFormComponent;
  let fixture: ComponentFixture<PasswordChangeRFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, MaterialsModule, NoopAnimationsModule],
      declarations: [ PasswordChangeRFormComponent ],
      providers: [
        {provide: UserService, useValue: fakeUserService()},
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PasswordChangeRFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
