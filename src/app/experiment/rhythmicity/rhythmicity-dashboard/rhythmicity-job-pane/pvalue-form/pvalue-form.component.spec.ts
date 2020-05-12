import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {PValueFormComponent} from './pvalue-form.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatRadioModule} from '@angular/material/radio';

describe('PValueFormComponent', () => {
  let component: PValueFormComponent;
  let fixture: ComponentFixture<PValueFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PValueFormComponent ],
      imports: [    MatRadioModule,     MatFormFieldModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PValueFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
