import {DataCategory} from './data-category';

export class BiologySummary {

  dataCategories: DataCategory[];
  labels: string[];
  species: string[];
  ecotypes: string[];
  genotypes: string[];
  markers: string[];
  lines: string[];
  growthStages: string[];
  tagTypes: string[];
  materialTypes: string[];
  materialOrigins: string[];
  customTags: string[];
  dataSetSize: number;
  avgReplicates: number;

  static deserialize(jsonObj: any): BiologySummary {

    jsonObj.dataCategories = jsonObj.dataCategories.map((c: any) => DataCategory.deserialize(c));
    return jsonObj;
  }

}
