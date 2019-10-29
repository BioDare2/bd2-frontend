import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {PPAStartFormComponent} from './ppa-start-form.component';
import {ExperimentsTestToolModule} from '../../experiment_test_tool.spec';
import {PPAJobParamsRFormComponent} from './ppajob-params-rform/ppajob-params-rform.component';
import {TSPlotModule} from '../../../tsdata/plots/ts-plot.module';
import {StaticContentTestModule} from '../../../documents/static-content_test_tool.spec';
import {MaterialsModule} from '../../../shared/materials.module';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';


describe('PPAStartFormComponent', () => {
  let component: PPAStartFormComponent;
  let fixture: ComponentFixture<PPAStartFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PPAStartFormComponent, PPAJobParamsRFormComponent],
      imports: [ExperimentsTestToolModule, StaticContentTestModule, TSPlotModule, MaterialsModule, NoopAnimationsModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PPAStartFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
