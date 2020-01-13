import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {ExperimentsTestToolModule} from '../../experiment_test_tool.spec';
import {TSPlotModule} from '../../../tsdata/plots/ts-plot.module';
import {StaticContentTestModule} from '../../../documents/static-content/static-content_test_tool.spec';
import {PPASelectPeriodsFormComponent} from './ppa-select-periods-form.component';
import {SelectableFitDialogComponent} from '../ppa-fit/selectable-fit-dialog.component';
import {RouterTestingModule} from '@angular/router/testing';


describe('PPASelectPeriodsFormComponent', () => {
  let component: PPASelectPeriodsFormComponent;
  let fixture: ComponentFixture<PPASelectPeriodsFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PPASelectPeriodsFormComponent, SelectableFitDialogComponent],
      imports: [ExperimentsTestToolModule, StaticContentTestModule, TSPlotModule,
        RouterTestingModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PPASelectPeriodsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
