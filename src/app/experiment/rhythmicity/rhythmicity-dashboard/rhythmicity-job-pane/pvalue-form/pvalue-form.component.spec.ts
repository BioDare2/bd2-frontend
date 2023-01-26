import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import {PValueFormComponent} from './pvalue-form.component';
import {MatLegacyFormFieldModule as MatFormFieldModule} from '@angular/material/legacy-form-field';
import {MatLegacyRadioModule as MatRadioModule} from '@angular/material/legacy-radio';

describe('PValueFormComponent', () => {
  let component: PValueFormComponent;
  let fixture: ComponentFixture<PValueFormComponent>;

  beforeEach(waitForAsync(() => {
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
