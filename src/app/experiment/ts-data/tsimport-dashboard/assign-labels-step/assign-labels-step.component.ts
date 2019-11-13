import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {LabelsToColors,} from '../data-sheet-mdtable/table-styling';
import {CellSelection, Slice} from '../data-table-dom';
import {DataTableDependentStep} from '../data-table-dependent-step';
import {DataTableService} from '../data-table.service';
import {FeedbackService} from '../../../../feedback/feedback.service';
import {MatDialog, MatPaginator, MatPaginatorIntl, PageEvent} from '@angular/material';
import {EditLabelDialogComponent, EditLabelDialogData} from './edit-label-dialog/edit-label-dialog.component';

@Component({
  selector: 'bd2-assign-labels-step',
  templateUrl: './assign-labels-step.component.html',
  styles: [],
  providers: [DataTableService],
  // tslint:disable-next-line:no-inputs-metadata-property
  inputs: ['importDetails']
})
export class AssignLabelsStepComponent extends DataTableDependentStep implements OnInit, OnDestroy, AfterViewInit {


  columnsLabels: string[] = [];
  rowsLabels: string[] = [];

  get userLabels() {
    return this.importDetails ? this.importDetails.userLabels : undefined;
  }

  colorer = new LabelsToColors();

  labelsSummary: string;

  @ViewChild('colPaginator', { static: true })
  colPaginator: MatPaginator;

  @ViewChild('rowPaginator', { static: true })
  rowPaginator: MatPaginator;


  constructor(public dialog: MatDialog, dataService: DataTableService, feedback: FeedbackService) {
    super(dataService, feedback);

  }




  ngOnInit() {
    super.ngOnInit();
  }

  ngOnDestroy(): void {
    super.ngOnDestroy();
    if (this.dataService) {
      // we created it so we close it
      this.dataService.close();
    }
  }

  ngAfterViewInit() {
    this.colPaginator._intl = new MatPaginatorIntl();
    this.colPaginator._intl.itemsPerPageLabel = 'Columns per page';

    this.rowPaginator._intl = new MatPaginatorIntl();
    this.rowPaginator._intl.itemsPerPageLabel = 'Rows per page';
  }

  markSelections() {
    super.markSelections();
    this.markFirstTime();

    this.loadLabels();
    this.markLabels();
    this.labelsSummary = this.importDetails.summarizeLabels(25);

    this.labelTime();
  }

  labelTime() {
    if (this.firstTimeCell) {
      if (this.importDetails.inRows) {
         const timeIx = this.dataSlice.rowsNumbers.indexOf(this.firstTimeCell.rowNumber);
         if (timeIx >= 0) { this.rowsLabels[timeIx] = 'Time'; }
      } else {
        const timeIx = this.dataSlice.columnsNumbers.indexOf(this.firstTimeCell.colNumber);
        if (timeIx >= 0) { this.columnsLabels[timeIx] = 'Time'; }
      }
    }

  }

  loadLabels() {
    const data = this.dataSlice;

    if (this.importDetails.inRows) {
      this.rowsLabels = this.userLabels.slice(data.rowsNumbers[0], data.rowsNumbers[data.rowsNumbers.length - 1]);
      this.columnsLabels = [];
    } else {
      this.rowsLabels = [];
      this.columnsLabels = this.userLabels.slice(data.columnsNumbers[0], data.columnsNumbers[data.columnsNumbers.length - 1]);
    }

  }

  markLabels() {
    this.userLabels.forEach( (label, ix) => {
      if (this.importDetails.inRows) {
        this.tableSelector.selectRow(ix, this.colorer.toColor(label));
      } else {
        this.tableSelector.selectCol(ix, this.colorer.toColor(label));
      }
    });
  }

  hasSeenAll() {
    if (!this.dataSlice) { return false; }

    if (this.importDetails.inRows) {
      return this.lastRowSeen >= this.dataSlice.totalRows - 1;
    } else {
      return this.lastColumnSeen >= this.dataSlice.totalColumns - 1;
    }
  }

  selected(selection: [CellSelection, CellSelection]) {
    console.log('Selected', selection);
    const s = selection[0].colName + selection[0].rowName;
    const e = selection[1].colName + selection[1].rowName;



    if (selection[1].isBeforeOrSame(selection[0])) {
      selection = [selection[1], selection[0]];
    }

    if (this.importDetails.inRows) {
      this.labelRows(selection[0], selection[1]);
    } else {
      this.labelColumns(selection[0], selection[1]);
    }

    console.log(s + '-' + e);
  }

  setUserLabel(realNumber: number, label: string) {
    this.userLabels[realNumber] = label ? label : undefined;
    this.labelsSummary = this.importDetails.summarizeLabels(25);
  }

  askForLabel(start: CellSelection, end: CellSelection, inRows: boolean) {

    let data: EditLabelDialogData;

    if (inRows) {
      data = {
        title: 'Label rows',
        regionName: start.hasSameIx(end) ? 'row ' + start.rowName : 'rows ' + start.rowName + '-' + end.rowName,
        label: this.userLabels[start.rowNumber]
      };
    } else {
      data = {
        title: 'Label columns',
        regionName: start.hasSameIx(end) ? 'column ' + start.colName : 'columns ' + start.colName + '-' + end.colName,
        label: this.userLabels[start.rowNumber]
      };
    }

    const dialogRef = this.dialog.open(EditLabelDialogComponent, {
      data
    });

    return dialogRef.afterClosed();
  }

  labelRows(start: CellSelection, end: CellSelection) {
    // console.log('Label rows', start);
    if (start.rowIx < 0 || end.rowIx < 0) {
      console.warn('Label rows with col selection', start);
      return;
    }

    if (this.firstTimeCell && this.firstTimeCell.rowNumber >= start.rowNumber) {
      // console.log('Ignroing labelling as Time row after selection');
      return;
    }

    this.askForLabel(start, end, true).subscribe( label => {
      if (label === undefined) {
        // console.log('Cancelled labelling');
        return;
      }
      this.setRowsLabel(start, end, label);
      if (label) { this.selectNextRegion(start, end); }
    });

  }

  setRowsLabel(start: CellSelection, end: CellSelection, label: string) {

      // console.log('Got label ', label);
      label = label.trim();

      const color = this.colorer.toColor(label);
      // console.log('COlor for' + label, color);


      for (let i = start.rowIx; i <= end.rowIx; i++) {
        const realNumber = this.dataSlice.rowsNumbers[i];
        if (realNumber === undefined) {
          console.error('No row number for index ' + i);
        } else {
          this.rowsLabels[i] = label;
          this.setUserLabel(realNumber, label);
          if (label) {
            this.tableSelector.selectRow(realNumber, color);
          } else {
            this.tableSelector.deselectRow(realNumber);
          }
        }
      }
  }

  labelColumns(start: CellSelection, end: CellSelection) {
    // console.log('Label cols', start);
    if (start.colIx < 0 || end.colIx < 0) {
      console.warn('Label cols with row selection', start);
      return;
    }

    if (this.firstTimeCell && this.firstTimeCell.colNumber >= start.colNumber) {
      console.log('Ignroing labelling as Time col after selection');
      return;
    }

    this.askForLabel(start, end, false).subscribe(label => {
      if (label === undefined) {
        // console.log('Cancelled labelling');
        return;
      }
      this.setColumnsLabel(start, end, label);
      if (label) { this.selectNextRegion(start, end); }
    });
  }

  setColumnsLabel(start: CellSelection, end: CellSelection, label: string) {

    // console.log('Will label with', label);
    label = label.trim();
    const color = this.colorer.toColor(label);


    for (let i = start.colIx; i <= end.colIx; i++) {
      const realNumber = this.dataSlice.columnsNumbers[i];
      if (realNumber === undefined) {
        console.error('No col number for index ' + i);
      } else {
        this.columnsLabels[i] = label;
        this.setUserLabel(realNumber, label);
        if (label) {
          this.tableSelector.selectCol(realNumber, color);
        } else {
          this.tableSelector.deselectCol(realNumber);
        }
      }
    }
  }

  selectNextRegion(start: CellSelection, end: CellSelection) {
    const sizes: [number, number] = [ end.colIx - start.colIx, end.rowIx - start.rowIx];

    let nextStart =  this.moveCell(end, [1, 1]);
    let nextEnd = this.moveCell(nextStart, sizes);

    if (!this.isInPage(nextStart)) { return; }
    if (!this.isInPage(nextEnd)) {
      nextEnd = this.fitToPage(nextEnd);
    }

    nextStart = this.reselect(nextStart);
    nextEnd = this.reselect(nextEnd);

    this.selected([nextStart, nextEnd]);
  }

  isInPage(cell: CellSelection) {
    if (cell.colIx >= 0 && cell.colIx >= this.dataSlice.columnsNumbers.length) {
      return false;
    }
    if (cell.rowIx >= 0 && cell.rowIx >= this.dataSlice.rowsNumbers.length) {
      return false;
    }
    return true;
  }

  fitToPage(cell: CellSelection) {
    const colIx = cell.colIx >= 0 ? this.dataSlice.columnsNumbers.length - 1 : -1;
    const rowIx = cell.rowIx >= 0 ? this.dataSlice.rowsNumbers.length - 1 : -1;

    return new CellSelection(colIx, undefined, undefined, rowIx, undefined, undefined, undefined);
  }

  moveCell(cell: CellSelection, by: [number, number]) {

    const colIx = cell.colIx >= 0 ? cell.colIx + by[0] : -1;
    const rowIx = cell.rowIx >= 0 ? cell.rowIx + by[1] : -1;

    return new CellSelection(colIx, undefined, undefined, rowIx, undefined, undefined, undefined);
  }

  loadColPage(page: PageEvent) {
    // console.log('Load cols', page);

    this.dataService.slice(new Slice(this.currentPageSlice.rowPage, page));

  }

  loadRowPage(page: PageEvent) {
    // console.log('Load rows', page);

    this.dataService.slice(new Slice(page, this.currentPageSlice.colPage));

  }

  moreColumns() {
    // console.log('More columns');
    if (!this.importDetails.inRows) {
      this.colPaginator.nextPage();
    }
  }

  moreRows() {

    // console.log('More rows');
    if (this.importDetails.inRows) {
      this.rowPaginator.nextPage();
    }

  }





}
