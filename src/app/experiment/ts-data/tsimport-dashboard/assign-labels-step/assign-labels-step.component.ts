import { Component, OnInit } from '@angular/core';
import {TableSelector} from '../data-sheet-mdtable/table-styling';
import {CellSelection, DataTableSlice} from '../data-table-dom';

@Component({
  selector: 'bd2-assign-labels-step',
  templateUrl: './assign-labels-step.component.html',
  styles: []
})
export class AssignLabelsStepComponent implements OnInit {

  tableSelector = new TableSelector();

  dataSlice: DataTableSlice;

  constructor() { }

  ngOnInit() {

    const data = new DataTableSlice();
    data.columnsNames = ['A', 'B', 'C', 'D', 'E', 'F', 'G ', 'H', 'I' ];
    data.columnsNumbers = [0, 1, 2,    3,   4,   5,   6,   7,    8];
    data.rowsNames = [0, 1, 2, 3, 4, 5, 6, 7, 8].map( v => '' + v);
    data.rowsNumbers = [0, 1, 2, 3, 4, 5, 6, 7, 8];

    data.data = [
      ['A', 'B', 'C I am long labelr', 'WT toc1 3PR 690dfskldfljd', 'E', 'F', 'G ', 'H', 'I'],
      [1, 'toc 1 tr tra', 12345600, 1, 'toc 1 tr tra', 12345600, 2, 'toc 3232 ', 12.00012, ],
      [2, 'toc 3232 ', 12.00012, 2, 'toc 3232 ', 12.00012, 2, 'toc 3232 ', 12.00012, ],
      [3, 'toc 2323asdf sfsfddasdfsdfasdfsf dfaf s', '12E-07', 3, 'toc 2323a', 12E-07, 3, 'toc 2323a', 12E-07, ],
      [4, 'wt', 12345600, 4, 'wt', 12345600, 4, 'wt', 12345600],
      [5, 'wt', 12345600, 5, 'wt', 12345600, 5, 'wt', 12345600, ],
      [6, 'sf f sffsdffdf a', 12345600, 6, 'sf f sffsdffdf a', 12345600, 6, 'sf f sffsdffdf a', 12345600, ],
      [7, 'sdfdsffd sdfdsfdfdsdfdfds', 12345600, 7, 'sdfdsffd sdfdsfdfdsdfdfds', 12345600, 7, 'sdfdsffd sdfdsfdfdsdfdfds', 12345600, ],
      [8, 'sdf sdfdsfdfdfd', 12345600, 8, 'sdf sdfdsfdfdfd', 12345600, 8, 'sdf sdfdsfdfdfd', 12345600, ],
    ];

    this.dataSlice = data;
  }

  selected(selection: [CellSelection, CellSelection]) {
    console.log('Selected', selection);
    const s = selection[0].colName + selection[0].rowName;
    const e = selection[1].colName + selection[1].rowName;
    console.log(s + '-' + e);
  }
}
