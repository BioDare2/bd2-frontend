import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'bd2-tssort-params-rform',
  templateUrl: './tssort-params-rform.component.html',
  styles: [
    `
      mat-radio-button {
        margin-right: 0.5em;
      }
    `
  ]
})
export class TSSortParamsRFormComponent implements OnInit {

  sortBy;

  noPPA = false;
  noRhythm = false;

  constructor() { }

  ngOnInit(): void {
  }

}
