import {AfterViewInit, Component, EventEmitter, OnInit, Output} from '@angular/core';
import {MatRadioChange} from '@angular/material/radio';

@Component({
  selector: 'bd2-pvalue-form',
  templateUrl: './pvalue-form.component.html',
  styles: [`
    .mat-mdc-radio-button  {
      margin-right: 15px;
    }
  `]
})
export class PValueFormComponent implements OnInit, AfterViewInit {

  constructor() { }

  values = [0.0001, 0.001, 0.005, 0.01, 0.05, 0.1];

  pvalue = 0.001;

  @Output()
  pvalue$ = new EventEmitter<number>();

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    this.pvalue$.emit(this.pvalue);
  }

  selected(change: MatRadioChange) {
    this.pvalue$.emit(change.value);
  }



}
