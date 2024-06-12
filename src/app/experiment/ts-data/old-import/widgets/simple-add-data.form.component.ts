import {Component, EventEmitter, Input, Output} from '@angular/core';
import {
  CellCoordinates,
  CellRange,
  CellRangeDescription,
  CellRole,
  colNrToExcelLetter,
  DataColumnProperties,
  excelLettersToColNr
} from '../../ts-import/sheet-dom';

@Component({
  selector: 'bd2-simple-add-data-form',
  template: `

    <form #simpleAddDataForm="ngForm" class="form-inline  no-clues">
      <label for="colRange">Range</label>
      <input type="text" class="form-control short-input" style="max-width: 6em;"
             id="colRange"
             placeholder="e.g. B-D"
             required minlength="3" pattern="[A-Za-z][A-Za-z]?-[A-Za-z][A-Za-z]?"
             [(ngModel)]="colRange"
             name="fColRange" #fColRange="ngModel"
      >
      <label for="dLabel">Label</label>
      <input type="text" class="form-control"
             id="dLabel"
             placeholder="e.g. TOC1 SD"
             required minlength="2"
             [(ngModel)]="label"
             name="fLabel" #fLabel="ngModel"
      >
      <button class="btn btn-primary btn-sm" [disabled]="!simpleAddDataForm.form.valid" (click)="add()">Add</button>
    </form>
  `
})
export class SimpleAddDataFormComponent {

  @Input()
  lastCol: number;

  @Output()
  onAccepted = new EventEmitter<CellRangeDescription>();

  colRange: string;
  label: string;

  add() {
    // console.log("Add called");
    if (this.colRange) {
      const parts = this.colRange.split('-');
      // console.log("Parts: "+parts);
      let f = excelLettersToColNr(parts[0]);
      f = Math.min(f, this.lastCol);
      let l = excelLettersToColNr(parts[1]);
      l = Math.min(l, this.lastCol);
      l = Math.max(f, l);
      // console.log("Coord: "+f+"-"+l);

      const details = new DataColumnProperties(this.label);
      const range = new CellRange(new CellCoordinates(f, 1), new CellCoordinates(l, 1));
      const description = new CellRangeDescription(range);
      description.role = CellRole.DATA;
      description.details = details;
      this.onAccepted.emit(description);

      if (l < this.lastCol) {
        let nextF = l + 1;
        let nextL = nextF + l - f;
        nextF = Math.min(nextF, this.lastCol);
        nextL = Math.min(nextL, this.lastCol);
        this.colRange = '' + colNrToExcelLetter(nextF) + '-' + colNrToExcelLetter(nextL);
      } else {
        this.colRange = undefined;
        this.label = undefined;
      }

    }
  }

}
