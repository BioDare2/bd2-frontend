import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import {TsHeatmapViewComponent} from './ts-heatmap-view.component';
import {ExperimentsTestToolModule} from '../../../experiment_test_tool.spec';
import {MaterialsModule} from '../../../../shared/materials.module';

describe('TsHeatmapViewComponent', () => {
  let component: TsHeatmapViewComponent;
  let fixture: ComponentFixture<TsHeatmapViewComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [ExperimentsTestToolModule, MaterialsModule],
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
