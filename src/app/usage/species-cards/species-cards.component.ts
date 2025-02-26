import { Component } from '@angular/core';

@Component({
  selector: 'bd2-species-cards',
  templateUrl: './species-cards.component.html',
  styleUrl: './species-cards.component.css',
  standalone: false
})
export class SpeciesCardsComponent {

}

export interface CardData {
  imageId: string;
  state: "default" | "flipped" | "matched";
}
