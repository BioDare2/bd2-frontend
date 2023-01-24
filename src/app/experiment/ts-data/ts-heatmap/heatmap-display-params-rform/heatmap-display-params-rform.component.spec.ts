import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import {HeatmapDisplayParamsRformComponent} from './heatmap-display-params-rform.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MaterialsModule} from '../../../../shared/materials.module';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {SimplePaginatorComponent} from "../simple-paginator/simple-paginator.component";

describe('HeatmapDisplayParamsRformComponent', () => {
  let component: HeatmapDisplayParamsRformComponent;
  let fixture: ComponentFixture<HeatmapDisplayParamsRformComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, ReactiveFormsModule, MaterialsModule, NoopAnimationsModule],
      declarations: [ HeatmapDisplayParamsRformComponent, SimplePaginatorComponent ]
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
