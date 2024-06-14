import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import {Serie} from '../../../bd2-heatmap.dom';
import {Observable, timer} from 'rxjs';
import {map, tap} from 'rxjs/operators';

@Component({
  selector: '[bd2hm-label-box]',
  template: `
    <svg:g *ngIf="serie" class="bd2hm-label">
      <svg:text *ngIf="alwaysOn" x="5" [attr.y]="yMiddle" class="bd2hm-onLabel"
                [attr.font-size]="fontSize()"
      >{{serie.label}}</svg:text>

      <g (mouseout)="toggleLabel(false)" (mouseover)="toggleLabel(true)">
        <svg:rect x="-7" width="7" [attr.y]="triggerY" [attr.height]="triggerHeight" [attr.fill]="color"
        ></svg:rect>

        <!--<svg:circle [attr.cx]="-cirR()-2" [attr.cy]="yMiddle" [attr.r]="cirR()" [attr.fill]="'rgb(67, 125, 179)'"
                    [attr.filter]="band < 7 ? undefined : 'url(#bd2hm-shadow)'"
        ></svg:circle>-->

        <svg:g class="bd2hm-hover" [attr.opacity]="ready ? 1 : 0" [attr.display]="toggled ? undefined : 'none'">
          <svg:rect x="0" [attr.width]="textBWidth" [attr.y]="textBY" [attr.height]="textBHeight"
          ></svg:rect>
          <svg:text #text x="5" [attr.y]="yMiddle"
          >{{serie.label}}</svg:text>
        </svg:g>
      </g>
    </svg:g>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LabelBoxComponent implements OnInit, OnChanges {

  @Input()
  serie: Serie;

  @Input()
  yStart: number;

  @Input()
  maxHeight: number;

  @Input()
  alwaysOn = true;

  @Input()
  color = 'rgb(67, 125, 179)';

  margin: number;
  triggerY: number;
  triggerHeight: number;

  yMiddle: number;


  @ViewChild('text')
  textNode: ElementRef<SVGGraphicsElement>;

  textBWidth = 0;
  textBY = 0;
  textBHeight;

  toggled = false;
  ready = false;

  constructor(private changeDetector: ChangeDetectorRef) {
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.margin = this.marginSize();
    this.triggerY = this.yStart + this.margin;
    this.triggerHeight = this.margin > 1 ? this.maxHeight - 2 * this.margin : this.maxHeight - 1;
    this.yMiddle = this.yStart + this.maxHeight / 2;

  }

  marginSize() {
    if (this.maxHeight >= 20) {
      return 4;
    }
    if (this.maxHeight >= 12) {
      return 2;
    }
    return 1;
  }

  fontSize() {
    if (this.maxHeight > 12) {
      return 10;
    }
    if (this.maxHeight >= 6) {
      return this.maxHeight - 3;
    }
    return 0;
  }

  toggleLabel(val?: boolean) {

    if (val === undefined) {
      val = !this.toggled;
    }

    this.ready = false;
    this.toggled = val;

    if (this.toggled) {
      this.updateTextBBox().subscribe(
        rect => {
          if (this.toggled) {
            this.ready = true;
          }
          this.changeDetector.markForCheck();
        }
      );
    }

  }

  updateTextBBox(): Observable<SVGRect> {

    return timer(0).pipe(
      map(r => this.textBBox()),
      tap(rect => this.setTextBBox(rect))
    );
  }

  setTextBBox(rect: SVGRect) {
    this.textBY = rect.y - 4;
    this.textBHeight = rect.height + 8;
    this.textBWidth = rect.x + rect.width + 4;
  }

  textBBox(): SVGRect {
    if (!this.textNode) {
      return {x: 0, y: 0, height: 0, width: 0} as SVGRect;
    }
    return this.textNode.nativeElement.getBBox();
  }

  /*
  cirR() {
    if (this.band >= 20) { return 9; }
    if (this.band <= 5 ) { return 2; }
    return this.band / 2 - 1;
  } */


}
