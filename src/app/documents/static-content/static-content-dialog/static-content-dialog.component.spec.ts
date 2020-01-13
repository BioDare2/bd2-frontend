import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StaticContentDialogComponent } from './static-content-dialog.component';

describe('StaticContentDialogComponent', () => {
  let component: StaticContentDialogComponent;
  let fixture: ComponentFixture<StaticContentDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StaticContentDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StaticContentDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
