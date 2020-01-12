import {async, TestBed} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {AppComponent} from './app.component';
import {PageModule} from './page/page.module';
import {FeedbackModule} from './feedback/feedback.module';
import {AnalyticsService} from './analytics/analytics.service';
import {BioDareRestService} from './backend/biodare-rest.service';
import {fakeAnalyticsService} from './analytics/analytics_test_tool.spec';
import {fakeBioDareRestService} from './backend/biodare-rest_test_tool.spec';
import {MatSidenavModule} from '@angular/material/sidenav';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        MatSidenavModule,
        FeedbackModule,
        PageModule
      ],
      declarations: [
        AppComponent
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
    expect(app.title).toEqual('Welcome to BioDare2!');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('BioDare2');
    // expect(compiled.querySelector('.content span').textContent).toContain('biodare2-ui app is running!');
  });
});
