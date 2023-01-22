import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import {ImportDetailsSummaryComponent} from './import-details-summary.component';
import {MaterialsModule} from '../../../../../shared/materials.module';

describe('ImportDetailsSummaryComponent', () => {
  let component: ImportDetailsSummaryComponent;
  let fixture: ComponentFixture<ImportDetailsSummaryComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ImportDetailsSummaryComponent ],
      imports: [MaterialsModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportDetailsSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
