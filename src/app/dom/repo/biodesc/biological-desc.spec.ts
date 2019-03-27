import {BiologicalDescription} from './biological-desc';
import {DataCategory} from './data-category';

describe('BiologicalDescription', () => {


  it('correctly deserializes', () => {

    const jsonTxt = `

{
    "bios" : [ {
      "fullHash" : "306547189f71a27a7b981f0f22eb07d5",
      "dataCategory" : "NONE",
      "label" : "",
      "species" : "",
      "ecotype" : "",
      "genotype" : "toc1",
      "marker" : "",
      "line" : "",
      "growthStage" : "",
      "tagType" : "",
      "materialType" : "",
      "materialOrigin" : "",
      "customTags" : [ ],
      "parameters" : { },
      "externalIds" : { }
    }, {
      "fullHash" : "d44c9eda9f8f40677c81840b68b76dbf",
      "dataCategory" : "NONE",
      "label" : "",
      "species" : "",
      "ecotype" : "",
      "genotype" : "WT",
      "marker" : "",
      "line" : "",
      "growthStage" : "",
      "tagType" : "",
      "materialType" : "",
      "materialOrigin" : "",
      "customTags" : [ ],
      "parameters" : { },
      "externalIds" : { }
    } ]
  }

`;

    const jsonObj = JSON.parse(jsonTxt);

    const ans = BiologicalDescription.deserialize(jsonObj);
    expect(ans).toBeDefined();
    expect(ans.constructor).toBe(BiologicalDescription);
    expect(ans.bios.length).toBe(2);
    // bioinfo stays simple json
    /*ans.bios.forEach(b => {
      expect( b instanceof BiologicalInfo).toBeTruthy();
    });*/
    ans.bios.forEach(b => {
      expect(b.dataCategory.constructor).toBe(DataCategory);
    });
  });

});
