import {Component, ViewChild} from '@angular/core';
import {ExperimentBaseComponent} from '../../experiment-base.component';
import {AttachmentsService} from '../attachments.service';
import {FileUploadWidgetComponent} from '../../../file-asset/file-upload-widget/file-upload-widget.component';
import {ExperimentalAssayView} from '../../../dom/repo/exp/experimental-assay-view';
import {FileAsset} from '../../../file-asset/dom/file-asset';
import {AssetType} from '../../../file-asset/dom/asset-type';
import {ExperimentComponentsDependencies} from '../../experiment-components.dependencies';

/**
 * Dashboard for managing file attachments to an experiment
 * 
 * Includes timeseries and other attachments
 */
@Component({
    templateUrl: './attachments-dashboard.component.html',
    styleUrls: ['./attachments-dashboard.component.css'],
    standalone: false
})
export class AttachmentsDashboardComponent extends ExperimentBaseComponent {

  @ViewChild('uploadWidget')
  uploadWidget: FileUploadWidgetComponent;

  attachments: FileAsset[] = [];
  tsData: FileAsset[] = [];

  blocked = false;

  constructor(
    private attachmentsService: AttachmentsService,
    serviceDependencies: ExperimentComponentsDependencies) {

    super(serviceDependencies);

    this.titlePart = ' Files';
  }

  /* Update the attachments list when a new experiment is provided */
  updateModel(exp: ExperimentalAssayView) {
    super.updateModel(exp);
    this.refreshAttachments();
  }

  /* Get the files for the current experiment and add them to this attachment list */
  refreshAttachments() {
    this.attachmentsService.getFiles(this.assay)
      .then(files => this.setFiles(files))
      .catch(err => {
        this.feedback.error(err);
      })
    ;
  }

  /* Add files to the timeseries and attachments lists */
  setFiles(files: FileAsset[]) {
    this.tsData = files.filter(f => f.assetType.equals(AssetType.TS_DATA));
    this.attachments = files.filter(f => !f.assetType.equals(AssetType.TS_DATA));
  }

  /* Upload files and refresh the current experiment */
  upload(files: File[]) {

    console.log('Uploading ' + files.length);
    if (!files || files.length === 0) {
      return;
    }

    this.blocked = true;

    this.attachmentsService.upload(this.assay, files)
      .then(res => {
        this.uploadWidget.reset();
        this.blocked = false;
        const s = res.length;
        this.feedback.success(s + ' files uploaded');
      })
      .then(() => this.refreshModel())
      .catch(err => {
        this.blocked = false;
        this.feedback.error(err);
      });

  }
}
