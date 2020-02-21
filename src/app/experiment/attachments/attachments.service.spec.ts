import {AttachmentsService} from './attachments.service';
import {BioDareRestService} from '../../backend/biodare-rest.service';
import {TestBed} from '@angular/core/testing';
import {fakeBioDareRestService} from '../../backend/biodare-rest_test_tool.spec';
import {FileAsset} from '../../file-asset/dom/file-asset';
import {ExperimentalAssayView} from '../../dom/repo/exp/experimental-assay-view';

describe('AttachemtnsService', () => {

  let service: AttachmentsService;
  let BD2REST: jasmine.SpyObj<BioDareRestService>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        {provide: BioDareRestService, useValue: fakeBioDareRestService()}
      ]

    });

    service = TestBed.inject(AttachmentsService);
    BD2REST = TestBed.inject(BioDareRestService)  as any;

  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });


  it('fillURLs sets the file and versions urls', () => {

    /*BD2REST.fileURL = function f(exp: ExperimentalAssayView, id: any): string {
      return 'exp/file/' + id;
    };*/

    let files = fakeFileAssets();

    const exp = new ExperimentalAssayView();
    exp.id = 13;
    files = service.fillURLs(files, exp);

    expect(files.length).toBe(2);

    files.forEach(file => {

      expect(file.url).toBeDefined();
      file.versions.forEach(ver => {
        expect(ver.url).toBeDefined();
      });
    });

  });


  it('fillURL sets the file and versions urls', () => {

    /*BD2REST.fileURL = function f(exp: ExperimentalAssayView, id: any): string {
      return 'exp/file/' + id;
    };*/

    let file = fakeFileAssets()[0];
    file.id = 2;
    expect(file.versions.length).toBe(2);

    const exp = new ExperimentalAssayView();
    exp.id = 13;
    file = service.fillURL(file, exp);
    expect(file.url).toBe('exp/file/2');

    file.versions.forEach(ver => {
      expect(ver.url).toEqual('exp/file/2/' + ver.versionId);
    });

  });


  function fakeFileAssets(): FileAsset[] {

    let txt = `{
      "id" : 2,
      "originalName" : "f2",
      "assetType" : "TS_DATA",
      "versions" : [ {
        "versionId" : 2,
        "localFile" : "cos2",
        "originalName" : "f2",
        "contentType" : "txt",
        "description" : "Some description",
        "created" : [ 2016, 12, 8 ]
      }, {
        "versionId" : 1,
        "localFile" : "cos2",
        "originalName" : "f2",
        "contentType" : "txt",
        "description" : null,
        "created" : [ 2016, 12, 8 ]
      } ]
    }`;

    let json = JSON.parse(txt);
    const obj1 = FileAsset.deserialize(json);

    txt = `{
      "id" : 3,
      "originalName" : "Attachemtn1",
      "assetType" : "FILE",
      "versions" : [ {
        "versionId" : 2,
        "localFile" : "cos2",
        "originalName" : "Attachemtn1",
        "contentType" : "txt",
        "description" : "Some description",
        "created" : [ 2016, 12, 8 ]
      }, {
        "versionId" : 1,
        "localFile" : "cos2",
        "originalName" : "Attachemtn1",
        "contentType" : "txt",
        "description" : null,
        "created" : [ 2016, 12, 8 ]
      } ]
    }`;

    json = JSON.parse(txt);
    const obj2 = FileAsset.deserialize(json);
    return [obj1, obj2];
  }

});
