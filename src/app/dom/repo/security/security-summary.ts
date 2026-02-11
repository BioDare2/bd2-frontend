/**
 * Security parameters for an experiment
 * 
 * Defines if the current user can read/write the experiment
 * and if the user is owner/super-owner of the experiment
 */
export class SecuritySummary {

  canRead: boolean;
  canWrite: boolean;
  isOwner: boolean;
  isSuperOwner: boolean;

  static deserialize(jsonObj: any): SecuritySummary {

    const obj = new SecuritySummary();
    obj.canRead = jsonObj.canRead;
    obj.canWrite = jsonObj.canWrite;
    obj.isOwner = jsonObj.isOwner;
    obj.isSuperOwner = jsonObj.isSuperOwner;
    return obj;
  }
}
