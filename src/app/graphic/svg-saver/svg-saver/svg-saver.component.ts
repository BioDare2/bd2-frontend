import {Component, ElementRef, Input, OnInit} from '@angular/core';
// a explanation how to save files https://nils-mehlhorn.de/posts/angular-file-download-progress
// in case I want to remove filesaver

import * as FileSaver from 'file-saver';

/**
 Some docs how to do it properly with styles and embedded graphic

 http://bl.ocks.org/Rokotyan/0556f8facbaf344507cdc45dc3622177

 https://www.npmjs.com/package/d3-save-svg
 https://github.com/edeno/d3-save-svg/tree/gh-pages/src

 https://d3export.housegordon.org/
 https://github.com/agordon/d3export_demo/blob/master/index.html

 namespaces fix: https://stackoverflow.com/questions/23218174/how-do-i-save-export-an-svg-file-after-creating-an-svg-with-d3-js-ie-safari-an

 header format: https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial/Getting_Started
 */

@Component({
  selector: 'bd2-ngx-svg-saver',
  template: `
    <button (click)="save()" [disabled]="disabled"
    class="btn btn-light btn-sm"><i class="material-icons bd-icon">save_alt</i>
    </button>
  `,
  styles: []
})
export class SVGSaverComponent implements OnInit {

  disabled = false;

  serializer = new XMLSerializer();
  @Input()
  svgSelector = 'svg';

  @Input()
  fileName = 'graphic';

  @Input()
  refNode: any;

  nativeElement: any;

  constructor(element: ElementRef) {
    this.nativeElement = element.nativeElement;
  }

  ngOnInit() {
    // console.log("MNE",this.nativeElement);
    if (!this.nativeElement) {
      console.error('Error missing native element');
    } else {
      if (!this.refNode) {
        this.refNode = this.nativeElement.parentNode;
      }
    }

  }

  save() {
    if (!this.refNode || !this.refNode.querySelector) {
      console.error('The refNode misses querySelector functio, probably not a native element, got', this.refNode);
      return;
    }
    const svgNode = this.refNode.querySelector(this.svgSelector);
    if (!svgNode) {
      console.error('Missing svg node for export, selector: ' + this.svgSelector + '; ref: ' + this.refNode);
    } else {

      const svgXML = this.serializer.serializeToString(svgNode);
      // console.log("S",svgXML);
      const blob = new Blob([svgXML], {type: 'image/svg+xml'});
      FileSaver.saveAs(blob, this.fileName + '.svg');
    }
  }

}
