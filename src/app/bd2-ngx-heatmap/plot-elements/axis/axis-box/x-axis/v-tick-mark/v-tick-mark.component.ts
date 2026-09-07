import {Component, Input, OnChanges, OnInit, SimpleChanges, ChangeDetectionStrategy} from '@angular/core';
import {Tick} from '../../../../../bd2-heatmap.dom';

/**
 * Render a vertical tick mark for the heatmap x-axis.
 */
@Component({
    selector: '[bd2hm-vtick-mark]',
    templateUrl: './v-tick-mark.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class VTickMarkComponent implements OnInit, OnChanges {

  @Input()
  tick: Tick;

  @Input()
  length = 5;

  marky2: number;
  texty2: number;
  textdy: number | string;

  constructor() {
  }


  ngOnInit(): void {
    this.calculatePositions();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.calculatePositions();
  }

  /* Calculate positions for the tick mark and label */
  calculatePositions() {
    this.marky2 = this.tick?.top ? -this.length : this.length;
    this.texty2 = this.tick?.top ? -(this.length + 4) : (this.length + 4);
    this.textdy = this.tick?.top ? 0 : '0.6em';
  }

}
