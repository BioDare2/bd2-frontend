import {Component, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {
  CellCoordinates,
  CellRange,
  CellRangeDescription,
  CellRole,
  colNrToTopCountWellName,
  ColumnBlockEntry,
  ColumnBlocks,
  DataColumnProperties,
  TimeColumnProperties,
  TimeColumnType
} from '../sheet-dom';
import {ExcelTSImportParameters} from '../../import-dom';
import {DataGridModel} from '../data-grid.model';
import {ConfirmDialogComponent} from '../../../../shared/confirm-dialog.component';
import {ColumnTypeDialogComponent} from './column-type.dialog.component';
import {ConfirmRowCopyDialogComponent} from './confirm-row-copy.dialog.component';
import {ColorCycler} from './color-cycler';

@Component({
  selector: 'bd2-describe-topcount-table',
  template: `
    <div *ngIf="dataModel">

      <bd2-confirm-dialog #confirmDialog></bd2-confirm-dialog>
      <bd2-column-type-dialog #columnTypeDialog (onAccepted)="setColumnType($event)"
                              [lastCol]="lastCol" [showTime]="false"
      ></bd2-column-type-dialog>
      <bd2-confirm-row-copy-dialog #rowCopyDialog (onAccepted)="copyRowAsLabels($event)"></bd2-confirm-row-copy-dialog>


      <hr>

      <div>

        <h4>Current Topcount import parameters </h4>

        <div *ngIf="!hasData()" type="danger" class="alert alert-danger" role="alert">
          <strong>Missing data labels. Please use one of the methods:</strong>
          <ul>
            <li>Click and draw over the headers of columns to select the range and
              assign the data labels in the popup dialog.
            </li>
            <li>Use the form below to manually provide the column range and the data label.</li>
          </ul>
        </div>

        <div *ngIf="timeColumnDescription">
          <div class="form-group">
            <label for="timeOffset">Time parameter: offset (hours)</label>
            <input type="number" class="form-control short-input"
                   id="timeOffset"
                   step="any"
                   placeholder="e.g. -4"
                   [(ngModel)]="timeColumnDescription.details.timeOffset"
                   name="fTimeOffset" #fTimeOffset="ngModel"
            >
          </div>
        </div>

        <div *ngIf="dataBlocks && dataBlocks.length > 0" style="">
          <p>
            <strong>Columns descriptions (select to edit)</strong>
          </p>
          <div style="max-height: 20em; overflow-y: auto; margin-bottom: 1em;">
            <ul class="list-group">
              <li *ngFor="let block of dataBlocks" (click)="editBlock(block)" class="list-group-item">
                <span><strong>{{block.topcountLabel}}</strong> : {{block.value}}</span>
                <a (click)="deleteBlock(block)" role="button" class="float-right" aria-label="delete">
                  <i class="material-icons bd-icon bd-primary">delete_forever</i>
                <!-- <span class="glyphicon glyphicon-remove" aria-hidden="true"></span> -->
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div>
          <button class="btn btn-primary" [disabled]="blocked || !hasTime() || !hasData()" (click)="accept()">Import
            timeseries
          </button>
        </div>

      </div>

      <!--
      <hr>
      <bd2-simple-add-data-form (onAccepted)="setColumnType($event)" [lastCol]="lastCol"></bd2-simple-add-data-form>
      -->

      <hr>

      <h4>Data table
        <small>(only top rows)</small>
      </h4>
      <p>Click on column headers for description options</p>

      <!--<div style="width: 100%;">-->
      <div style="overflow-x: auto;">
        <table class="table table-bordered excel-table"
               role="grid" style="width: auto;">

          <thead>
          <tr role="row">
            <th></th>
            <th *ngFor="let colIx of visibleColIx"
                (mousedown)="thSelectStart(colIx)"
                (mouseup)="thSelectEnd(colIx)"

            >
              {{dataModel.th[colIx]}}
            </th>
          </tr>
          </thead>
          <tbody>
          <tr *ngFor="let row of dataModel.specialRows; let rowIx = index">
            <td class="rowh">{{dataModel.specialRowsLabels[rowIx]}}</td>
            <td *ngFor="let colIx of visibleColIx"
                [style.background-color]="bgColors[colIx] ? bgColors[colIx]:'inherited'"
            >{{row[colIx]}}
            </td>
          </tr>

          <tr *ngFor="let row of dataModel.rows; let rowIx = index">
            <td class="rowh">{{dataModel.rowsLabels[rowIx]}}</td>
            <td *ngFor="let colIx of visibleColIx"
                [style.background-color]="bgColors[colIx] ? bgColors[colIx]:'inherited'"
            >{{row[colIx]}}
            </td>
          </tr>
          </tbody>
        </table>
      </div>

    </div>
  `
})
export class DescribeTopcountTableComponent {

  lastCol: number;
  dataModel: DataGridModel;
  visibleColIx: number[];

  thSelectedCol: number;
  bgColors: string[];

  dataBlocks: ColumnBlockEntry[];
  timeColumnDescription: CellRangeDescription;
  @Output()
  onAccepted = new EventEmitter<ExcelTSImportParameters>();
  @Input()
  blocked = false;
  @Input()
  confirmDataLoss = false;
  private columnBlocks: ColumnBlocks;
  @ViewChild('columnTypeDialog', { static: false })
  private columnTypeDialog: ColumnTypeDialogComponent;
  @ViewChild('rowCopyDialog', { static: false })
  private rowCopyDialog: ConfirmRowCopyDialogComponent;
  @ViewChild('confirmDialog', { static: false })
  private confirmDialog: ConfirmDialogComponent;

  constructor() {

    // this.dataTable = this.fakeData();

    this.columnBlocks = new ColumnBlocks();
    this.dataBlocks = [];

    this.bgColors = [];

  }

  @Input()
  set dataTable(dataTable: string[][]) {

    // console.log("dataTable\n"+JSON.stringify(dataTable));

    if (!dataTable || dataTable.length < 1) {
      return;
    }

    const grid = new DataGridModel(dataTable, this.topcountHeaders(), undefined, [[]], ['L.']);
    this.dataModel = grid;
    this.lastCol = grid.width;

    this.visibleColIx = [];
    for (let c = 0; c < grid.width; c++) {
      this.visibleColIx.push(c);
    }

    // console.log("Last col: "+this.lastCol);
    // console.log("Cols: "+this.visibleColIx);
    // console.log("Model\n"+JSON.stringify(this.dataModel));

    this.initTime();
  }

  topcountHeaders(): string[] {
    const th = [];
    const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
    letters.forEach(letter => {
      for (let i = 1; i < 13; i++) {
        th.push(letter + i);
      }
    });
    return th;
  }

  initTime() {
    const range = new CellRange(new CellCoordinates(0, 0), new CellCoordinates(0, 0));

    const details = new TimeColumnProperties();
    details.timeType = TimeColumnType.TIME_IN_HOURS;
    details.timeOffset = 0;
    details.firstRow = 1;

    const description = new CellRangeDescription(range);
    description.role = CellRole.TIME;
    description.details = details;

    this.timeColumnDescription = description;
  }

  hasTime(): boolean {
    return (this.timeColumnDescription && (this.timeColumnDescription.role === CellRole.TIME));
  }

  hasData(): boolean {
    return this.dataBlocks.some(entry => entry.details.role === CellRole.DATA);
  }

  rowSelected(rowIx: number) {

    const values = this.joinRow(rowIx);

    const f = new CellCoordinates(0, rowIx + 1);
    const range = new CellRange(f, f);

    const rangeDescription = new CellRangeDescription(range, values);
    this.rowCopyDialog.show(rangeDescription);

  }

  thSelectStart(colIx: number) {
    // console.log("MSelect: "+colIx);
    this.thSelectedCol = colIx;
    // this.thStyles[colIx] = "th_yellow";
  }

  thSelectEnd(colIx: number) {
    // console.log("MSelect end: "+colIx);

    if (this.thSelectedCol != undefined && this.thSelectedCol != null) {
      const f = new CellCoordinates(this.thSelectedCol + 1, 1);
      const l = new CellCoordinates(colIx + 1, 1);
      const range = new CellRange(f, l);

      const rangeDescription = new CellRangeDescription(range, undefined);

      const existing = this.columnBlocks.details(f.col);
      if (existing) {
        rangeDescription.role = existing.role;
        rangeDescription.details = existing.details;
      }

      const label = this.rangeToTopcountLabel(rangeDescription);
      this.thSelectedCol = undefined;
      this.columnTypeDialog.show(rangeDescription, label);
    }
  }

  rangeToTopcountLabel(rangeDescription: CellRangeDescription): string {
    const range = rangeDescription.range;
    return colNrToTopCountWellName(range.firstCol) + '-' + colNrToTopCountWellName(range.lastCol);
  }

  editTime() {
    if (this.timeColumnDescription) {
      this.columnTypeDialog.show(this.timeColumnDescription);
    }
  }

  editBlock(block: ColumnBlockEntry) {
    if (block) {
      const label = this.rangeToTopcountLabel(block.details);
      this.columnTypeDialog.show(block.details, label);
    }
  }

  deleteBlock(block: ColumnBlockEntry) {
    // console.log("Delete called "+block.details.role.name+" "+block.details.range.columnRangeLabel);
    if (block) {
      if (block.details.role == CellRole.TIME) {
        this.clearTime();
      } else {
        this.resetRegion(block.details.range);
      }
      this.dataBlocks = this.columnBlocks.blocks;
    }
  }

  accept() {
    if (!this.hasTime() || !this.hasData()) {
      return;
    }

    let gapP = Promise.resolve(true);

    if (this.containsDataGaps()) {
      gapP = this.confirmDialog.ask(
        'Do you want to import partial data?',
        'Not all columns are described. Data columns without annotations will not be imported.' +
        '<br>Click OK if you want to proceed.'
      );
    }


    gapP.then(ans => {
      if (!ans) {
        return false;
      }
      if (!this.confirmDataLoss) {
        return true;
      }
      return this.confirmDialog.ask(
        'Do you want to replace the existing data?',
        'It will also erase all analysis results. ' +
        '<br>Click OK if you want to proceed.'
      );
    })
      .then(ans => {
        if (ans) {
          this.emitParameters();
        }
      })
      .catch(err => console.log('Dialog error: ' + err));
  }

  containsDataGaps(): boolean {
    if (this.dataBlocks.length < 1) {
      return true;
    }
    if (this.dataBlocks[this.dataBlocks.length - 1].end < this.lastCol) {
      return true;
    }
    let last = this.dataBlocks[0].start - 1;
    for (let ix = 0; ix < this.dataBlocks.length; ix++) {
      if (this.dataBlocks[ix].start != (last + 1)) {
        return true;
      } else {
        last = this.dataBlocks[ix].end;
      }
    }
    return false;
  }

  emitParameters() {
    const params = new ExcelTSImportParameters();
    params.timeColumn = this.timeColumnDescription;

    // console.log("cmp DB", this.dataBlocks);
    params.dataBlocks = this.dataBlocks.map(db => db.details);
    // console.log("send DB", params.dataBlocks);

    this.onAccepted.emit(params);
  }

  joinRow(rowIx: number): string {

    return this.dataModel.rows[rowIx].slice(0, 10).join(' | ') + '...';
  }


  setColumnType(details: CellRangeDescription) {
    // this.unmarkThSelection();

    if (details && details.role !== undefined) {

      // clearing existing time
      if (this.timeColumnDescription) {
        if (details.role == CellRole.TIME) {
          this.clearTime();
        } else if (this.timeColumnDescription.firstCol >= details.firstCol && this.timeColumnDescription.firstCol <= details.lastCol) {
          this.clearTime();
        }
      }


      let label: string;

      switch (details.role) {
        case CellRole.IGNORED:
          label = 'ign.';
          break;
        case CellRole.BACKGROUND:
          label = 'bcg.';
          break;
        case CellRole.TIME:
          label = 'Time';
          break;
        case CellRole.DATA:
          label = details.details.dataLabel;
      }

      // details.details = details.details.dataLabel;
      this.columnBlocks.insert(details, label);
      this.columnBlocks.merge();

      this.dataBlocks = this.columnBlocks.blocks;

      const labels = this.dataModel.specialRows[0];
      if (labels) {
        for (let i = details.firstCol - 1; i < details.lastCol; i++) {
          labels[i] = label;
        }
      }

      if (details.role == CellRole.TIME) {
        this.timeColumnDescription = details;
      }

      this.updateBackgrounds();
    }
  }

  copyRowAsLabels(details: CellRangeDescription) {
    if (details) {
      // console.log("Copying rows: "+details.range.first.row);

      this.clearTime();

      const labels = this.dataModel.specialRows[0];
      const row = this.dataModel.rows[details.range.first.row - 1];

      row.forEach((label: any, colIx: number) => {

        if (label) {
          const details = new DataColumnProperties(label);
          // details.dataLabel = label;
          const c = new CellCoordinates(colIx + 1, 0);
          const range = new CellRange(c, c);
          const desc = new CellRangeDescription(range, undefined);
          desc.details = details;
          desc.role = CellRole.DATA;

          this.columnBlocks.insert(desc, label);
          labels[colIx] = label;
        }
      });


      this.columnBlocks.merge();
      this.dataBlocks = this.columnBlocks.blocks;

      this.updateBackgrounds();

    }
  }


  clearTime() {
    if (this.timeColumnDescription) {
      this.resetRegion(this.timeColumnDescription.range);
      this.timeColumnDescription = undefined;
    }
  }

  updateBackgrounds() {
    for (let i = 0; i < this.dataBlocks.length; i++) {
      const block = this.dataBlocks[i];
      let color = ColorCycler.color(i);
      if (block.details.role == CellRole.IGNORED) {
        color = ColorCycler.IGNORED_BG;
      }
      if (block.details.role == CellRole.BACKGROUND) {
        color = ColorCycler.NOISE_BG;
      }
      if (block.details.role == CellRole.TIME) {
        color = ColorCycler.TIME_BG;
      }

      for (let col = block.start - 1; col < block.end; col++) {
        this.bgColors[col] = color;
      }

    }
  }

  resetRegion(range: CellRange) {
    this.resetLabels(range);
    this.resetBackground(range);
    this.columnBlocks.delete(range);
  }

  resetBackground(range: CellRange) {
    // console.log("resetBG: "+col);
    for (let i = range.firstCol - 1; i < range.lastCol; i++) {
      this.bgColors[i] = 'transparent';
    }
  }

  resetLabels(range: CellRange) {

    const labels = this.dataModel.specialRows[0];
    for (let i = range.firstCol - 1; i < range.lastCol; i++) {
      labels[i] = '-';
    }
  }


  fakeData(): string[][] {

    const cols = 25;
    const rows: string[][] = [];

    let row: string[] = [];
    row.push('');
    for (let i = 1; i < cols; i++) {
      row.push('RO ' + i);
    }
    rows.push(row);

    row = [];
    row.push('');
    for (let i = 1; i < cols; i++) {
      row.push('cls' + Math.round(i / 3));
    }
    rows.push(row);


    for (let r = 1; r < 5; r++) {
      row = [];
      row.push('' + r);
      for (let i = 1; i < cols; i++) {
        row.push('' + (r + i));
      }
      rows.push(row);
    }


    return rows;
  }
}
