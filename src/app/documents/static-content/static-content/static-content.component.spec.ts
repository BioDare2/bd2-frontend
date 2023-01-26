import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import {StaticContentComponent} from './static-content.component';
import {StaticContentService} from '../static-content.service';
import {CommonModule} from '@angular/common';

describe('StaticContentComponent', () => {
  let component: StaticContentComponent;
  let fixture: ComponentFixture<StaticContentComponent>;
  let contentService: jasmine.SpyObj<StaticContentService>;

  beforeEach(waitForAsync(() => {
    contentService = jasmine.createSpyObj('contentService', ['getDocs']);
    contentService.getDocs.and.returnValue(Promise.resolve('Interesting document'));

    TestBed.configureTestingModule({
      imports: [
        CommonModule,
      ],
      declarations: [StaticContentComponent],
      providers: [
        {provide: StaticContentService, useValue: contentService},
      ]

    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StaticContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
