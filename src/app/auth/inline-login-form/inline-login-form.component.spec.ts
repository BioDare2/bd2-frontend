import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InlineLoginFormComponent } from './inline-login-form.component';
import {FormsModule} from '@angular/forms';
import {RouterTestingModule} from '@angular/router/testing';
import {fakeUserService, MockUserService} from '../auth_test_tool.spec';
import {UserService} from '../user.service';

describe('InlineLoginFormComponent', () => {
  let component: InlineLoginFormComponent;
  let fixture: ComponentFixture<InlineLoginFormComponent>;
  let mockedUserService: MockUserService;

  beforeEach(async(() => {
    mockedUserService = fakeUserService();
    TestBed.configureTestingModule({
      declarations: [ InlineLoginFormComponent ],
      imports: [FormsModule, RouterTestingModule],
      providers: [
        {provide: UserService, useValue: mockedUserService}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InlineLoginFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
