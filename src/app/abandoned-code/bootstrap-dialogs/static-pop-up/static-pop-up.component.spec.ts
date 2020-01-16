import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {StaticPopUpComponent} from './static-pop-up.component';
import {StaticContentComponent} from '../../../documents/static-content/static-content/static-content.component';
import {StaticContentService} from '../../../documents/static-content/static-content.service';
import {CommonModule} from '@angular/common';
import {ModalModule} from 'ngx-bootstrap';


describe('StaticPopUpComponent', () => {
  let component: StaticPopUpComponent;
  let fixture: ComponentFixture<StaticPopUpComponent>;
  let contentService: jasmine.SpyObj<StaticContentService>;

  beforeEach(async(() => {
    contentService = jasmine.createSpyObj('contentService', ['getDocs']);
    (contentService as any).getDocs.and.returnValue(Promise.resolve('Interesting document'));

    TestBed.configureTestingModule({
      imports: [
        CommonModule,
        ModalModule.forRoot(),
      ],
      declarations: [StaticPopUpComponent, StaticContentComponent],
      providers: [
        {provide: StaticContentService, useValue: contentService},
      ]

    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StaticPopUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
