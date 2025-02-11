import {Component, Input, OnInit} from '@angular/core';
import {MeasurementDesc} from '../../../../dom/repo/measure/measurement-desc';

@Component({
    selector: 'bd2-measurement-desc-view',
    templateUrl: './measurement-desc-view.component.html',
    standalone: false
})
export class MeasurementDescViewComponent implements OnInit {

  @Input()
  model: MeasurementDesc;

  constructor() {
  }

  ngOnInit() {
  }

}
