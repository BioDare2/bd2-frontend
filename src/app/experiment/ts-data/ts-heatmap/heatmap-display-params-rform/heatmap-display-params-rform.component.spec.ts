import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeatmapDisplayParamsRformComponent } from './heatmap-display-params-rform.component';

describe('HeatmapDisplayParamsRformComponent', () => {
  let component: HeatmapDisplayParamsRformComponent;
  let fixture: ComponentFixture<HeatmapDisplayParamsRformComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeatmapDisplayParamsRformComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeatmapDisplayParamsRformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
