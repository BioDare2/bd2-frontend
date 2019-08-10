import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'bd2-pvalue-form',
  templateUrl: './pvalue-form.component.html',
  styles: []
})
export class PValueFormComponent implements OnInit {

  constructor() { }

  @Output()
  pvalue$ = new EventEmitter<number>();

  ngOnInit() {
    this.pvalue$.emit(0.001);
  }

  selected(val: number) {
    this.pvalue$.emit(val);
  }

}
