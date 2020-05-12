import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {AccountEditRFormComponent} from './account-edit-rform.component';
import {ReactiveFormsModule} from '@angular/forms';
import {MaterialsModule} from '../../shared/materials.module';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {UserService} from '../../auth/user.service';
import {fakeUserService} from '../../auth/auth_test_tool.spec';

describe('AccountEditRformComponent', () => {
  let component: AccountEditRFormComponent;
  let fixture: ComponentFixture<AccountEditRFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, MaterialsModule, NoopAnimationsModule],
      declarations: [ AccountEditRFormComponent ],
      providers: [
        {provide: UserService, useValue: fakeUserService()},
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountEditRFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
