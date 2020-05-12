import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {PPAFitDialogComponent, PPAFitDialogComponentParams} from './ppa-fit-dialog.component';
import {TSPlotModule} from '../../../../tsdata/plots/ts-plot.module';
import {FormsModule} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {PPAFitService} from '../../ppa-fit/ppa-fit.service';
import {of} from 'rxjs';

describe('PpaFitDialogComponent', () => {
  let component: PPAFitDialogComponent;
  let fixture: ComponentFixture<PPAFitDialogComponent>;
  let fitService: PPAFitService;

  beforeEach(async(() => {

    const mockFitService = jasmine.createSpyObj('PPAFitService', [
      'getFit'
    ]);
    mockFitService.getFit.and.returnValue(of({}).toPromise());
    fitService = mockFitService;

    const ref = {};
    TestBed.configureTestingModule({
      declarations: [ PPAFitDialogComponent ],
      imports: [TSPlotModule, FormsModule],
      providers: [
        {provide: MAT_DIALOG_DATA, useValue: new PPAFitDialogComponentParams(1, '2', 3)},
        {provide: PPAFitService, useValue: fitService},
        {provide: MatDialogRef, useValue: ref}
        ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PPAFitDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
