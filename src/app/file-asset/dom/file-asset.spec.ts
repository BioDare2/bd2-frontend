import {FileAsset} from './file-asset';
import {AssetType} from './asset-type';

describe('FileAsset', () => {

  it('Deserializes rest value', () => {

    const txt = `{
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

    const json = JSON.parse(txt);

    const obj = FileAsset.deserialize(json);
    expect(obj.constructor).toBe(FileAsset);

    expect(obj.id).toBe(2);
    expect(obj.originalName).toBe('f2');
    expect(obj.assetType).toBe(AssetType.TS_DATA);
    expect(obj.versions.length).toBe(2);
    expect(obj.versions[0].versionId).toBe(2);
    expect(obj.versions[0].description).toBe('Some description');
    expect(obj.versions[0].created.date).toEqual(new Date(2016, 11, 8));
  });

});
