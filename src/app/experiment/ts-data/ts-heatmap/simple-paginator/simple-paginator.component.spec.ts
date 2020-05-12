import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {SimplePaginatorComponent} from './simple-paginator.component';

describe('SimplePaginatorComponent', () => {
  let component: SimplePaginatorComponent;
  let fixture: ComponentFixture<SimplePaginatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SimplePaginatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SimplePaginatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
