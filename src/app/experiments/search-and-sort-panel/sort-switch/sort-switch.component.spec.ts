import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SortSwitchComponent } from './sort-switch.component';

describe('SortSwitchComponent', () => {
  let component: SortSwitchComponent;
  let fixture: ComponentFixture<SortSwitchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SortSwitchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SortSwitchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
