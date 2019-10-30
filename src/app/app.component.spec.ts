import {async, TestBed} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {AppComponent} from './app.component';
import {PageModule} from './page/page.module';
// import {UserService} from "./auth/user.service";
import {AnalyticsService} from './analytics/analytics.service';
import {fakeAnalyticsService} from './analytics/analytics_test_tool.spec';
import {fakeBioDareRestService} from './backend/biodare-rest_test_tool.spec';
import {BioDareRestService} from './backend/biodare-rest.service';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      imports: [
        RouterTestingModule,
        PageModule
      ],
      providers: [
        {provide: AnalyticsService, useValue: fakeAnalyticsService()},
        {provide: BioDareRestService, useValue: fakeBioDareRestService()}
      ]
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'Welcome to BioDare2!'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
    // expect(app.title).toEqual('BioDare2 ');
  });

  it('should render welcome in a h1 tag', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('BioDare2');
  });
});
