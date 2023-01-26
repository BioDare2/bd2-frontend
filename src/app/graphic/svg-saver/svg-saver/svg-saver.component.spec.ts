import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import {SVGSaverComponent} from './svg-saver.component';

describe('SVGSaverComponent', () => {
  let component: SVGSaverComponent;
  let fixture: ComponentFixture<SVGSaverComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [SVGSaverComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SVGSaverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
