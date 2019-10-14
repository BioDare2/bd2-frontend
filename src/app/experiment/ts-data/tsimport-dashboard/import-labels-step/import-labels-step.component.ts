import {Component, Input, OnInit} from '@angular/core';
import {ImportDetails} from '../../import-dom';
import {CellSelection, DataTableSlice} from '../data-table-dom';
import {TableSelector} from '../data-sheet-mdtable/table-styling';

@Component({
  selector: 'bd2-import-labels-step',
  templateUrl: './import-labels-step.component.html',
  styles: []
})
export class ImportLabelsStepComponent implements OnInit {

  @Input()
  importDetails: ImportDetails;

  tableSelector = new TableSelector();

  dataSlice: DataTableSlice;

  get labelsSelection() {
    return this.importDetails ? this.importDetails.labelsSelection : undefined;
  }

  constructor() { }

  ngOnInit() {

    const data = new DataTableSlice();
    data.columnsNames = ['0', 'A', 'B', 'C', 'D', 'E', 'F', 'G ', 'H' ];
    data.columnsNumbers = [0, 1, 2,    3,   4,   5,   6,   7,    8];
    data.rowsNames = [0, 1, 2, 3, 4, 5, 6, 7, 8].map( v => '' + v);
    data.rowsNumbers = [0, 1, 2, 3, 4, 5, 6, 7, 8];

    data.data = [
      [0, 'A', 'B', 'C', 'D', 'E', 'F', 'G ', 'H', ],
      [1, 'toc 1 tr tra', 12345600, 1, 'toc 1 tr tra', 12345600, 2, 'toc 3232 ', 12.00012, ],
      [2, 'toc 3232 ', 12.00012, 2, 'toc 3232 ', 12.00012, 2, 'toc 3232 ', 12.00012, ],
      [3, 'toc 2323a', '12E-07', 3, 'toc 2323a', 12E-07, 3, 'toc 2323a', 12E-07, ],
      [4, 'wt', 12345600, 4, 'wt', 12345600, 4, 'wt', 12345600],
      [5, 'wt', 12345600, 5, 'wt', 12345600, 5, 'wt', 12345600, ],
      [6, 'sf f sffsdffdf a', 12345600, 6, 'sf f sffsdffdf a', 12345600, 6, 'sf f sffsdffdf a', 12345600, ],
      [7, 'sdfdsffd sdfdsfdfdsdfdfds', 12345600, 7, 'sdfdsffd sdfdsfdfdsdfdfds', 12345600, 7, 'sdfdsffd sdfdsfdfdsdfdfds', 12345600, ],
      [8, 'sdf sdfdsfdfdfd', 12345600, 8, 'sdf sdfdsfdfdfd', 12345600, 8, 'sdf sdfdsfdfdfd', 12345600, ],
    ];

    this.dataSlice = data;
  }

  loadData() {
    // load data
    if (this.importDetails && this.importDetails.firstTimeCell) {
      this.tableSelector.toggleRow(this.importDetails.firstTimeCell, true);
    }
  }

  selectLabels(selection: CellSelection) {
    this.tableSelector.toggleCol(selection);
    this.importDetails.labelsSelection = selection;
  }

}
