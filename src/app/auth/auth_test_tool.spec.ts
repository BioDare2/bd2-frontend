import {UserService} from './user.service';
import {BD2User} from './user.dom';
import {FeedbackService} from '../feedback/feedback.service';
import {fakeAnalyticsService} from '../analytics/analytics_test_tool.spec';
import {fakeBioDareRestService} from '../backend/biodare-rest_test_tool.spec';


export class MockUserService extends UserService {

  // feedbackService: jasmine.SpyObj<FeedbackService>;
  // analyticsService: jasmine.SpyObj<AnalyticsService>;

  constructor() {

    super(
      fakeBioDareRestService(),
      fakeAnalyticsService(),
      jasmine.createSpyObj('FeedbackService', ['info', 'success', 'error'])
    );

  }

  public setUser(user: BD2User) {
    super.setUser(user);
  }
}


export function fakeUserService() {

  return new MockUserService();

}
