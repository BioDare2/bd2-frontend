import {TestBed} from '@angular/core/testing';

import {FeedbackService} from './feedback.service';
import {FeedbackMessage} from './feedback.dom';

describe('FeedbackService', () => {
  let service: FeedbackService;
  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FeedbackService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('emits sent message', () => {

    let msg: FeedbackMessage;

    service.message$.subscribe(m => msg = m);

    service.info('a news');

    expect(msg).toBeDefined();
    expect(msg.message).toBe('a news');
    expect(msg.isInfo()).toBe(true);
  });
});
