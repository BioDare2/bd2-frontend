import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {BaseTSDisplayParamsRForm} from '../../../../tsdata/plots/tsdisplay-params-rform/base-tsdisplay-params-rform';
import {UntypedFormBuilder} from '@angular/forms';
import {TSOption} from '../../../../tsdata/ts-data-dom';

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


  constructor(fb: UntypedFormBuilder) {
    super(fb);

    this.alignOptions = [
      new TSOption('NONE', 'none'),
      new TSOption('MEAN', 'mean')
    ];

    const range = this.normalisationOptions.find( o => o.name === 'RANGE');

    this.displayParamsForm.get('normalisation').setValue(range?.name);
    this.displayParamsForm.get('hourly').setValue(true);

    /*this.normalisationOptions = [
      new TSOption('NO_NORM', 'none'),
      new TSOption('RANGE', 'to [-1,1]'),
      new TSOption('FOLD', 'fold change')
    ]*/
  }


}
