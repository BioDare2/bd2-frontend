import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {FeedbackPanelComponent} from './feedback-panel.component';
import { MatCardModule } from '@angular/material/card';
import {FeedbackListComponent} from '../feedback-list/feedback-list.component';

describe('FeedbackPanelComponent', () => {
  let component: FeedbackPanelComponent;
  let fixture: ComponentFixture<FeedbackPanelComponent>;

  beforeEach(async(() => {
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
