import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ExperimentsListComponent} from './experiments-list.component';
import {FormsModule} from '@angular/forms';
import {RouterTestingModule} from '@angular/router/testing';
import {UserService} from '../../auth/user.service';
import {fakeUserService} from '../../auth/auth_test_tool.spec';
import {BioDareRestService} from '../../backend/biodare-rest.service';
import {fakeBioDareRestService} from '../../backend/biodare-rest_test_tool.spec';
import {MatPaginatorModule, MatSlideToggleModule} from '@angular/material';
import {ExperimentSummaryComponent} from './experiment-summary/experiment-summary.component';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';

describe('ExperimentsListComponent', () => {
  let component: ExperimentsListComponent;
  let fixture: ComponentFixture<ExperimentsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ExperimentsListComponent, ExperimentSummaryComponent],
      imports: [FormsModule,
        RouterTestingModule, MatSlideToggleModule, MatPaginatorModule, NoopAnimationsModule],
      providers: [
        {provide: UserService, useValue: fakeUserService()},
        {provide: BioDareRestService, useValue: fakeBioDareRestService()}
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExperimentsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
