import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators} from '@angular/forms';
import {Sort} from '@angular/material/sort';
import {SpeciesService} from '../../repo/components/biodesc/species.service';
import { DataCategory } from '../../dom/repo/biodesc/data-category';

export interface SearchOptions {
  showPublic: boolean;
  query: string;
  species: string;
  author: string;
  executedFrom: string;
  executedTo: string;
  dataCategory: string;
}

export interface SearchAndSortOptions {
  showPublic: boolean;
  query: string;
  species: string;
  author: string;
  executedFrom: string;
  executedTo: string;
  dataCategory: string;
  sorting: Sort;
}

@Component({
    selector: 'bd2-search-and-sort-panel',
    templateUrl: './search-and-sort-panel.component.html',
    styles: [],
    standalone: false
})

export class SearchAndSortPanelComponent implements OnInit {

  sortOptionsF: UntypedFormGroup;
  queryF: UntypedFormControl;
  speciesF: UntypedFormControl;
  authorF: UntypedFormControl;
  executedFromF: UntypedFormControl;
  executedToF: UntypedFormControl;
  dataCategoryF: UntypedFormControl;
  showPublicF: UntypedFormControl;
  sortingF: UntypedFormControl;

  sortOrderClass = '';

  // options: SearchAndSortOptions;
  // currentDisplayOptions: SearchAndSortOptions;
  // currentQuery: string;

  @Output()
  search = new EventEmitter<SearchOptions>();

  @Output()
  sort = new EventEmitter<Sort>();

  currentSort: Sort = {active: 'modified', direction: 'desc'};

  currentQuery = '';
  currentShowPublic = false;
  currentSpecies = '';
  currentAuthor = '';
  currentExecutedFrom = '';
  currentExecutedTo = '';
  currentDataCategory = '';

  knownSpecies: string[] = [];
  knownDataCategories: DataCategory[] = [];

  @Input()
  set options(val: SearchAndSortOptions) {

    if (val) {
      this.currentSpecies = val.species;
      this.currentAuthor = val.author;
      this.currentExecutedFrom = val.executedFrom;
      this.currentExecutedTo = val.executedTo;
      this.currentDataCategory = val.dataCategory;
      this.currentQuery = val.query;
      this.currentShowPublic = val.showPublic;
      this.currentSort = val.sorting;
    }
  }

  constructor(private fb: UntypedFormBuilder) {}

    // this.currentDisplayOptions = { sorting: 'modified', direction: 'desc', showPublic: false, query: ''};
    // this.currentQuery = '';

  ngOnInit() {

    this.sortOptionsF = this.fb.group({
      sorting: [this.currentSort.active],
      direction: [this.currentSort.direction]
    });

    this.showPublicF = this.fb.control(this.currentShowPublic);
    this.queryF = this.fb.control(this.currentQuery, [Validators.required, Validators.minLength(3)]);
    this.speciesF = this.fb.control(this.currentSpecies);
    this.authorF = this.fb.control(this.currentAuthor);
    this.executedFromF = this.fb.control(this.currentExecutedFrom);
    this.executedToF = this.fb.control(this.currentExecutedTo);
    this.dataCategoryF = this.fb.control(this.currentDataCategory);

    this.sortOptionsF.valueChanges.subscribe( val => this.updateSort(val.sorting, this.currentSort.direction));

    this.showPublicF.valueChanges.subscribe( val => {
      this.currentShowPublic = val;
      this.emitSearch();
    });

    this.executedFromF.valueChanges.subscribe(val => {
      this.currentExecutedFrom = this.formatDateToISO(val);
      this.emitSearch();
    });

    this.executedToF.valueChanges.subscribe(val => {
      this.currentExecutedTo = this.formatDateToISO(val);
      this.emitSearch();
    });

    this.speciesF.valueChanges.subscribe(val => {
      this.currentSpecies = val;
      this.emitSearch();
    });

    this.dataCategoryF.valueChanges.subscribe(val => {
      this.currentDataCategory = val;
      this.emitSearch();
    });

    this.speciesService.species().then(sp => {
      this.knownSpecies = ['', ...sp];
    });

    this.knownDataCategories = DataCategory.getValidOptions();

  }

  private formatDateToISO(date: Date): string {
    if (!date) return '';
    return date.toISOString().split('T')[0];
  }

  updateSort(active: string, direction: string) {
    //console.log('UpdateSort', {active, direction, class: this.sortOrderClass});
    const sort = {active, direction} as Sort;
    this.currentSort = sort;
    this.sort.next(sort);
  }

  emitSearch() {
    const search = {
      showPublic: this.currentShowPublic,
      query: this.currentQuery,
      species: this.currentSpecies,
      author: this.currentAuthor,
      executedFrom: this.currentExecutedFrom,
      executedTo: this.currentExecutedTo,
      dataCategory: this.currentDataCategory
    } as SearchOptions;
    this.search.next(search);
  }

  changeDirection() {
    let direction = this.currentSort.direction == 'asc' ? 'desc' : 'asc';
    //console.log("direction flipped", direction);

    this.sortOrderClass = direction == 'asc' ? 'icon-flipped-h' : null;
    /*if (direction === 'asc') {
      this.sortOrderClass = 'icon-flipped-h';
    } else {
      this.sortOrderClass = null;
    }*/

    this.updateSort(this.currentSort.active, direction);
  }

  find() {
    this.currentQuery = this.queryF.value;
    this.currentSpecies = this.speciesF.value;
    this.currentAuthor = this.authorF.value;
    this.currentExecutedFrom = this.formatDateToISO(this.executedFromF.value);
    this.currentExecutedTo = this.formatDateToISO(this.executedToF.value);
    this.currentDataCategory = this.dataCategoryF.value;
    this.emitSearch();
  }

  all() {
    this.queryF.setValue('');
    this.speciesF.setValue('');
    this.authorF.setValue('');
    this.executedFromF.setValue('');
    this.executedToF.setValue('');
    this.dataCategoryF.setValue('');
    this.currentQuery = '';
    this.currentSpecies = '';
    this.currentAuthor = '';
    this.currentExecutedFrom = '';
    this.currentExecutedTo = '';
    this.currentDataCategory = '';
    this.emitSearch();
  }

  resetDateFilters() {
    this.executedFromF.setValue('');
    this.executedToF.setValue('');
    this.emitSearch();
  }

}
