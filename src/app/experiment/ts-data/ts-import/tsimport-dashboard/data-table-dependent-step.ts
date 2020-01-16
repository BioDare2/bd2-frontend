import {OnDestroy, OnInit} from '@angular/core';
import {CellSelection, ImportDetails} from '../import-dom';
import {SelectionColorCycler, TableSelector} from './data-sheet-mdtable/table-styling';
import {DataTableSlice, Slice} from './data-table-dom';
import {DataTableService} from './data-table.service';
import {FeedbackService} from '../../../../feedback/feedback.service';
import {Subscription} from 'rxjs';


export class DataTableDependentStep implements OnInit, OnDestroy {

  importDetails: ImportDetails;

  tableSelector = new TableSelector();

  dataSlice: DataTableSlice;

  firstPageSlice: Slice;
  currentPageSlice: Slice;

  lastColumnSeen = 0;
  lastRowSeen = 0;

  get firstTimeCell() {
    return this.importDetails ? this.importDetails.firstTimeCell : undefined;
  }

  get labelsSelection() {
    return this.importDetails ? this.importDetails.labelsSelection : undefined;
  }

  get dataStart() {
    return this.importDetails ? this.importDetails.dataStart : undefined;
  }

  dataSubscription: Subscription;

  constructor(protected dataService: DataTableService, protected feedback: FeedbackService) {
    this.firstPageSlice = Slice.firstPage();
    this.currentPageSlice = Slice.firstPage();
  }

  ngOnInit() {


    this.dataService.error$.forEach( err => this.feedback.error(err));

    this.dataSubscription = this.dataService.dataSlice$.subscribe(
      dataSlice => this.setDataSlice(dataSlice),
      err => this.feedback.error(err)
    );
  }

  ngOnDestroy(): void {
    if (this.dataSubscription) {
      this.dataSubscription.unsubscribe();
      // this.dataService.close(); we cannot close it as it is shared
    }
  }

  colNumber(colIx: number) {
    return colIx < 0 ? -1 : this.dataSlice.columnsNumbers[colIx];
  }

  rowNumber(rowIx: number) {
    return rowIx < 0 ? -1 : this.dataSlice.rowsNumbers[rowIx];
  }


  setDataSlice(dataSlice: DataTableSlice) {
    this.dataSlice = dataSlice;
    this.lastColumnSeen = Math.max(this.lastColumnSeen, dataSlice.columnsNumbers[dataSlice.columnsNumbers.length - 1]);
    this.lastRowSeen = Math.max(this.lastRowSeen, dataSlice.rowsNumbers[dataSlice.rowsNumbers.length - 1]);
    this.currentPageSlice = new Slice(dataSlice.rowPage, dataSlice.colPage);
    this.applySelection();
  }

  loadData() {
    if (this.importDetails) {
      this.lastColumnSeen = 0;
      this.lastRowSeen = 0;
      this.dataService.fileIdFormat([this.importDetails.fileId, this.importDetails.importFormat.name]);
      this.dataService.slice(this.firstPageSlice);
    }
    if (this.dataSlice) {
      this.applySelection();
    }
  }

  applySelection() {
    this.tableSelector.reset();
    this.markSelections();
    this.applyDefaultSelections();
  }

  applyDefaultSelections() {
  }

  markSelections() {
  }

  selectFirstTime(selection: CellSelection) {
    this.importDetails.firstTimeCell = selection;
    this.markFirstTime();
  }

  markFirstTime() {
    const selection = this.firstTimeCell;
    if (selection) {
      if (this.importDetails.inRows) {
        this.tableSelector.toggleRow(selection, true,
          SelectionColorCycler.TIME_BACKGROUND, SelectionColorCycler.FIRST_TIME_BACKGROUND);
      } else {
        this.tableSelector.toggleCol(selection, true,
          SelectionColorCycler.TIME_BACKGROUND, SelectionColorCycler.FIRST_TIME_BACKGROUND);
      }
    }
  }

  selectLabels(selection: CellSelection) {
    this.importDetails.labelsSelection = selection;
    this.markLabels();
  }

  markLabels() {
    const selection = this.labelsSelection;
    if (selection) {
      if (this.importDetails.inRows) {
        this.tableSelector.toggleCol(selection, false, SelectionColorCycler.LABELS_BACKGROUND);
      } else {
        this.tableSelector.toggleRow(selection, false, SelectionColorCycler.LABELS_BACKGROUND);
      }
    }
  }

  selectDataStart(selection: CellSelection) {

    if (selection) {
      if (this.importDetails.inRows) {
        if (!this.firstTimeCell || this.firstTimeCell.rowIx !== selection.rowIx) {
          this.importDetails.dataStart = selection;
        }
      } else {
        if (!this.firstTimeCell || this.firstTimeCell.colIx !== selection.colIx) {
          this.importDetails.dataStart = selection;
        }
      }
    } else {
      this.importDetails.dataStart = undefined;
    }
    this.markDataStart();
  }

  markDataStart() {
    const selection = this.dataStart;

    if (selection) {
      if (this.importDetails.inRows) {
          this.tableSelector.toggleRowSelection(1, selection, false,
            SelectionColorCycler.FIST_DATA_BACKGROUND);
      } else {
          this.tableSelector.toggleColSelection(1, selection, false,
            SelectionColorCycler.FIST_DATA_BACKGROUND);
      }
    }
  }

  reselect(oldSelection: CellSelection) {
    if (!this.dataSlice || !oldSelection) {
      return undefined;
    }

    const dataSlice = this.dataSlice;
    const colIx = oldSelection.colIx;
    const rowIx = oldSelection.rowIx;

    if (colIx >= dataSlice.columnsNumbers.length) {
      return undefined;
    }

    if (rowIx >= dataSlice.rowsNumbers.length) {
      return undefined;
    }

    const selectedRow = rowIx >= 0 ? dataSlice.data[rowIx] : [];
    const value = selectedRow[colIx];

    const selection = new CellSelection(
      colIx,
      dataSlice.columnsNumbers[colIx],
      dataSlice.columnsNames[colIx],
      rowIx,
      dataSlice.rowsNumbers[rowIx],
      dataSlice.rowsNames[rowIx],
      value
    );

    selection.fake = oldSelection.fake;
    return selection;
  }

  hasMoreTimes() {
    if (!this.importDetails || !this.dataSlice) {
      return false;
    }

    if (this.importDetails.inRows) {
      return this.firstPageSlice.colPage.pageSize < this.dataSlice.totalColumns;
    } else {
      return this.firstPageSlice.rowPage.pageSize < this.dataSlice.totalRows;
    }
  }

  hasMoreLabels() {
    if (!this.importDetails || !this.dataSlice) {
      return false;
    }

    if (!this.importDetails.inRows) {
      return this.firstPageSlice.colPage.pageSize < this.dataSlice.totalColumns;
    } else {
      return this.firstPageSlice.rowPage.pageSize < this.dataSlice.totalRows;
    }
  }


}
