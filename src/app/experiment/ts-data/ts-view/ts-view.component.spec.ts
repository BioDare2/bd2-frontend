import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ExperimentsTestToolModule} from '../../experiment_test_tool.spec';
import {TSViewComponent} from './ts-view.component';
import {TSPlotModule} from '../../../tsdata/plots/ts-plot.module';

describe('TSViewComponent', () => {
  let component: TSViewComponent;
  let fixture: ComponentFixture<TSViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TSViewComponent],
      imports: [ExperimentsTestToolModule, TSPlotModule]
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
