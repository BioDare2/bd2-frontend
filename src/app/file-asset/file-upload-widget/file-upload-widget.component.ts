import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {removeItemFromArr} from '../../shared/collections-util';

@Component({
  selector: 'bd2-file-upload-widget',
  templateUrl: './file-upload-widget.component.html',
  styleUrls: ['./file-upload-widget.component.css']
})
export class FileUploadWidgetComponent implements OnInit {

  /* Based on http://embed.plnkr.co/mMVsbT/ cannot find the orignal post that pointed to it */

  @Input()
  activeColor = 'green';

  @Input()
  baseColor = '#ccc';

  @Input()
  overlayColor = 'rgba(255,255,255,0.5)';

  @Input()
  blocked = false;

  @Input()
  multiple = true;

  @Input()
  noDuplicates = true;

  @Input()
  autoReset = false;

  @Input()
  sizeLimit = 25;

  @Output()
  uploadFiles = new EventEmitter<File[]>();

  @Output()
  selectedFiles = new EventEmitter<File[]>();

  dragging = false;
  loaded = false;

  sizeError = false;
  files: File[] = [];

  @ViewChild('inputFieldM') inputField: ElementRef;


  constructor() {
  }

  ngOnInit() {
  }

  public reset() {
    this.files = [];
    if (this.inputField && this.inputField.nativeElement) {
      this.inputField.nativeElement.value = '';
    }

  }

  handleDragEnter() {
    this.dragging = true;
  }

  handleDragLeave() {
    this.dragging = false;
  }

  handleDrop(e) {
    e.preventDefault();
    this.dragging = false;
    if (e.dataTransfer) {
      this.handleFileChange(e.dataTransfer.files);
    }
  }

  handleFileSelect(e: any) {
    if (e.target) {
      this.handleFileChange(e.target.files);
    }
  }

  handleFileChange(files: FileList) {
    // console.log("Files ", files);

    const numFiles = this.multiple ? files.length : (Math.min(1, files.length));
    if (!this.multiple) {
      this.files = []; // we clean the existing ones
    }

    for (let i = 0; i < numFiles; i++) {
      const file = files[i];
      if (this.noDuplicates) {
        this.removeDuplicate(file);
      }
      this.files.push(file);
    }
    this.checkSize();
    this.selectedFiles.next(this.files);
  }

  remove(file: File) {
    removeItemFromArr(file, this.files);
    this.checkSize();
  }

  removeDuplicate(file: File) {
    const match = this.files.find(f => f.name === file.name);
    this.remove(match);
  }

  checkSize() {
    let size = 0;
    this.files.map(f => f.size).forEach(v => size += v);

    size = size / (1024 * 1024);

    this.sizeError = size > this.sizeLimit;
  }

  upload() {
    this.uploadFiles.next(this.files);
    if (this.autoReset) {
      this.reset();
    }
  }


}
