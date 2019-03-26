import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {FileAsset} from '../dom/file-asset';
import {FileAssetService} from '../file-asset-service';
import {FeedbackService} from '../../feedback/feedback.service';

@Component({
  selector: 'bd2-file-asset-form',
  template: `

  <div *ngIf="file">
    <form>
      <div class="form-group">
        <label for="fFile">File</label>
        <input type="file" class="form-control" id="fFile" required name="fFile" #fFile>
        <p>Leave empty when changing description only</p>
      </div>
      <div class="form-group">
          <label for="fDescription">Description</label>
          <textarea type="text" class="form-control" rows="2"
                 id ="fDescription"
                 placeholder="Describe content of the file"
                 [(ngModel)]="description"
                 name="fDescription"  #fDescription="ngModel" >
           </textarea>
      </div>
      <button type="button" class="btn btn-primary btn-sm" [disabled]="blocked" (click)="save(fFile)">Save</button>
      <button type="button" class="btn btn-sm" (click)="cancel()">Cancel</button>
    </form>
  </div>
`,
})
export class FileAssetFormComponent implements OnInit {

  @Input()
  set model(model: FileAsset) {
    this.file = model;
    this.description = this.file.last.description;
    this.blocked = false;
  }

  @Output()
  closed = new EventEmitter<boolean>();

  file: FileAsset;
  description: string;
  blocked = false;

  constructor(private fileService: FileAssetService, private feedback: FeedbackService) {
  }

  ngOnInit() {
  }

  save(fileField: any) {

    console.log('save', fileField);
    /*if (!fileField || !fileField.files[0]) {
      this.errors = ['Select a file to upload'];
      return;
    }*/
    this.blocked = true;
    this.fileService.updateFile(this.file, fileField.files[0], this.description)
      .then( file => this.file.setAll(file) )
      .then( () => {
        this.closed.next(true);
        this.blocked = false;
      })
      .catch( reason => {
        this.blocked = false;
        this.feedback.error(reason);
      });


  }

  cancel() {
    this.closed.next(false);
  }

}
