import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {FileAssetService} from '../file-asset-service';
import {FeedbackService} from '../../feedback/feedback.service';
import {FileAsset} from '../dom/file-asset';

@Component({
  selector: 'bd2-file-asset-upload',
  template: `




  <div>
    <form #faUploadForm="ngForm">
      <div class="form-group">
        <label for="fFile">File</label>
        <input type="file" class="form-control" id="fFile" required name="fFile" #fFile [(ngModel)]="file">
      </div>
      <div class="form-group">
          <label for="fDescription">File description</label>
          <textarea type="text" class="form-control" rows="2"
                 id ="fDescription"
                 placeholder="Describe shortly content of the file"
                 [(ngModel)]="description"
                 name="fDescription"  #fDescription="ngModel" >
           </textarea>
      </div>
      <button type="button" class="btn btn-primary btn-sm" [disabled]="blocked" (click)="upload(fFile)">Upload</button>
    </form>
  </div>

`,
})
export class FileAssetUploadComponent implements OnInit {


  blocked = false;
  file: any;
  description: string;

  @Output()
  uploaded = new EventEmitter<FileAsset>();
  constructor(private fileService: FileAssetService, private feedback: FeedbackService) { }




  ngOnInit() {
  }

  upload(fileField: any) {

    console.log( this.file ? this.file.constructor.name : 'not set', this.file);
  }
}
