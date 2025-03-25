import { Component, Input } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';

export interface CardData {
  state: "default" | "flipped";
}

@Component({
  selector: 'bd2-species-card',
  templateUrl: './species-card.component.html',
  styleUrl: './species-card.component.css',
  standalone: false,
  animations: [
    trigger('cardFlip', [
      state('default',
        style({
          transform: 'none'
      })
    ),
      state('flipped',
        style({
          transform: 'rotateY(180deg)'
      })
    ),
      transition('default => flipped', [animate('400ms')]),
      transition('flipped => default', [animate('200ms')])
    ])
  ]
})

export class SpeciesCardComponent {
  @Input() name: string;
  @Input() image: string;
  @Input() reference: string;
  @Input() datasets: number;
  @Input() publicDatasets: number;
  @Input() timeseries: number;
  @Input() publicTimeseries: number;
  @Input() keywords: string;

  data: CardData = {
    state: "default",
  };

  constructor() {}

  ngOnInit() {}

  cardClicked() {
    if (this.data.state === "default") {
      this.data.state = "flipped";
    } else {
      this.data.state = "default";
    }
  }
}
