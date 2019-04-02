import {TestBed} from '@angular/core/testing';
import {BioDareRestService} from './biodare-rest.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {HttpClient} from '@angular/common/http';
import {BioDareEndPoints, bioDareRestConfigurator} from './biodare-rest.dom';


describe('BioDareRestService', () => {

  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let service: BioDareRestService;
  const backendUrl = 'http://localhost:9000/api';
  const endPoints: BioDareEndPoints = bioDareRestConfigurator({backendUrl});

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        {provide: BioDareEndPoints, useValue: endPoints}
      ]
    });

    httpClient = TestBed.get(HttpClient);
    httpTestingController = TestBed.get(HttpTestingController);
    service = TestBed.get(BioDareRestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('logins', () => {

    const respData = {
      firstName: 'Test',
      lastName: 'User',
      institution: 'University of Edinburgh',
      anonymous: false,
      login: 'test',
      email: 'biodare@ed.ac.uk'
    };

    service.login('test', 'password')
      .subscribe(
        data => {

          expect(data).toBeDefined();
          expect(data.login).toEqual('test');
          expect(data.anonymous).toBe(false);
        }
      );

    const req = httpTestingController.expectOne(endPoints.login_url);
    expect(req.request.method).toEqual('GET');
    req.flush(respData);
    httpTestingController.verify();
  });

  it('login handles errors', () => {

    service.login('test', 'password')
      .subscribe(
        data => fail('should have failed with the 401 error'),
        (error: string) => {
          expect(error).toEqual('Bad credentials, locked or not activated account');
        }
      );

    const req = httpTestingController.expectOne(endPoints.login_url);
    expect(req.request.method).toEqual('GET');
    req.flush('', {status: 401, statusText: 'Not Authorized'});
    httpTestingController.verify();
  });

  it('logouts', () => {

    const respData = {message: 'test is logged out'};

    service.logout()
      .subscribe(
        data => expect(data).toEqual(true)
      );

    const req = httpTestingController.expectOne(endPoints.logout_url);
    expect(req.request.method).toEqual('POST');
    req.flush(respData);
    httpTestingController.verify();
  });

  it('logout handles errors', () => {

    const respData = {message: 'Not logged'};

    service.logout()
      .subscribe(
        data => fail('should have failed with the 404 error'),
        (error: string) => {
          expect(error).toEqual(respData.message);
        }
      );

    const req = httpTestingController.expectOne(endPoints.logout_url);
    expect(req.request.method).toEqual('POST');
    req.flush(respData, {status: 404, statusText: 'Not Found'});
    httpTestingController.verify();
  });

  it('logout handles network errors', () => {

    const emsg = 'simulated network error';
    const mockError = new ErrorEvent('Network error', {
      message: emsg,
    });

    service.logout()
      .subscribe(
        data => fail('should have failed with the Network error'),
        (error: string) => {
          expect(error).toEqual(emsg);
        }
      );

    const req = httpTestingController.expectOne(endPoints.logout_url);
    expect(req.request.method).toEqual('POST');
    req.error(mockError);
    httpTestingController.verify();
  });

  it('species gives list of species', () => {

    const respData = ['Species1', 'Last One'];

    service.species()
      .subscribe(
        data => {

          expect(data).toBeDefined();
          expect(data).toEqual(['Species1', 'Last One']);
        }
      );

    const req = httpTestingController.expectOne(endPoints.ontology_species_url);
    expect(req.request.method).toEqual('GET');
    req.flush(respData);
    httpTestingController.verify();
  });

});
