import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TSSortParamsRFormComponent } from './tssort-params-rform.component';

describe('TssortParamsRformComponent', () => {
  let component: TSSortParamsRFormComponent;
  let fixture: ComponentFixture<TSSortParamsRFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TSSortParamsRFormComponent ]
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
