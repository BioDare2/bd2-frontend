import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import {PPAPhasePlotComponent} from './ppaphase-plot.component';
import {BD2NgxPolarplotModule} from "../../../../../../bd2-ngx-polarplot/bd2-ngx-polarplot.module";

describe('PPAPhasePlotComponent', () => {
  let component: PPAPhasePlotComponent;
  let fixture: ComponentFixture<PPAPhasePlotComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [BD2NgxPolarplotModule],
      declarations: [ PPAPhasePlotComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PPAPhasePlotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
