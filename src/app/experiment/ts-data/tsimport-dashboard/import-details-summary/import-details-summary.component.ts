import {Component, Input, OnInit} from '@angular/core';
import {ImportDetails} from '../../import-dom';

@Component({
  selector: 'bd2-import-details-summary',
  templateUrl: './import-details-summary.component.html',
  styles: []
})
export class ImportDetailsSummaryComponent implements OnInit {

  @Input()
  importDetails: ImportDetails;

  @Input()
  showTime = false;

  @Input()
  showLabelling = false;

  get firstTimeCell() {
    return this.importDetails ? this.importDetails.firstTimeCell : undefined;
  }

  get labelsSelection() {
    return this.importDetails ? this.importDetails.labelsSelection : undefined;
  }

  constructor() { }

  ngOnInit() {
  }

}
