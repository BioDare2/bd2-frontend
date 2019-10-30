export class ExperimentalFeatures {

  hasAttachments: boolean;
  hasTSData: boolean;
  hasPPAJobs: boolean;
  hasRhythmicityJobs: boolean;
  hasDataFiles: boolean;
  attachmentsSize: number;
  isOpenAccess: boolean;
  licence: string;

  static deserialize(jsonObj: any): ExperimentalFeatures {

    const obj = new ExperimentalFeatures();
    obj.hasTSData = jsonObj.hasTSData;
    obj.hasPPAJobs = jsonObj.hasPPAJobs;
    obj.hasRhythmicityJobs = jsonObj.hasRhythmicityJobs;
    obj.hasDataFiles = jsonObj.hasDataFiles;
    obj.hasAttachments = jsonObj.hasAttachments;
    obj.attachmentsSize = jsonObj.attachmentsSize;
    obj.isOpenAccess = jsonObj.isOpenAccess;
    obj.licence = jsonObj.licence;
    return obj;
  }
}
