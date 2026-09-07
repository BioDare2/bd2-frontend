import {Component, Input, OnInit, ChangeDetectionStrategy} from '@angular/core';
import {FileAsset} from '../dom/file-asset';
import {AnalyticsService} from '../../analytics/analytics.service';

@Component({
    selector: 'bd2-file-asset-view',
    template: `

@if (file && file.last) {
  <div>
    <div class="float-right">
      {{file.versions.length}} versions
      <a role="button" (click)="showVersions = !showVersions" aria-label="expand">
        <i class="material-icons bd-icon">expand_more</i>
        <!-- <span class="glyphicon glyphicon glyphicon-chevron-down" aria-hidden="true"></span> -->
      </a>
    </div>
    <h5>
      <a href="{{file.url}}" (click)="recordDownload()" download="{{file.last.originalName}}">{{file.last.originalName}}</a>
    </h5>
    @if (file.last.description) {
      <div>{{file.last.description}}</div>
    }
    @if (showVersions) {
      <div>
        <ul class="list-unstyled">
          @for (ver of file.versions; track ver; let i = $index) {
            <li>
              Version {{ver.versionId}}. {{ver.created.date | date:'shortDate'}}
              <strong><a href="{{ver.url}}" (click)="recordDownload()" download="{{ver.originalName}}">{{ver.originalName}}</a></strong>
              <br>{{ver.description}}
              </li>
            }
          </ul>
        </div>
      }
    </div>
  }
`,
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class FileAssetViewComponent implements OnInit {

  @Input()
  canEdit = true;
  @Input()
  parentId: string | number;
  file: FileAsset;
  showVersions = false;
  edit = false;

  constructor(private analytics: AnalyticsService, ) {

    this.model = this.fakeFileAsset();
  }

  @Input()
  set model(model: FileAsset) {
    this.file = model;
  }

  ngOnInit() {
  }

  fakeFileAsset(): FileAsset {

    const txt = `{
      "id" : 2,
      "originalName" : "f2",
      "assetType" : "TS_DATA",
      "versions" : [ {
        "versionId" : 2,
        "localFile" : "cos2",
        "originalName" : "f2",
        "contentType" : "txt",
        "description" : "Some description",
        "created" : [ 2016, 12, 8 ]
      }, {
        "versionId" : 1,
        "localFile" : "cos2",
        "originalName" : "f2",
        "contentType" : "txt",
        "description" : null,
        "created" : [ 2016, 12, 8 ]
      } ]
    }`;

    const json = JSON.parse(txt);

    const obj = FileAsset.deserialize(json);
    return obj;
  }

  recordDownload() {
    // console.log("File download");
    this.analytics.fileDownload(this.parentId.toString(), this.file.id);
  }

}
