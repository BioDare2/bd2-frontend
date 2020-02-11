import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Sort} from '@angular/material';

export interface SearchOptions {
  showPublic: boolean;
  query: string;
}

export interface SearchAndSortOptions {
  showPublic: boolean;
  query: string;
  sorting: Sort;
}

@Component({
  selector: 'bd2-search-and-sort-panel',
  templateUrl: './search-and-sort-panel.component.html',
  styles: []
})
export class SearchAndSortPanelComponent implements OnInit {

  sortOptionsF: FormGroup;
  queryF: FormControl;
  showPublicF: FormControl;

  // options: SearchAndSortOptions;
  // currentDisplayOptions: SearchAndSortOptions;
  // currentQuery: string;

  @Output()
  search = new EventEmitter<SearchOptions>();

  @Output()
  sort = new EventEmitter<Sort>();

  currentSort: Sort = {active: 'id', direction: 'asc'};

  currentQuery = '';
  currentShowPublic = false;


  @Input()
  set options(val: SearchAndSortOptions) {

    if (val) {
      this.currentQuery = val.query;
      this.currentShowPublic = val.showPublic;
      this.currentSort = val.sorting;
    }
  }

  constructor(private fb: FormBuilder) {

    // this.currentDisplayOptions = { sorting: 'modified', direction: 'desc', showPublic: false, query: ''};
    // this.currentQuery = '';
  }



  ngOnInit() {

    this.sortOptionsF = this.fb.group({
      sorting: [this.currentSort.active],
      direction: [this.currentSort.direction]
    });

    this.showPublicF = this.fb.control(this.currentShowPublic);
    this.queryF = this.fb.control(this.currentQuery, [Validators.required, Validators.minLength(3)]);


    this.sortOptionsF.valueChanges.subscribe( val => this.updateSort(val.sorting, val.direction));

    this.showPublicF.valueChanges.subscribe( val => {
      this.currentShowPublic = val;
      this.emitSearch();
    });


  }

  updateSort(active: string, direction: string) {
    const sort = {active, direction} as Sort;
    this.currentSort = sort;
    this.sort.next(sort);
  }

  emitSearch() {
    const search = { showPublic: this.currentShowPublic, query: this.currentQuery } as SearchOptions;
    this.search.next(search);
  }



  find() {
    if (this.queryF.valid) {
      this.currentQuery = this.queryF.value;
      this.emitSearch();
    }
  }

  all() {
    this.queryF.setValue('');
    this.currentQuery = '';
    this.emitSearch();
  }
}
