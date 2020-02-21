import {TestBed} from '@angular/core/testing';
import {StaticContentService} from './static-content.service';
import {HttpClient} from '@angular/common/http';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';

describe('StaticContentService', () => {

  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let service: StaticContentService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ]
    });

    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(StaticContentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

});
