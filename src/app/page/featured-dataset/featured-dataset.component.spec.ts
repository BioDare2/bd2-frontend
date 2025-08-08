import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { of } from 'rxjs';

import { FeaturedDatasetComponent } from './featured-dataset.component';
import { FeaturedDatasetService } from './featured-dataset.service';
import { ExperimentalAssayView } from '../../dom/repo/exp/experimental-assay-view';
import { Trace } from '../../tsdata/plots/ts-plot.dom';

// Mock service
class MockFeaturedDatasetService {
  loadFeaturedExperiment = jasmine.createSpy('loadFeaturedExperiment');
  previewTraces = jasmine.createSpy('previewTraces');
  experiment = jasmine.createSpy('experiment');
}

describe('FeaturedDatasetComponent', () => {
  let component: FeaturedDatasetComponent;
  let fixture: ComponentFixture<FeaturedDatasetComponent>;
  let service: MockFeaturedDatasetService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FeaturedDatasetComponent],
      providers: [{ provide: FeaturedDatasetService, useClass: MockFeaturedDatasetService }],
      schemas: [CUSTOM_ELEMENTS_SCHEMA] // suppress unknown bd2-ts-plots
    }).compileComponents();

    fixture = TestBed.createComponent(FeaturedDatasetComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(FeaturedDatasetService) as unknown as MockFeaturedDatasetService;

    service.loadFeaturedExperiment.and.returnValue(Promise.resolve({
      id: 0,
      contributionDesc: { authors: [], institutions: [] },
      generalDesc: { name: '' },
      dataCategory: { shortName: '' }
    }));
    service.previewTraces.and.returnValue(of([]));
  });

  it('should create', fakeAsync(() => {
    fixture.detectChanges();
    tick();
    expect(component).toBeTruthy();
  }));

  it('fetchFeaturedDataset should load dataset, authors, affiliations and preview traces', fakeAsync(() => {
    const rawResponse: any = { some: 'raw' };

    const deserialized = Object.assign(new ExperimentalAssayView(), {
      id: 123,
      contributionDesc: {
        authors: [
          { firstName: 'John', lastName: 'Doe' },
          { firstName: 'Jane', lastName: 'Roe' }
        ],
        institutions: [{ name: 'Inst1' }, { name: 'Inst2' }]
      },
      generalDesc: { name: 'Sample' },
      dataCategory: { shortName: 'EXPR_REPR' }
    }) as ExperimentalAssayView;

    spyOn(ExperimentalAssayView, 'deserialize').and.returnValue(deserialized);


    const fakeTraces: Trace[] = [{ label: 'T1', fill: false, data: [], min: 0, max: 0, mean: 0 }];
    service.loadFeaturedExperiment.and.returnValue(Promise.resolve(rawResponse));
    service.previewTraces.and.returnValue(of(fakeTraces));

    fixture.detectChanges();
    tick();
    tick();
    fixture.detectChanges();

    expect(service.loadFeaturedExperiment).toHaveBeenCalled();
    expect(ExperimentalAssayView.deserialize).toHaveBeenCalledWith(rawResponse);
    expect(service.previewTraces).toHaveBeenCalledWith(123);
    expect(component.featuredDataset).toBe(deserialized);
    expect(component.authors).toBe('John Doe, Jane Roe');
    expect(component.affiliations).toBe('Inst1, Inst2');
    expect(component.previewTraces).toEqual(fakeTraces);
  }));
});
