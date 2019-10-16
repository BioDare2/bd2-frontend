import {OnDestroy, OnInit} from '@angular/core';
import {ImportDetails} from '../import-dom';
import {SelectionColorCycler, TableSelector} from './data-sheet-mdtable/table-styling';
import {CellSelection, DataTableSlice, Slice} from './data-table-dom';
import {DataTableService} from './data-table.service';
import {FeedbackService} from '../../../feedback/feedback.service';


export class DataTableDependentStep implements OnInit, OnDestroy {

  importDetails: ImportDetails;

  tableSelector = new TableSelector();

  dataSlice: DataTableSlice;

  page: Slice;

  get firstTimeCell() {
    return this.importDetails ? this.importDetails.firstTimeCell : undefined;
  }

  get labelsSelection() {
    return this.importDetails ? this.importDetails.labelsSelection : undefined;
  }

  constructor(protected dataService: DataTableService, protected feedback: FeedbackService) { }

  ngOnInit() {

    this.page = Slice.firstPage();

    this.dataService.error$.forEach( err => this.feedback.error(err));

    this.dataService.dataSlice$.subscribe(
      dataSlice => this.setDataSlice(dataSlice),
      err => this.feedback.error(err)
    );
  }

  ngOnDestroy(): void {
    if (this.dataService) {
      this.dataService.close();
    }
  }

  setDataSlice(dataSlice: DataTableSlice) {
    this.dataSlice = dataSlice;
  }

  loadData() {
    if (this.importDetails) {
      this.dataService.fileIdFormat([this.importDetails.fileId, this.importDetails.importFormat.name]);
      this.dataService.slice(this.page);
      this.tableSelector.reset();
    }
  }

  selectFirstTime(selection: CellSelection) {
    this.importDetails.firstTimeCell = selection;
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
    if (selection) {
      if (this.importDetails.inRows) {
        this.tableSelector.toggleCol(selection, false, SelectionColorCycler.LABELS_BACKGROUND);
      } else {
        this.tableSelector.toggleRow(selection, false, SelectionColorCycler.LABELS_BACKGROUND);
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

    return selection;
  }

  hasMoreTimes() {
    if (!this.importDetails || !this.dataSlice) {
      return false;
    }

    if (this.importDetails.inRows) {
      return this.page.colPage.pageSize < this.dataSlice.totalColumns;
    } else {
      return this.page.rowPage.pageSize < this.dataSlice.totalRows;
    }
  }

  hasMoreLabels() {
    if (!this.importDetails || !this.dataSlice) {
      return false;
    }

    if (!this.importDetails.inRows) {
      return this.page.colPage.pageSize < this.dataSlice.totalColumns;
    } else {
      return this.page.rowPage.pageSize < this.dataSlice.totalRows;
    }
  }


}
