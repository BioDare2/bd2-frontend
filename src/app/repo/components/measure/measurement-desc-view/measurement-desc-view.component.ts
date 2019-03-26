import {Component, Input, OnInit} from '@angular/core';
import {MeasurementDesc} from '../../../../dom/repo/measure/measurement-desc';

@Component({
  selector: 'bd2-measurement-desc-view',
  templateUrl: './measurement-desc-view.component.html',
})
export class MeasurementDescViewComponent implements OnInit {

  @Input()
  model: MeasurementDesc;

  constructor() {
  }

  ngOnInit() {
  }

}
