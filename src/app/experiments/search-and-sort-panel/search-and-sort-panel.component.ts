import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { FormBuilder } from '@angular/forms';

export interface SearchAndSortOptions {
  sorting: string;
  direction: string;
  showPublic: boolean;
  query: string;
}
@Component({
  selector: 'bd2-search-and-sort-panel',
  templateUrl: './search-and-sort-panel.component.html',
  styles: []
})
export class SearchAndSortPanelComponent implements OnInit {

  displayOptionsF: FormGroup;
  queryF: FormControl;

  // options: SearchAndSortOptions;
  currentDisplayOptions: SearchAndSortOptions;
  currentQuery: string;

  @Output()
  search = new EventEmitter<SearchAndSortOptions>();

  @Input()
  set options(val: SearchAndSortOptions) {
    if (val) {
      this.currentDisplayOptions = val;
      this.currentQuery = val.query;
      this.updateOptions();
    }
  }

  constructor(private fb: FormBuilder) {

    this.currentDisplayOptions = { sorting: 'modified', direction: 'desc', showPublic: false, query: ''};
    this.currentQuery = '';
  }



  ngOnInit() {

    this.displayOptionsF = this.fb.group({
      sorting: [this.currentDisplayOptions.sorting],
      direction: [this.currentDisplayOptions.direction],
      showPublic: [this.currentDisplayOptions.showPublic],
    });

    this.queryF = this.fb.control('', [Validators.required, Validators.minLength(3)]);

    this.displayOptionsF.valueChanges.subscribe( val => {
      this.currentDisplayOptions = val;
      this.updateOptions();
    });
  }

  updateOptions() {

    const opt = Object.assign({}, this.currentDisplayOptions) as SearchAndSortOptions;
    opt.query = this.currentQuery;

    this.search.next(opt);
  }

  find() {
    if (this.queryF.valid) {
      this.currentQuery = this.queryF.value;
      this.updateOptions();
    }
  }

  all() {
    this.queryF.setValue('');
    this.currentQuery = '';
    this.updateOptions();
  }
}
