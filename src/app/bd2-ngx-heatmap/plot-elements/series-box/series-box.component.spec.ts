import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import {SeriesBoxComponent} from './series-box.component';

describe('SeriesBoxComponent', () => {
  let component: SeriesBoxComponent;
  let fixture: ComponentFixture<SeriesBoxComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [SeriesBoxComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeriesBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
