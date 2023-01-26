import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import {ExperimentsListComponent} from './experiments-list.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterTestingModule} from '@angular/router/testing';
import {UserService} from '../../auth/user.service';
import {fakeUserService} from '../../auth/auth_test_tool.spec';
import {BioDareRestService} from '../../backend/biodare-rest.service';
import {fakeBioDareRestService} from '../../backend/biodare-rest_test_tool.spec';
import {ExperimentSummaryComponent} from './experiment-summary/experiment-summary.component';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {SearchAndSortPanelComponent} from '../search-and-sort-panel/search-and-sort-panel.component';
import {MaterialsModule} from '../../shared/materials.module';
import {SortSwitchComponent} from '../search-and-sort-panel/sort-switch/sort-switch.component';

describe('ExperimentsListComponent', () => {
  let component: ExperimentsListComponent;
  let fixture: ComponentFixture<ExperimentsListComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ExperimentsListComponent, ExperimentSummaryComponent, SearchAndSortPanelComponent, SortSwitchComponent],
      imports: [FormsModule, ReactiveFormsModule,
        RouterTestingModule, MaterialsModule, NoopAnimationsModule],
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
