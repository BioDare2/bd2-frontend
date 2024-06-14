import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Tick} from '../../../../../bd2-heatmap.dom';

@Component({
  selector: '[bd2hm-vtick-mark]',
  template: `
    <svg:line *ngIf="tick"
              [attr.x1]="tick.x" [attr.x2]="tick.x"
              y1="0" [attr.y2]="marky2"
    ></svg:line>
    <svg:text *ngIf="tick" [attr.x]="tick.x" [attr.y]="texty2" [attr.dy]="textdy">{{tick.label}}</svg:text>
  `,
  styles: []
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


  calculatePositions() {
    this.marky2 = this.tick?.top ? -this.length : this.length;
    this.texty2 = this.tick?.top ? -(this.length + 4) : (this.length + 4);
    this.textdy = this.tick?.top ? 0 : '0.6em';
  }

}
