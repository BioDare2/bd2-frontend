import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeatmapDisplayParamsRformComponent } from './heatmap-display-params-rform.component';
import {ReactiveFormsModule} from '@angular/forms';
import {MaterialsModule} from '../../../../shared/materials.module';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';

describe('HeatmapDisplayParamsRformComponent', () => {
  let component: HeatmapDisplayParamsRformComponent;
  let fixture: ComponentFixture<HeatmapDisplayParamsRformComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, MaterialsModule, NoopAnimationsModule],
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
