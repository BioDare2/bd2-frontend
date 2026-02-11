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

/**
 * Component representing a single data point (box-shaped) in the heatmap.
 *
 * It handles rendering the box and managing tooltip interactions.
 */
@Component({
    selector: '[bd2hm-data-point-box]',
    templateUrl: './data-point-box.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
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

  @Input()
  pattern: string | null;

  xPosition: number;
  xWidth: number;

  constructor(private tooltip: TooltipService, private zone: NgZone) {
  }

  /* Scale data point boxes when inputs change */
  ngOnChanges(changes: SimpleChanges): void {
    if (this.xScale && this.point) {
        this.xPosition = this.xScale(this.point.left);
        const band = this.xScale(this.point.right) - this.xScale(this.point.left);
        this.xWidth = band >= 2 ? band - 1 : 1;
    }
  }

  /* Lifecycle hook to set up event listeners for tooltip handling */
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

  /* Add mouse event listeners for tooltip display */
  addMouseListeners(elm: ElementRef<SVGGraphicsElement>) {
    if (elm) {
      elm.nativeElement.addEventListener('mouseover', this.showTooltip.bind(this));
      elm.nativeElement.addEventListener('mouseout', this.hideTooltip.bind(this));
    }
  }

  /* Remove mouse event listeners */
  removeMouseListeners(elm: ElementRef<SVGGraphicsElement>) {
    if (elm) {
      elm.nativeElement.removeEventListener('mouseover', this.showTooltip);
      elm.nativeElement.removeEventListener('mouseout', this.hideTooltip);
    }
  }

  /* Hide tooltip on mouse out */
  hideTooltip($event: any) {
    const location = {x: this.xPosition, y: this.yPosition, width: this.xWidth};
    this.tooltip.hideTooltip();
  }

  /* Show tooltip on mouse over */
  showTooltip($event: any) {
    const location = {x: this.xPosition, y: this.yPosition, width: this.xWidth};
    this.tooltip.showTooltip(this.label, this.point, location);
  }
}
