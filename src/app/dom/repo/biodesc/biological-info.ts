import {DataCategory} from './data-category';

export class BiologicalInfo {

  id: number;
  fullHash: string;
  dataCategory: DataCategory;
  label: string;
  species: string;
  ecotype: string;
  genotype: string;
  marker: string;
  line: string;
  growthStage: string;
  tagType: string;
  materialType: string;
  materialOrigin: string;
  customTags: string[];
  parameters: any;

  static deserialize(jsonObj: any): BiologicalInfo {

    jsonObj.dataCategory = DataCategory.deserialize(jsonObj.dataCategory);
    return jsonObj;
  }

  clone(): BiologicalInfo {
    const txt = JSON.stringify(this);
    return BiologicalInfo.deserialize(JSON.parse(txt));
  }

}
