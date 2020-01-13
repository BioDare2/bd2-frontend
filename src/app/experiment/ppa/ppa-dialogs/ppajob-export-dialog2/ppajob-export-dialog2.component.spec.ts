import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PPAJobExportDialog2Component } from './ppajob-export-dialog2.component';

describe('PPAJobExportDialog2Component', () => {
  let component: PPAJobExportDialog2Component;
  let fixture: ComponentFixture<PPAJobExportDialog2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PPAJobExportDialog2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PPAJobExportDialog2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
