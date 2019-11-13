import {fakeAsync, TestBed, tick} from '@angular/core/testing';
import {SpeciesService} from './species.service';
import {BioDareRestService} from '../../../backend/biodare-rest.service';
import {fakeBioDareRestService} from '../../../backend/biodare-rest_test_tool.spec';
import {of} from 'rxjs/internal/observable/of';

describe('SpeciesService', () => {
  let service: SpeciesService;
  let BD2REST: jasmine.SpyObj<BioDareRestService>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        {provide: BioDareRestService, useValue: fakeBioDareRestService()}
      ]
    });

    BD2REST = TestBed.get(BioDareRestService);
    BD2REST.species.and.returnValue(of([]));
    service = TestBed.get(SpeciesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('provides the initial species without a connection', () => {

    service.species()
      .then(s => {
        expect(s).toBeDefined();
        expect(s.length).toBeGreaterThan(2);
      })
      .catch(e => fail('Got error ' + e));
  });

  it('fetchSpecies gets the values from the backend', fakeAsync(() => {

    const list = ['Spec1', 'Spec2'];

    service.species().then( s => expect(s).not.toEqual(list));

    BD2REST.species.and.returnValue(of(list));

    tick();
    service.fetchSpecies().subscribe(
      spec => {
        expect(spec).toBe(list);
        service.species().then( s => expect(s).toEqual(list));
      }
    );
    tick();



  }));


});
