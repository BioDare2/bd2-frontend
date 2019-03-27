import {AssetType} from './asset-type';
import {AssetVersion} from './asset-version';

export class FileAsset {


  public id: number;
  public originalName: string;
  public assetType: AssetType = AssetType.NONE;
  public url: string;
  public versions: AssetVersion[] = [];

  get last(): AssetVersion {
    return this.versions[0];
  }


  static deserialize(other: any): FileAsset {

    const f = new FileAsset();
    f.id = other.id;
    f.originalName = other.originalName;
    f.url = other.url;
    f.assetType = AssetType.deserialize(other.assetType);

    if (other.versions) {
      f.versions = other.versions.map(v => AssetVersion.deserialize(v));
    }

    return f;
  }

  public setAll(other: any) {
    this.id = other.id;
    this.originalName = other.originalName;
    this.assetType = other.assetType;
    this.url = other.url;
    this.versions = other.versions;
  }
}
