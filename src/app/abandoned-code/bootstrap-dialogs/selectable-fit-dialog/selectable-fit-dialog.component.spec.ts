import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {SelectableFitDialogComponent} from './selectable-fit-dialog.component';
import {PPAFitService} from '../../../experiment/ppa/ppa-fit/ppa-fit.service';
import {ModalModule} from 'ngx-bootstrap/modal';
import {TSPlotModule} from '../../../tsdata/plots/ts-plot.module';
import {FormsModule} from '@angular/forms';


describe('SelectableFitDialogComponent', () => {
  let component: SelectableFitDialogComponent;
  let fixture: ComponentFixture<SelectableFitDialogComponent>;
  let fitService: PPAFitService;

  beforeEach(async(() => {
    fitService = {} as any;

    TestBed.configureTestingModule({
      imports: [ModalModule.forRoot(), TSPlotModule, FormsModule],
      declarations: [SelectableFitDialogComponent],
      providers: [
        {provide: PPAFitService, useValue: fitService},
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectableFitDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
