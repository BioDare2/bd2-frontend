import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import {SearchAndSortPanelComponent} from './search-and-sort-panel.component';
import {ReactiveFormsModule} from '@angular/forms';
import {MaterialsModule} from '../../shared/materials.module';
import {SortSwitchComponent} from './sort-switch/sort-switch.component';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { BioDareEndPoints } from 'src/app/backend/biodare-rest.dom';

describe('SearchAndSortPanelComponent', () => {
  let component: SearchAndSortPanelComponent;
  let fixture: ComponentFixture<SearchAndSortPanelComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchAndSortPanelComponent, SortSwitchComponent ],
      imports: [ReactiveFormsModule, MaterialsModule],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: BioDareEndPoints, useValue: {} }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchAndSortPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
