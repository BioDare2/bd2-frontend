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

  constructor() { }

  ngOnInit() {
  }

}
