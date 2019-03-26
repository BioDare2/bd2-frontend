
import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {MeasurementDescRFormComponent} from './measurement-desc-rform.component';
import {TechniqueService} from '../technique.service';
import {ReactiveFormsModule} from '@angular/forms';
import {TypeaheadModule} from 'ngx-bootstrap/typeahead';

describe('MeasurementDescRFormComponent', () => {
  let component: MeasurementDescRFormComponent;
  let fixture: ComponentFixture<MeasurementDescRFormComponent>;
  let techniqueService: TechniqueService;

  beforeEach(async(() => {
    techniqueService = jasmine.createSpyObj('techniqueService', ['getTechniques', 'getEquipments', 'getParameters']);
    (techniqueService as any).getTechniques.and.returnValue(Promise.resolve(['Luc', 'Tech1', 'Tech2']));
    (techniqueService as any).getEquipments.and.returnValue(Promise.resolve(['Eq1', 'Eq2']));

    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, TypeaheadModule],
      declarations: [MeasurementDescRFormComponent],
      providers: [
        {provide: TechniqueService, useValue: techniqueService},
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MeasurementDescRFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
