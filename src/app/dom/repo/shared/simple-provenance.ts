import {LocalDateTime} from './dates';

/**
 * Provenance information for an experiment.
 * 
 * Includes date and user information for creation and last modification.
 */
export class SimpleProvenance {

  created: LocalDateTime;
  createdBy: string;
  modified: LocalDateTime;
  modifiedBy: string;

  static deserialize(jsonObj: any): SimpleProvenance {
    const obj = new SimpleProvenance();
    obj.created = LocalDateTime.deserialize(jsonObj.created);
    obj.createdBy = jsonObj.createdBy;
    obj.modified = LocalDateTime.deserialize(jsonObj.modified);
    obj.modifiedBy = jsonObj.modifiedBy;

    return obj;
  }
}
