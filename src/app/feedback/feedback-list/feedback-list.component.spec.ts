import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {FeedbackListComponent} from './feedback-list.component';
import {FeedbackService} from '../feedback.service';
import { MatCardModule } from '@angular/material/card';

describe('FeedbackListComponent', () => {
  let component: FeedbackListComponent;
  let fixture: ComponentFixture<FeedbackListComponent>;
  let feedbackService: FeedbackService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FeedbackListComponent],
      imports: [MatCardModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeedbackListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    feedbackService = TestBed.get(FeedbackService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('retrieves messages from service', () => {
    expect(component.messages).toEqual([]);

    feedbackService.info('Hola');
    fixture.detectChanges();

    expect(component.messages.length).toBe(1);
    expect(component.messages[0].message).toBe('Hola');

  });


});
