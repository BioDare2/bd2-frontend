import {DataCategory} from './data-category';

/** Biological Summary
 * 
 * Represents a summary of biological metadata across multiple experiments.
 */
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

  /* Deserialise a JSON object to create an instance of BiologySummary */
  static deserialize(jsonObj: any): BiologySummary {

    jsonObj.dataCategories = jsonObj.dataCategories.map((c: any) => DataCategory.deserialize(c));
    return jsonObj;
  }
}
