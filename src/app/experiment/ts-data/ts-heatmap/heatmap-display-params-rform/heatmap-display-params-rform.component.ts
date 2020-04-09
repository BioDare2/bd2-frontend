import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {BaseTSDisplayParamsRForm} from '../../../../tsdata/plots/tsdisplay-params-rform/base-tsdisplay-params-rform';
import {FormBuilder} from '@angular/forms';
import {AlignOptions, TSOption} from '../../../../tsdata/ts-data-dom';

@Component({
  selector: 'bd2-heatmap-display-params-rform',
  templateUrl: './heatmap-display-params-rform.component.html',
  styles: [
  ],
  // tslint:disable-next-line:no-outputs-metadata-property
  outputs: ['displayParams'],
  // tslint:disable-next-line:no-inputs-metadata-property
  inputs: ['disabled', 'totalTraces', 'currentPage'],
})
export class HeatmapDisplayParamsRformComponent extends BaseTSDisplayParamsRForm implements OnInit, OnDestroy, AfterViewInit {


  constructor(fb: FormBuilder) {
    super(fb);

    this.alignOptions = [
      new TSOption('NONE', 'none'),
      new TSOption('MEAN', 'mean')
    ];

    this.normalisationOptions = [
      new TSOption('NO_NORM', 'none'),
      new TSOption('RANGE', 'to [-1,1]'),
      new TSOption('FOLD', 'fold change')
    ]
  }


}
