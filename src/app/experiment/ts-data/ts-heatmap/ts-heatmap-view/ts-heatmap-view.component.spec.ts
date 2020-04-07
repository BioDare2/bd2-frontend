import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TsHeatmapViewComponent } from './ts-heatmap-view.component';

describe('TsHeatmapViewComponent', () => {
  let component: TsHeatmapViewComponent;
  let fixture: ComponentFixture<TsHeatmapViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TsHeatmapViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TsHeatmapViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
