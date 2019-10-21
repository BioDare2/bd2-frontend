import {Component, OnDestroy, OnInit} from '@angular/core';
import {LabelsToColors, SelectionColorCycler, TableSelector} from '../data-sheet-mdtable/table-styling';
import {CellSelection, DataTableSlice} from '../data-table-dom';
import {ImportDetails} from '../../import-dom';
import {DataTableDependentStep} from '../data-table-dependent-step';
import {DataTableService} from '../data-table.service';
import {FeedbackService} from '../../../../feedback/feedback.service';

@Component({
  selector: 'bd2-assign-labels-step',
  templateUrl: './assign-labels-step.component.html',
  styles: [],
  providers: [DataTableService],
  // tslint:disable-next-line:no-inputs-metadata-property
  inputs: ['importDetails']
})
export class AssignLabelsStepComponent extends DataTableDependentStep implements OnInit, OnDestroy {


  columnsLabels: string[] = [];
  rowsLabels: string[] = [];
  userLabels: string[] = [];

  colorer = new LabelsToColors();

  constructor(dataService: DataTableService, feedback: FeedbackService) {
    super(dataService, feedback);


    this.importDetails = new ImportDetails();
    this.importDetails.inRows = false;
    this.importDetails.firstTimeCell = new CellSelection(1, 1, 'B', 1, 1, '1', 1);
  }

  /*
  set dataSlice(data: DataTableSlice) {
    this._dataSlice = data;

    this.rowsLabels = this.userLabels.slice(data.rowsNumbers[0], data.rowsNumbers[data.rowsNumbers.length - 1]);
    console.log('RL', this.rowsLabels);
    this.columnsLabels = this.userLabels.slice(data.columnsNumbers[0], data.columnsNumbers[data.columnsNumbers.length - 1]);
    console.log('CL', this.columnsLabels);


    if (this.firstTimeCell) {
      if (this.importDetails.inRows) {
        const timeIx = this.dataSlice.rowsNumbers.indexOf(this.firstTimeCell.rowNumber);
        if (timeIx >= 0) {
          this.tableSelector.tableStyler.setRowBackground(timeIx, SelectionColorCycler.TIME_BACKGROUND);
        }
      } else {
        const timeIx = this.dataSlice.columnsNumbers.indexOf(this.firstTimeCell.colNumber);
        if (timeIx >= 0) {
          this.tableSelector.tableStyler.setColBackground(timeIx, SelectionColorCycler.TIME_BACKGROUND);
        }
      }
    }
  }*/



  ngOnInit() {
    super.ngOnInit();
    const data = this.firstData();

    this.setDataSlice(data);

    // this.columnsLabels = data.columnsNames.map( v => 'L' + v);
    // this.rowsLabels = data.rowsNames.map( v => 'R' + v);


  }

  markSelections() {
    super.markSelections();
    this.markFirstTime();

    this.userLabels[4] = 'Fake label';
    this.loadLabels();
    this.markLabels();

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

    /*
    if (selection[0].colIx >= 0) {
      const label = 'L' + selection[0].colName + (new Date()).getTime();
      for (let i = selection[0].colIx; i <= selection[1].colIx; i++ ) {
        const uI = this.dataSlice.columnsNumbers[i];
        if (uI === undefined) {
          console.error('No column number for ix' + i);
        } else {
          this.columnsLabels[i] = label;
          this.userLabels[uI] = label;
        }
      }
    }

    if (selection[0].rowIx >= 0) {
      const label = 'R' + selection[0].rowName + '_' + (new Date()).getTime();
      for (let i = selection[0].rowIx; i <= selection[1].rowIx; i++ ) {
        const uI = this.dataSlice.rowsNumbers[i];
        if (uI === undefined) {
          console.error('No row number for index ' + i);
        } else {
          this.rowsLabels[i] = label;
          this.userLabels[uI] = label;
        }
      }
    } */

    console.log(s + '-' + e);
  }

  labelRows(start: CellSelection, end: CellSelection) {
    console.log('Label rows', start);
    if (start.rowIx < 0 || end.rowIx < 0) {
      console.warn('Label rows with col selection', start);
      return;
    }

    if (this.firstTimeCell && this.firstTimeCell.rowNumber >= start.rowNumber) {
      console.log('Ignroing labelling as Time row after selection');
      return;
    }


    const label = 'R' + start.rowName; // + '_' + (new Date()).getTime();
    const color = this.colorer.toColor(label);

    console.log('Will label with', label);

    for (let i = start.rowIx; i <= end.rowIx; i++) {
      const realNumber = this.dataSlice.rowsNumbers[i];
      if (realNumber === undefined) {
        console.error('No row number for index ' + i);
      } else {
        this.rowsLabels[i] = label;
        this.userLabels[realNumber] = label;
        this.tableSelector.selectRow(realNumber, color);
      }
    }
  }

  labelColumns(start: CellSelection, end: CellSelection) {
    console.log('Label cols', start);
    if (start.colIx < 0 || end.colIx < 0) {
      console.warn('Label cols with row selection', start);
      return;
    }

    if (this.firstTimeCell && this.firstTimeCell.colNumber >= start.colNumber) {
      console.log('Ignroing labelling as Time col after selection');
      return;
    }


    const label = 'L' + start.colName; // + '_' + (new Date()).getTime();
    const color = this.colorer.toColor(label);

    console.log('Will label with', label);

    for (let i = start.colIx; i <= end.colIx; i++) {
      const realNumber = this.dataSlice.columnsNumbers[i];
      if (realNumber === undefined) {
        console.error('No col number for index ' + i);
      } else {
        this.columnsLabels[i] = label;
        this.userLabels[realNumber] = label;
        this.tableSelector.selectCol(realNumber, color);
      }
    }
  }

  firstData() {
    const data = new DataTableSlice();
    data.columnsNames = ['A', 'B', 'C', 'D', 'E', 'F', 'G ', 'H', 'I' ];
    data.columnsNumbers = [0, 1, 2,    3,   4,   5,   6,   7,    8];
    data.rowsNames = [0, 1, 2, 3, 4, 5, 6, 7, 8].map( v => '' + (v + 1));
    data.rowsNumbers = [0, 1, 2, 3, 4, 5, 6, 7, 8];
    data.totalRows = 11;
    data.totalColumns = 11;

    data.data = [
      ['A', 'B', 'C I am long labelr', 'D toc1 3PR 690dfskldfljd', 'E', 'F', 'G ', 'H', 'I'],
      [1, 'toc 1 tr tra', 12345600, 1, 'toc 1 tr tra', 12345600, 2, 'toc 3232 ', 12.00012, ],
      [2, 'toc 3232 ', 12.00012, 2, 'toc 3232 ', 12.00012, 2, 'toc 3232 ', 12.00012, ],
      [3, 'toc 2323asdf sfsfddasdfsdfasdfsf dfaf s', '12E-07', 3, 'toc 2323a', 12E-07, 3, 'toc 2323a', 12E-07, ],
      [4, 'wt', 12345600, 4, 'wt', 12345600, 4, 'wt', 12345600],
      [5, 'wt', 12345600, 5, 'wt', 12345600, 5, 'wt', 12345600, ],
      [6, 'sf f sffsdffdf a', 12345600, 6, 'sf f sffsdffdf a', 12345600, 6, 'sf f sffsdffdf a', 12345600, ],
      [7, 'sdfdsffd sdfdsfdfdsdfdfds', 12345600, 7, 'sdfdsffd sdfdsfdfdsdfdfds', 12345600, 7, 'sdfdsffd sdfdsfdfdsdfdfds', 12345600, ],
      [8, 'sdf sdfdsfdfdfd', 12345600, 8, 'sdf sdfdsfdfdfd', 12345600, 8, 'sdf sdfdsfdfdfd', 12345600, ],
    ];

    return data;
  }

  moreColumns() {
    console.log('More columns');

    const data = new DataTableSlice();
    data.columnsNames = ['J', 'K'];
    data.columnsNumbers = [9, 10];
    data.rowsNames = [0, 1, 2, 3, 4, 5, 6, 7, 8].map( v => '' + (v + 1));
    data.rowsNumbers = [0, 1, 2, 3, 4, 5, 6, 7, 8];
    data.totalRows = 11;
    data.totalColumns = 11;

    data.data = [
      ['before last', 'last'],
      [1, 'toc 1 tr tra'],
      [2, 'toc 3232 '],
      [3, 'toc 2323asdf sfsfddasdfsdfasdfsf dfaf s'],
      [4, 'wt', 12345600],
      [5, 'wt', 12345600],
      [6, 'sf f sffsdffdf a'],
      [7, 'sdfdsffd sdfdsfdfdsdfdfds'],
      [8, 'sdf sdfdsfdfdfd', 12345600],
    ];

    this.setDataSlice(data);
  }

  moreRows() {

    console.log('More rows');

    const data = new DataTableSlice();
    data.columnsNames = ['A', 'B', 'C', 'D', 'E', 'F', 'G ', 'H', 'I' ];
    data.columnsNumbers = [0, 1, 2,    3,   4,   5,   6,   7,    8];
    data.rowsNames = [9, 10].map( v => '' + (v + 1));
    data.rowsNumbers = [9, 10];
    data.totalRows = 11;
    data.totalColumns = 9;

    data.data = [
      [9, 'tomcek', 12345600, 1, 'toc 1 tr tra', 12345600, 2, 'toc 3232 ', 12.00012, ],
      [10, 'rabn', 12.00012, 2, 'toc 3232 ', 12.00012, 2, 'toc 3232 ', 12.00012, ],
    ];

    this.setDataSlice(data);
  }

}
