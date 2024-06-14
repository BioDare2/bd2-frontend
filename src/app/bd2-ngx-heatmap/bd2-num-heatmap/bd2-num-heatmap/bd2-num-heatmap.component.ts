import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {BoxSerie, GraphicContext, LookAndFeelSizing, Serie} from '../../bd2-heatmap.dom';
import {TooltipService} from '../../plot-elements/tooltip/tooltip.service';
import {HeatmapDataUtil} from '../heatmap-data-util';
import {HeatmapGraphUtil} from '../../heatmap-graph-util';

@Component({
  selector: 'bd2-num-heatmap',
  templateUrl: './bd2-num-heatmap.component.html',
  styleUrls: ['./bd2-num-heatmap.component.css'],
  providers: [TooltipService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Bd2NumHeatmapComponent implements OnInit, OnDestroy, OnChanges {

  series: BoxSerie[];

  @Input()
  data: Serie[];

  @Input()
  asymmetric = false;

  @Input()
  middleZero = false;

  @Input()
  hidden = false;

  @Input()
  labelsAlwaysOn = true;

  @Input()
  lookAndFeel = new LookAndFeelSizing();

  graphic: GraphicContext;

  heatmapDataUtil = new HeatmapDataUtil();
  heatmapGraphUtil = new HeatmapGraphUtil();

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
    if (this.data && this.data.length > 0) {
      this.series = this.heatmapDataUtil.seriesToBoxes(this.data, this.asymmetric);
      this.graphic = this.heatmapGraphUtil.prepareGraphicContext(this.series, this.lookAndFeel, this.middleZero);
    } else {
      this.graphic = undefined;
      this.series = undefined;
    }
  }


}
