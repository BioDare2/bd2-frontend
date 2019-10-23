import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {ImportDetails} from '../../import-dom';
import {BehaviorSubject, Observable} from 'rxjs';
import {FormControl} from '@angular/forms';
import {MatAutocomplete, MatChipInputEvent} from '@angular/material';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {map, startWith} from 'rxjs/operators';
import {MatAutocompleteSelectedEvent} from '@angular/material/typings/esm5/autocomplete';
import {TSFileService} from '../ts-file.service';
import {CellSelection} from '../data-table-dom';

@Component({
  selector: 'bd2-select-backgrounds-labels-step',
  templateUrl: './select-backgrounds-labels-step.component.html',
  styles: []
})
export class SelectBackgroundsLabelsStepComponent implements OnInit {

  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = false;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  backgroundCtrl = new FormControl();
  filteredLabels: Observable<string[]>;
  allLabels: string[];

  @ViewChild('backgroundInput', {static: false}) backgroundInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto', {static: false}) matAutocomplete: MatAutocomplete;


  @Input()
  importDetails: ImportDetails;

  get backgrounds() {
    return this.importDetails ? this.importDetails.backgroundsLabels : [];
  }


  constructor(private tsFileService: TSFileService) {

    this.importDetails = new ImportDetails();
    this.importDetails.containsBackgrounds = true;
    this.importDetails.backgroundsLabels = ['background', 'Noise'];
    this.importDetails.importLabels = false;
    this.importDetails.userLabels = ['WT', 'WT PRR9', 'Lime long label', 'Background', 'Bla', 'Noise', 'More', 'More2',
     'Label1', 'WT', 'WT PRR3'];
    this.importDetails.fileId = '23';
    this.importDetails.labelsSelection = new CellSelection(1, 1, undefined, 1, 1, undefined, undefined);

    this.allLabels = [];
    this.filteredLabels = this.backgroundCtrl.valueChanges.pipe(
      startWith(null),
      map((label: string | null) => label ? this._filter(label) : this.allLabels.slice(0, 7)));

  }

  ngOnInit() {

    this.loadLabels();
  }

  loadLabels() {
    if (!this.importDetails || !this.importDetails.fileId) {
      this.allLabels = [];
    }

    if (!this.importDetails.importLabels) {
      this.allLabels = this.unique(this.importDetails.userLabels);
    } else {
      if (this.importDetails.labelsSelection) {
        this.tsFileService.previewLabels(this.importDetails.fileId, this.importDetails.importFormat.name,
          this.importDetails.labelsSelection, this.importDetails.inRows).subscribe( resp => this.allLabels = resp);
      }
    }
  }

  unique(values: string[]) {
    const set = new Set(values);
    return [...set];
  }

  addBackground(value: string) {
    if ((value || '')) {
      const index = this.backgrounds.indexOf(value);
      const known = this.allLabels.indexOf(value);
      if (index < 0 && known >= 0) {
        this.backgrounds.push(value.trim());
      }
    }
  }

  add(event: MatChipInputEvent): void {
    // Add fruit only when MatAutocomplete is not open
    // To make sure this does not conflict with OptionSelected Event
    if (!this.matAutocomplete.isOpen) {
      const input = event.input;
      const value = event.value;

      this.addBackground(value);

      // Reset the input value
      if (input) {
        input.value = '';
      }

      this.backgroundCtrl.setValue(null);
    }
  }

  remove(background: string): void {
    const index = this.backgrounds.indexOf(background);

    if (index >= 0) {
      this.backgrounds.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.addBackground(event.option.viewValue);
    this.backgroundInput.nativeElement.value = '';
    this.backgroundCtrl.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allLabels
      .filter(label => label.toLowerCase().indexOf(filterValue) === 0)
      .slice(0, 7);
  }


}
