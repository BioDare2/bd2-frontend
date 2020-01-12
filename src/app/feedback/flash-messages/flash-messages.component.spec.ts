import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlashMessagesComponent } from './flash-messages.component';

describe('FlashMessagesComponent', () => {
  let component: FlashMessagesComponent;
  let fixture: ComponentFixture<FlashMessagesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlashMessagesComponent ]
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
