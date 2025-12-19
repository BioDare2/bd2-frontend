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

/**
 * Component for rendering the label text boxes for a heatmap.
 */
@Component({
    selector: '[bd2hm-label-box]',
    templateUrl: './label-box.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
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

  /* Adapt margin size based on the height of the heatmap */
  marginSize() {
    if (this.maxHeight >= 20) {
      return 4;
    }
    if (this.maxHeight >= 12) {
      return 2;
    }
    return 1;
  }

  /* Adapt font size based on the height of the heatmap */
  fontSize() {
    if (this.maxHeight > 12) {
      return 10;
    }
    if (this.maxHeight >= 6) {
      return this.maxHeight - 3;
    }
    return 0;
  }

  /* Toggle the visibility of the label */
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

  /* Update the bounding box of the text element */
  updateTextBBox(): Observable<SVGRect> {
    return timer(0).pipe(
      map(r => this.textBBox()),
      tap(rect => this.setTextBBox(rect))
    );
  }

  /* Set the text box position and dimensions */
  setTextBBox(rect: SVGRect) {
    this.textBY = rect.y - 4;
    this.textBHeight = rect.height + 8;
    this.textBWidth = rect.x + rect.width + 4;
  }

  /* Get the bounding box of the text element */
  textBBox(): SVGRect {
    if (!this.textNode) {
      return {x: 0, y: 0, height: 0, width: 0} as SVGRect;
    }
    return this.textNode.nativeElement.getBBox();
  }

  /* Get the short label (up to the first dot) */
  get shortLabel(): string {
    if (!this.serie?.label) return '';
    const idx = this.serie.label.indexOf('.');
    return idx !== -1 ? this.serie.label.substring(0, idx + 1) : this.serie.label;
  }
}
