import {TestBed} from '@angular/core/testing';

import {UserService} from './user.service';
import {RouterTestingModule} from '@angular/router/testing';
import {AnalyticsService} from '../analytics/analytics.service';
import {fakeAnalyticsService} from '../analytics/analytics_test_tool.spec';
import {BioDareRestService} from '../backend/biodare-rest.service';
import {fakeBioDareRestService} from '../backend/biodare-rest_test_tool.spec';

describe('UserService', () => {
  beforeEach(() => TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
      ],
      providers: [
        {provide: AnalyticsService, useValue: fakeAnalyticsService()},
        {provide: BioDareRestService, useValue: fakeBioDareRestService()}
      ]
    })
  );

  it('should be created', () => {
    const service: UserService = TestBed.get(UserService);
    expect(service).toBeTruthy();
  });
});
