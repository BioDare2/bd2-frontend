import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {PPAJobExportDialogComponent} from './ppajob-export-dialog.component';
import {ModalModule} from 'ngx-bootstrap/modal';
import {FormsModule} from '@angular/forms';

describe('PPAJobExportDialogComponent', () => {
  let component: PPAJobExportDialogComponent;
  let fixture: ComponentFixture<PPAJobExportDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        ModalModule.forRoot()],
      declarations: [PPAJobExportDialogComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PPAJobExportDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
