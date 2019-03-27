import {LocalDate} from '../../dom/repo/shared/dates';

export class AssetVersion {

  public versionId: number;
  public localFile: string;
  public originalName: string;
  public contentType: string;
  public description: string;
  public created: LocalDate;
  public url: string;

  static deserialize(other: any): AssetVersion {

    other.created = LocalDate.deserialize(other.created);
    return other;
  }
}
