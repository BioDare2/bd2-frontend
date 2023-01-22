import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {FlashMessagesComponent} from './flash-messages.component';

describe('FlashMessagesComponent', () => {
  let component: FlashMessagesComponent;
  let fixture: ComponentFixture<FlashMessagesComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ FlashMessagesComponent ],
      imports: [MatSnackBarModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlashMessagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
