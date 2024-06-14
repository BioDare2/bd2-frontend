import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import {Bd2NumHeatmapComponent} from './bd2-num-heatmap.component';

describe('Bd2NumHeatmapComponent', () => {
  let component: Bd2NumHeatmapComponent;
  let fixture: ComponentFixture<Bd2NumHeatmapComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ Bd2NumHeatmapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Bd2NumHeatmapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
