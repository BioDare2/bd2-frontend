import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {TSSortParamsRFormComponent} from './tssort-params-rform.component';
import {ReactiveFormsModule} from '@angular/forms';
import {MaterialsModule} from '../../../shared/materials.module';

describe('TSSortParamsRFormComponent', () => {
  let component: TSSortParamsRFormComponent;
  let fixture: ComponentFixture<TSSortParamsRFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TSSortParamsRFormComponent ],
      imports: [ReactiveFormsModule, MaterialsModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TSSortParamsRFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
