import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {AccountEditFormComponent} from './account-edit-form.component';
import {fakeUserService} from '../../auth/auth_test_tool.spec';
import {FormsModule} from '@angular/forms';
import {UserService} from '../../auth/user.service';

describe('UserEditFormComponent', () => {
  let component: AccountEditFormComponent;
  let fixture: ComponentFixture<AccountEditFormComponent>;

  beforeEach(async(() => {

    TestBed.configureTestingModule({
      declarations: [AccountEditFormComponent],
      imports: [FormsModule],
      providers: [
        {provide: UserService, useValue: fakeUserService()}
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountEditFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
