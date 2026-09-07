import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { Component, ChangeDetectionStrategy } from '@angular/core';

import {WelcomeComponent} from './welcome.component';
import {UserService} from '../../auth/user.service';
import {fakeUserService} from '../../auth/auth_test_tool.spec';

@Component({
  selector: 'bd2-featured-dataset',
  template: '',
  changeDetection: ChangeDetectionStrategy.Eager,
  standalone: false
})
class FeaturedDatasetStubComponent {}

describe('WelcomeComponent', () => {
  let component: WelcomeComponent;
  let fixture: ComponentFixture<WelcomeComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [
        WelcomeComponent,
        FeaturedDatasetStubComponent
      ],
      providers: [
        {provide: UserService, useValue: fakeUserService()}
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WelcomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
