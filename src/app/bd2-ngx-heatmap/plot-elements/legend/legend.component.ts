import { Component, Input } from '@angular/core';

@Component({
  selector: '[bd2hm-legend]',
  template: `
    @if (show && graphic) {
      <svg:g class="bd2hm-legend" [attr.transform]="position">
        <defs>
          <pattern id="legend-pos-stripes" patternUnits="userSpaceOnUse" width="4" height="4" patternTransform="rotate(45)">
            <rect x="0" y="0" width="8" height="8" fill="white"/>
            <line x1="0" y1="0" x2="0" y2="8" stroke="#666" stroke-width="3"/>
          </pattern>
          <pattern id="legend-neg-stripes" patternUnits="userSpaceOnUse" width="4" height="4" patternTransform="rotate(-45)">
            <rect x="0" y="0" width="8" height="8" fill="white"/>
            <line x1="0" y1="0" x2="0" y2="8" stroke="#666" stroke-width="3"/>
          </pattern>
        </defs>
        <rect x="15" y="0" width="10" height="10" fill="url(#legend-pos-stripes)" stroke="#666"/>
        <text x="30" y="9" font-size="10" fill="#222">Value &gt; 0</text>
        <rect x="100" y="0" width="10" height="10" fill="url(#legend-neg-stripes)" stroke="#666"/>
        <text x="115" y="9" font-size="10" fill="#222">Value &lt; 0</text>
      </svg:g>
    }
  `,
  styles: [],
  standalone: false
})

export class LegendComponent {
  @Input() show = true;
  @Input() graphic: any;
  @Input() position: string = 'translate(20, 30)';
}
