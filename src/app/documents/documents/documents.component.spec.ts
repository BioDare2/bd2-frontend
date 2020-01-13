import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {DocumentsComponent} from './documents.component';
import {StaticContentComponent} from '../static-content/static-content.component';
import {StaticContentService} from '../static-content.service';
import {RouterTestingModule} from '@angular/router/testing';

describe('DocumentsComponent', () => {
  let component: DocumentsComponent;
  let fixture: ComponentFixture<DocumentsComponent>;
  let contentService: jasmine.SpyObj<StaticContentService>;

  beforeEach(async(() => {

    contentService = jasmine.createSpyObj('contentService', ['getDocs']);
    contentService.getDocs.and.returnValue(Promise.resolve('Interesting document'));

    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([]),
      ],
      declarations: [DocumentsComponent, StaticContentComponent],
      providers: [
        {provide: StaticContentService, useValue: contentService},
      ]

    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
