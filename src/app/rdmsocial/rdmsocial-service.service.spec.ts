import {fakeAsync, TestBed, tick} from '@angular/core/testing';
import {RDMSocialServiceService} from './rdmsocial-service.service';
import {BioDareRestService} from '../backend/biodare-rest.service';
import {ExperimentalAssayView} from '../dom/repo/exp/experimental-assay-view';
import {fakeBioDareRestService} from '../backend/biodare-rest_test_tool.spec';
import {SecuritySummary} from '../dom/repo/security/security-summary';
import {RDMAssayGUIAspects} from './rdmsocial.dom';

describe('RDMSocialServiceService', () => {

  let BD2REST: jasmine.SpyObj<BioDareRestService>;
  let assay: ExperimentalAssayView;
  let service: RDMSocialServiceService;

  beforeEach(() => {
    assay = new ExperimentalAssayView();
    assay.security = new SecuritySummary();
    assay.security.canRead = true;
    assay.security.canWrite = true;
    assay.security.isOwner = true;

    assay.id = 2;


    TestBed.configureTestingModule({
      providers: [
        {provide: BioDareRestService, useValue: fakeBioDareRestService()}
      ]
    });
    service = TestBed.get(RDMSocialServiceService);
    BD2REST = TestBed.get(BioDareRestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });


  it('should return gui aspects from the backend', fakeAsync(() => {

    const exp = new RDMAssayGUIAspects();
    (BD2REST as any).rdmAssayGuiAspects.and.returnValue(Promise.resolve(exp));

    let aspect: RDMAssayGUIAspects;

    service.getAssayGuiAspects(assay)
      .then(res => aspect = res);

    tick();
    expect(aspect).toBeDefined();
    expect(aspect).toBe(exp);
  }));

  it('should mark as visited when retrieve gui aspects', fakeAsync(() => {

    const exp = new RDMAssayGUIAspects();
    (BD2REST as any).rdmAssayGuiAspects.and.returnValue(Promise.resolve(exp));

    expect(service.visited.has(assay.id)).toBe(false);

    let aspect: RDMAssayGUIAspects;

    service.getAssayGuiAspects(assay)
      .then(res => aspect = res);

    tick();
    expect(aspect).toBe(exp);
    expect(service.visited.has(assay.id)).toBe(true);

  }));

  it('should not require warnings if already visited', fakeAsync(() => {

    const exp = new RDMAssayGUIAspects();
    exp.showMeasurementWarning = true;

    (BD2REST as any).rdmAssayGuiAspects.and.returnValue(Promise.resolve(exp));

    service.visited.add(assay.id);
    expect(service.visited.has(assay.id)).toBe(true);

    let should: boolean;

    service.shouldShowMeasurementWarning(assay)
      .then(resp => should = resp);

    tick();
    expect(should).toBe(false);

  }));

  it('should return warning status from not visited', fakeAsync(() => {

    const exp = new RDMAssayGUIAspects();
    exp.showMeasurementWarning = true;

    (BD2REST as any).rdmAssayGuiAspects.and.returnValue(Promise.resolve(exp));

    expect(service.visited.has(assay.id)).toBe(false);

    let should: boolean;

    service.shouldShowMeasurementWarning(assay)
      .then(resp => should = resp);

    tick();
    expect(should).toBe(true);

    service.visited.clear();
    expect(service.visited.has(assay.id)).toBe(false);
    exp.showMeasurementWarning = false;
    (BD2REST as any).rdmAssayGuiAspects.and.returnValue(Promise.resolve(exp));

    service.shouldShowMeasurementWarning(assay)
      .then(resp => should = resp);

    tick();
    expect(should).toBe(false);

  }));

  it('subsequent call to show warnings returns false', fakeAsync(() => {

    const exp = new RDMAssayGUIAspects();
    exp.showMeasurementWarning = true;

    (BD2REST as any).rdmAssayGuiAspects.and.returnValue(Promise.resolve(exp));
    expect(service.visited.has(assay.id)).toBe(false);

    let should: boolean;

    service.shouldShowMeasurementWarning(assay)
      .then(resp => should = resp);

    tick();
    expect(should).toBe(true);

    (BD2REST as any).rdmAssayGuiAspects.and.returnValue(Promise.resolve(exp));
    service.shouldShowMeasurementWarning(assay)
      .then(resp => should = resp);

    tick();
    expect(should).toBe(false);

  }));

  it('should mark as visited when registering new', fakeAsync(() => {


    expect(service.visited.has(assay.id)).toBe(false);

    service.registerNewAssay(assay);

    expect(service.visited.has(assay.id)).toBe(true);

  }));

  it('showwarnings should shortuct if not an owner', fakeAsync(() => {

    const exp = new RDMAssayGUIAspects();
    exp.showMeasurementWarning = true;

    assay.security.isOwner = false;

    (BD2REST as any).rdmAssayGuiAspects.and.returnValue(Promise.resolve(exp));
    expect(service.visited.has(assay.id)).toBe(false);

    let should: boolean;

    service.shouldShowMeasurementWarning(assay)
      .then(resp => should = resp);

    tick();
    expect(should).toBe(false);

    expect(BD2REST.rdmAssayGuiAspects).not.toHaveBeenCalled();
  }));

  it('canProceed should shortuct if not an owner', fakeAsync(() => {

    const exp = new RDMAssayGUIAspects();
    exp.canProceedByMeasurement = false;

    assay.security.isOwner = false;

    (BD2REST as any).rdmAssayGuiAspects.and.returnValue(Promise.resolve(exp));
    expect(service.visited.has(assay.id)).toBe(false);

    let should: boolean;

    service.canProceedByMeasurement(assay)
      .then(resp => should = resp);

    tick();
    expect(should).toBe(true);

    expect(BD2REST.rdmAssayGuiAspects).not.toHaveBeenCalled();
  }));

  it('canProceed should returns value from the rest point', fakeAsync(() => {

    const exp = new RDMAssayGUIAspects();
    exp.canProceedByMeasurement = false;

    (BD2REST as any).rdmAssayGuiAspects.and.returnValue(Promise.resolve(exp));

    let should: boolean;

    service.canProceedByMeasurement(assay)
      .then(resp => should = resp);

    tick();
    expect(should).toBe(false);
    expect(BD2REST.rdmAssayGuiAspects).toHaveBeenCalled();

    exp.canProceedByMeasurement = true;
    // (<any>BD2REST).rdmAssayGuiAspects.and.returnValue(Promise.resolve(exp) );
    service.canProceedByMeasurement(assay)
      .then(resp => should = resp);

    tick();
    expect(should).toBe(true);

  }));

  it('registerMeasurementWarning calls the rest point', fakeAsync(() => {

    (BD2REST as any).rdmRegisterWarning.and.returnValue(Promise.resolve(true));

    let should: boolean;
    service.registerMeasurementWarning(assay);

    tick();
    expect(BD2REST.rdmRegisterWarning).toHaveBeenCalledWith(assay.id, 'MEASUREMENT');


  }));


});
