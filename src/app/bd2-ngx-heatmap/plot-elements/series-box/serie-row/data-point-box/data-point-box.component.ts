import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  NgZone,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import {BoxDef} from '../../../../bd2-heatmap.dom';
import {ScaleLinear, ScaleQuantize} from 'd3-scale';
import {TooltipService} from '../../../tooltip/tooltip.service';


@Component({
  selector: '[bd2hm-data-point-box]',
  template: `
    <svg:rect #box *ngIf="point && xScale" [attr.x]="xPosition" [attr.y]="yPosition"
              [attr.width]="xWidth"
              [attr.height]="yHeight" [attr.fill]="colorScale(point.y)" [attr.stroke]="colorScale(point.y)"
    >
    </svg:rect>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DataPointBoxComponent implements OnInit, OnDestroy, OnChanges, AfterViewInit {

  @ViewChild('box')
  boxNode: ElementRef<SVGGraphicsElement>;

  prevBoxNode: ElementRef<SVGGraphicsElement>;

  @Input()
  point: BoxDef;

  @Input()
  yPosition: number;

  @Input()
  yHeight: number;

  @Input()
  xScale: ScaleLinear<number, number>;

  @Input()
  colorScale: ScaleQuantize<string>;

  @Input()
  label: string;

  xPosition: number;
  xWidth: number;

  constructor(private tooltip: TooltipService, private zone: NgZone) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.xScale && this.point) {
        this.xPosition = this.xScale(this.point.left);
        const band = this.xScale(this.point.right) - this.xScale(this.point.left);
        this.xWidth = band >= 2 ? band - 1 : 1;
    }
  }

  ngAfterViewInit(): void {
    if (this.boxNode) {

      if ((this.prevBoxNode !== this.boxNode)) {
        this.removeMouseListeners(this.prevBoxNode);
        this.zone.runOutsideAngular(() => {
          this.addMouseListeners(this.boxNode);
        });
        this.prevBoxNode = this.boxNode;
      }
    }
  }

  ngOnInit(): void {
  }


  ngOnDestroy(): void {
    this.removeMouseListeners(this.boxNode);
  }

  addMouseListeners(elm: ElementRef<SVGGraphicsElement>) {
    if (elm) {
      elm.nativeElement.addEventListener('mouseover', this.showTooltip.bind(this));
      elm.nativeElement.addEventListener('mouseout', this.hideTooltip.bind(this));
    }
  }

  removeMouseListeners(elm: ElementRef<SVGGraphicsElement>) {
    if (elm) {
      elm.nativeElement.removeEventListener('mouseover', this.showTooltip);
      elm.nativeElement.removeEventListener('mouseout', this.hideTooltip);
    }
  }

  hideTooltip($event: any) {
    const location = {x: this.xPosition, y: this.yPosition, width: this.xWidth};
    this.tooltip.hideTooltip(this.point, location);
  }

  showTooltip($event: any) {
    const location = {x: this.xPosition, y: this.yPosition, width: this.xWidth};
    this.tooltip.showTooltip(this.label, this.point, location);
  }


}


