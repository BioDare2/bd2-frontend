import {DataCategory} from './data-category';

/**
 * Biological Information
 * 
 * Represents biological metadata associated with an experiment.
 */
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

  /* Deserialise a JSON object to create an instance of BiologicalInfo */
  static deserialize(jsonObj: any): BiologicalInfo {

    jsonObj.dataCategory = DataCategory.deserialize(jsonObj.dataCategory);
    return jsonObj;
  }

  /* Create a clone of the BiologicalInfo instance with the same attributes */
  clone(): BiologicalInfo {
    const txt = JSON.stringify(this);
    return BiologicalInfo.deserialize(JSON.parse(txt));
  }
}
