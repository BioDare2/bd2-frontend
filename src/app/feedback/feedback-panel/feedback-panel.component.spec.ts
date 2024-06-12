import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import {FeedbackPanelComponent} from './feedback-panel.component';
import {MatLegacyCardModule as MatCardModule} from '@angular/material/legacy-card';
import {FeedbackListComponent} from '../feedback-list/feedback-list.component';

describe('FeedbackPanelComponent', () => {
  let component: FeedbackPanelComponent;
  let fixture: ComponentFixture<FeedbackPanelComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ FeedbackPanelComponent, FeedbackListComponent ],
      imports: [MatCardModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeedbackPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
