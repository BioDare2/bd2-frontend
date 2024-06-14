import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {LookAndFeelSizing, Serie} from '../../bd2-heatmap.dom';
import {TooltipService} from '../../plot-elements/tooltip/tooltip.service';
import {Bd2FixedHeatmapUtil} from './bd2-fixed-heatmap-util';
import {FixedGraphicContext} from './bd2-fixed-heatmap.dom';


@Component({
  selector: 'bd2-fixedint-heatmap',
  templateUrl: './bd2-fixed-interval-heatmap.component.html',
  styleUrls: ['./bd2-fixed-interval-heatmap.component.css'],
  providers: [TooltipService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Bd2FixedIntervalHeatmapComponent implements OnInit, OnDestroy, OnChanges {

  series: Serie[];

  @Input()
  set data(data: Serie[]) {
    this.series = data;
    this.graphic = this.heatmapUtil.prepareGraphicContext(this.series, this.lookAndFeel);
  }

  @Input()
  hidden = false;

  @Input()
  labelsAlwaysOn = true;

  @Input()
  lookAndFeel = new LookAndFeelSizing();

  graphic: FixedGraphicContext;

  heatmapUtil = new Bd2FixedHeatmapUtil();

  constructor(private changeDetector: ChangeDetectorRef, private tooltip: TooltipService) {
  }


  ngOnInit(): void {
    // this.changeDetector.detach();
  }

  ngOnDestroy() {
    if (this.tooltip) {
      this.tooltip.ngOnDestroy();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    // this.changeDetector.detectChanges();

  }


}
