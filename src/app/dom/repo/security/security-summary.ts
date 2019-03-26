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
