import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {ImportDetails} from '../../import-dom';
import {Observable} from 'rxjs';
import {FormControl} from '@angular/forms';
import {MatAutocomplete, MatChipInputEvent} from '@angular/material';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {map, startWith} from 'rxjs/operators';
import {MatAutocompleteSelectedEvent} from '@angular/material/typings/esm5/autocomplete';
import {TSFileService} from '../ts-file.service';


@Component({
  selector: 'bd2-select-backgrounds-labels-step',
  templateUrl: './select-backgrounds-labels-step.component.html',
  styles: []
})
export class SelectBackgroundsLabelsStepComponent implements OnInit {

  selectable = true;
  removable = true;
  addOnBlur = false;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  backgroundCtrl = new FormControl();
  filteredLabels: Observable<string[]>;
  allLabels: string[];

  @ViewChild('backgroundInput', {static: false})
  backgroundInput: ElementRef<HTMLInputElement>;

  @ViewChild('auto', {static: false})
  matAutocomplete: MatAutocomplete;


  @Input()
  importDetails: ImportDetails;

  get backgrounds() {
    return this.importDetails ? this.importDetails.backgroundsLabels : [];
  }

  set backgrounds(vals: string[]) {
    this.importDetails.backgroundsLabels = vals;
  }


  constructor(private tsFileService: TSFileService) {

    /*
    this.importDetails = new ImportDetails();
    this.importDetails.containsBackgrounds = true;
    this.importDetails.backgroundsLabels = ['background', 'Noise'];
    this.importDetails.importLabels = false;
    this.importDetails.userLabels = ['WT', 'WT PRR9', 'Lime long label', 'Background', 'Bla', 'Noise', 'More', 'More2',
     'Label1', 'WT', 'WT PRR3'];
    this.importDetails.fileId = '23';
    this.importDetails.labelsSelection = new CellSelection(1, 1, undefined, 1, 1, undefined, undefined);
    */

    this.allLabels = [];
    this.filteredLabels = this.backgroundCtrl.valueChanges.pipe(
      startWith(null),
      map((label: string | null) => label ? this._filter(label) : this.allLabels.slice(0, 7)));

  }

  ngOnInit() {

    // this.loadLabels();
  }

  loadLabels() {
    if (!this.importDetails || !this.importDetails.fileId) {
      this.updateAllLabels([]);
      return;
    }

    if (!this.importDetails.importLabels) {
      this.updateAllLabels(this.unique(this.importDetails.userLabels));
    } else {
      if (this.importDetails.labelsSelection) {
        this.tsFileService.previewLabels(this.importDetails.fileId, this.importDetails.importFormat.name,
                this.importDetails.labelsSelection, this.importDetails.inRows)
                        .subscribe( resp => {
                          this.updateAllLabels(this.unique(resp));
                        });
      }
    }
  }

  updateAllLabels(labels: string[]) {
    this.allLabels = labels;
    const old = this.backgrounds || [];
    this.backgrounds = [];
    old.forEach(v => this.addBackground(v));
    this.backgroundCtrl.setValue(' ');
    this.backgroundCtrl.setValue(null);
  }

  unique(values: string[]) {
    values = values.filter(l => !!l)
      .map( l => l.trim());
    const set = new Set(values);
    return [...set];
  }

  addBackground(value: string) {
    if ((value || '').trim()) {
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
