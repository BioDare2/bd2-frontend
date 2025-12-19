import {ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {TooltipService} from './tooltip.service';
import {Observable, Subscription, timer} from 'rxjs';
import {GraphicContext, Point} from '../../bd2-heatmap.dom';
import {debounceTime, map, tap} from 'rxjs/operators';


// [attr.display]="showBack ? undefined : 'none'"
// [style.visibility]="showBack ? undefined :'hidden'"

@Component({
    selector: '[bd2hm-tooltip]',
    templateUrl: './tooltip.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class TooltipComponent implements OnInit, OnDestroy {

  @Input()
  graphic: GraphicContext;

  @Input()
  boxMargin = 4;

  @ViewChild('text')
  textNode: ElementRef<SVGGraphicsElement>;

  show = false;
  label: string;
  values: string;
  subscription: Subscription;
  position: string;

  ready = false;
  textBX: number;
  textBY: number;
  textBWidth: number;
  textBHeight: number;

  constructor(private tooltip: TooltipService, private changeDetector: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.subscription = this.tooltip.request$.pipe(
      debounceTime(100)
    ).subscribe(request => this.handleRequest(request));
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  /* Show/hide tooltip as requested */
  handleRequest([show, label, point, location]: [boolean, string, Point, Point]) {
    if (show) {
      this.showTooltip(label, point, location);
    } else {
      this.hideTooltip();
    }
  }

  /* Show tooltip with given label and target point at specified location */
  showTooltip(label: string, point: Point, location: Point) {

    this.ready = false;
    this.label = this.formatLabel(label);
    this.values = this.formatValues(point);

    this.show = true;
    // change detection not mark as it can be called outside ngzone

    this.changeDetector.detectChanges();
    this.updateTextBBox().subscribe(
      rect => {
        if (this.show) {
          this.position = this.translateToDataLocation(location, this.textBWidth, this.graphic.workspaceWidth);
          this.ready = true;
        }
        // change detection not mark as it can be called outside ngzone
        // it has to be called again as textobox is determined after the timer so does the new position
        this.changeDetector.detectChanges();
      }
    );
  }

  /* Compute translation to place tooltip next to its matching datapoint */
  translateToDataLocation(location: Point, textBoxWidth: number, workspaceWidth: number) {
    let x = location.x + location.width + 2 * this.boxMargin;
    if ((x + textBoxWidth) >= workspaceWidth) {
      x = location.x - textBoxWidth;
    }
    const y = location.y;
    return `translate(${x}, ${y})`;
  }

  /* Hide tooltip */
  hideTooltip() {
    this.show = false;
    this.changeDetector.detectChanges();
  }

  /* Format tooltip as time : value */
  formatValues(point: Point) {
    return `${this.graphic.domainFormatter(point.x)} : ${this.graphic.valuesFormatter(point.y)}`;
  }

  /* Update text bounding box after rendering */
  updateTextBBox(): Observable<SVGRect> {
    return timer(0).pipe(
      map(r => this.textBBox()),
      tap(rect => this.setTextBBox(rect))
    );
  }

  /* Set text bounding box with margins */
  setTextBBox(rect: SVGRect) {
    this.textBX = rect.x - this.boxMargin;
    this.textBY = rect.y - this.boxMargin;
    this.textBHeight = rect.height + 2 * this.boxMargin;
    this.textBWidth = rect.width + 2 * this.boxMargin;
  }

  /* Get text bounding box (create with default values if textNode is not available) */
  textBBox(): SVGRect {
    if (!this.textNode) {
      return {x: 0, y: 0, height: 0, width: 0} as SVGRect;
    }
    return this.textNode.nativeElement.getBBox();
  }

  /* Format label to fit into tooltip */
  formatLabel(label: string) {
    if (!label) { return ''; }
    if (label.length < 40) {
      return label;
    }
    return label.substring(0, 38) + '...';
  }
}
