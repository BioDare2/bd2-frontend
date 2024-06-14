import {ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {TooltipService} from './tooltip.service';
import {Observable, Subscription, timer} from 'rxjs';
import {GraphicContext, Point} from '../../bd2-heatmap.dom';
import {debounceTime, map, tap} from 'rxjs/operators';


// [attr.display]="showBack ? undefined : 'none'"
// [style.visibility]="showBack ? undefined :'hidden'"

@Component({
  selector: '[bd2hm-tooltip]',
  template: `
    <svg:g *ngIf="graphic" class="bd2hm-tooltipBox" [attr.display]="show ? undefined : 'none'" [attr.transform]="position">

      <svg:g [attr.opacity]="ready ? 1 : 0">
        <svg:rect [attr.x]="textBX" [attr.width]="textBWidth" [attr.y]="textBY" [attr.height]="textBHeight"
        ></svg:rect>

        <svg:text #text>
          <tspan x="0">{{label}}</tspan>
          <tspan x="0" dy="1.2em">{{values}}</tspan>
        </svg:text>
      </svg:g>

    </svg:g>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush
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

  handleRequest([show, label, point, location]: [boolean, string, Point, Point]) {
    if (show) {
      this.showTooltip(label, point, location);
    } else {
      this.hideTooltip(point, location);
    }
  }

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
        // this.changeDetector.markForCheck();
        this.changeDetector.detectChanges();
      }
    );

  }

  translateToDataLocation(location: Point, textBoxWidth: number, workspaceWidth: number) {
    let x = location.x + location.width + 2 * this.boxMargin;
    if ((x + textBoxWidth) >= workspaceWidth) {
      x = location.x - textBoxWidth;
    }
    const y = location.y;
    return `translate(${x}, ${y})`;
  }

  hideTooltip(point: Point, location: Point) {
    this.show = false;
    // this.changeDetector.markForCheck();
    this.changeDetector.detectChanges();
  }

  formatValues(point: Point) {

    return `${this.graphic.domainFormatter(point.x)} : ${this.graphic.valuesFormatter(point.y)}`;
  }


  updateTextBBox(): Observable<SVGRect> {

    return timer(0).pipe(
      map(r => this.textBBox()),
      tap(rect => this.setTextBBox(rect))
    );
  }

  setTextBBox(rect: SVGRect) {
    this.textBX = rect.x - this.boxMargin;
    this.textBY = rect.y - this.boxMargin;
    this.textBHeight = rect.height + 2 * this.boxMargin;
    this.textBWidth = rect.width + 2 * this.boxMargin;
  }

  textBBox(): SVGRect {
    if (!this.textNode) {
      return {x: 0, y: 0, height: 0, width: 0} as SVGRect;
    }
    return this.textNode.nativeElement.getBBox();
  }

  formatLabel(label: string) {
    if (!label) { return ''; }
    if (label.length < 40) {
      return label;
    }

    return label.substring(0, 38) + '...';
  }
}
