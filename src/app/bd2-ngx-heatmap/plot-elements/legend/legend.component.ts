import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

/**
 * Legend component for the heatmap's "patterned" mode.
 * 
 * Only displayed when the heatmap is in "patterned" mode.
 */
@Component({
  selector: '[bd2hm-legend]',
  templateUrl: './legend.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  standalone: false
})

export class LegendComponent {
  @Input() show = true;
  @Input() graphic: any;
  @Input() position: string = 'translate(20, 30)';
}
