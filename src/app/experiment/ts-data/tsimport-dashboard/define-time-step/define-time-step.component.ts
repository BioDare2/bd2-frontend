import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {ImportDetails} from '../../import-dom';
import {TimeColumnType} from '../../ts-import/sheet-dom';
import {CellSelection, DataTableSlice, Slice} from '../data-table-dom';
import {TableSelector} from '../data-sheet-mdtable/table-styling';
import {DataTableService} from '../data-table.service';
import {FeedbackService} from '../../../../feedback/feedback.service';

@Component({
  selector: 'bd2-define-time-step',
  templateUrl: './define-time-step.component.html',
  styles: [],
  providers: [ DataTableService]
})
export class DefineTimeStepComponent implements OnInit, OnDestroy {

  @Input()
  importDetails: ImportDetails;

  timeTypeOptions = [TimeColumnType.TIME_IN_HOURS, TimeColumnType.TIME_IN_MINUTES,
    TimeColumnType.TIME_IN_SECONDS, TimeColumnType.IMG_NUMBER];

  get firstTimeCell() {
    return this.importDetails ? this.importDetails.firstTimeCell : undefined;
  }

  tableSelector = new TableSelector();

  dataSlice: DataTableSlice;

  page: Slice;

  constructor(private dataService: DataTableService, private feedback: FeedbackService) { }

  ngOnInit() {

    /*
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

    if (this.importDetails && !this.importDetails.timeType) {
        this.importDetails.timeType = TimeColumnType.TIME_IN_HOURS;
    } */

    this.page = Slice.firstPage();

    this.dataService.error$.forEach( err => this.feedback.error(err));

    this.dataService.dataSlice$.subscribe(
      dataSlice => this.dataSlice = dataSlice,
      err => this.feedback.error(err)
    );
  }

  ngOnDestroy(): void {
    if (this.dataService) {
      this.dataService.close();
    }
  }

  public loadData() {
    if (this.importDetails) {
      this.dataService.fileIdFormat([this.importDetails.fileId, this.importDetails.importFormat.name]);
      this.dataService.slice(this.page);
    }
  }

  selectFirstTime(selection: CellSelection) {
    this.importDetails.firstTimeCell = selection;
    this.tableSelector.toggleRow(selection, true);
  }

  firstTimeNotNumber() {
    if (this.firstTimeCell) {
      return isNaN(Number(this.firstTimeCell.value));
    }
    return false;
  }


}
