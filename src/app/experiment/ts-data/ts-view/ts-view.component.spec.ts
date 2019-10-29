import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ExperimentsTestToolModule} from '../../experiment_test_tool.spec';
import {TSViewComponent} from './ts-view.component';
import {TSPlotModule} from '../../../tsdata/plots/ts-plot.module';
import {MaterialsModule} from '../../../shared/materials.module';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';

describe('TSViewComponent', () => {
  let component: TSViewComponent;
  let fixture: ComponentFixture<TSViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TSViewComponent],
      imports: [ExperimentsTestToolModule, TSPlotModule, MaterialsModule, NoopAnimationsModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TSViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
