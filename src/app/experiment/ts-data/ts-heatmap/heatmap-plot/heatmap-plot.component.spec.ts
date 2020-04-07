import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeatmapPlotComponent } from './heatmap-plot.component';

describe('HeatmapPlotComponent', () => {
  let component: HeatmapPlotComponent;
  let fixture: ComponentFixture<HeatmapPlotComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeatmapPlotComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeatmapPlotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
