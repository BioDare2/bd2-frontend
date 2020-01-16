import {Component, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {ModalDirective} from 'ngx-bootstrap/modal';
import {
  CellCoordinates,
  CellRange,
  CellRangeDescription,
  CellRole,
  DataColumnProperties,
  TimeColumnProperties,
  TimeColumnType
} from '../../experiment/ts-data/ts-import/sheet-dom';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'bd2-column-type-dialog',
  template: `

    <div>

      <!-- Small modal -->
      <div bsModal #columnTypeModal="bs-modal" class="modal fade" tabindex="-1" role="dialog"
           aria-labelledby="columnTypeModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-sm">
          <div class="modal-content">
            <div class="modal-header">
              <button type="button" class="close" aria-label="Close" (click)="hide()">
                <span aria-hidden="true">&times;</span>
              </button>
              <h4 class="modal-title">Describe data column(s)</h4>
            </div>
            <div class="modal-body">

              <p>
                Columns <strong>[{{rangeLabel}}]</strong>
              </p>

              <form #columnTypeForm="ngForm">
                <div class="form-group">
                  <label>Column type</label>
                  <ul class="list-unstyled">
                    <li *ngFor="let opt of cellRoles">
                      <input type="radio" required
                             value="{{opt.name}}"
                             [(ngModel)]="cellRole"
                             name="fCellRole" #fCellRole="ngModel">
                      {{opt.label}}
                    </li>
                  </ul>
                </div>

                <div class="form-group" *ngIf="!isTime()">
                  <label for="size">Propagate until block size</label>
                  <input type="number" step="1" min="1" class="form-control"
                         id="size"
                         required
                         [(ngModel)]="rangeSize"
                         name="fSize" #fSize="ngModel"
                  >
                </div>

                <div class="form-group" *ngIf="isData()">
                  <label for="dataLabel">Label</label>
                  <input type="text" class="form-control"
                         id="dataLabel"
                         placeholder="e.g. TOC1 SD"
                         required minlength="2"
                         [(ngModel)]="dataLabel"
                         name="fDataLabel" #fDataLabel="ngModel"
                  >
                </div>

                <div *ngIf="isTime()">
                  <div class="form-group">
                    <label for="timeType">Type of time column</label>
                    <select class="form-control"
                            id="timeType"
                            required
                            [(ngModel)]="timeType"
                            name="fTimeType" #fTimeType="ngModel"
                    >
                      <option *ngFor="let opt of timeTypeOptions; let ix = index" value="{{opt.name}}">{{opt.label}}
                      </option>
                    </select>
                  </div>

                  <div class="form-group">
                    <label for="firstRow">Row with first timepoint</label>
                    <input type="number" class="form-control"
                           id="firstRow"
                           step="1" min="1" required
                           placeholder="e.g. 2"
                           [(ngModel)]="firstRow"
                           name="fFirstRow" #fFirstRow="ngModel"
                    >
                  </div>

                  <div class="form-group">
                    <label for="timeOffset">Time offset (hours)</label>
                    <input type="number" class="form-control"
                           id="timeOffset"
                           step="any"
                           placeholder="e.g. -4"
                           [(ngModel)]="timeOffset"
                           name="fTimeOffset" #fTimeOffset="ngModel"
                    >
                  </div>

                  <div class="form-group" *ngIf="isImageBased()">
                    <label for="imgInterval">Time between images (hours)</label>
                    <input type="number" class="form-control"
                           id="imgInterval"
                           required step="any" min="0.01"
                           placeholder="e.g. 1.5"
                           [(ngModel)]="imgInterval"
                           name="fImgInterval" #fImgInterval="ngModel"
                    >
                  </div>
                </div>

                <div *ngIf="errors">
                  <div *ngFor="let err of errors" dismissOnTimeout="3000" dismissible="true" class="alert alert-danger" role="alert">{{err}}</div>
                </div>
                <button class="btn btn-primary btn-sm" [disabled]="!columnTypeForm.form.valid"
                        (click)="acceptedAndNext()">OK and Next
                </button>
                <button class="btn btn-primary btn-sm" [disabled]="!columnTypeForm.form.valid" (click)="accepted()">OK
                </button>
                <button class="btn btn-outline-secondary btn-sm" (click)="hide()">Cancel</button>
              </form>
            </div>
          </div>
        </div>
      </div>

    </div>
  `,
  providers: []
})
export class ColumnTypeDialogComponent {

  @Input()
  lastCol: number;
  @Output()
  onAccepted = new EventEmitter<CellRangeDescription>();
  errors: string[] = null;
  rangeLabel: string;
  cellRole: string;
  cellRoles = [CellRole.IGNORED, CellRole.BACKGROUND, CellRole.TIME, CellRole.DATA];
  dataLabel: string;
  timeType: string;
  timeTypeOptions = [TimeColumnType.TIME_IN_HOURS, TimeColumnType.TIME_IN_MINUTES,
    TimeColumnType.TIME_IN_SECONDS, TimeColumnType.IMG_NUMBER];
  firstRow: number;
  timeOffset: number;
  imgInterval: number;
  rangeSize: number;
  private orgRange: CellRangeDescription;
  @ViewChild('columnTypeModal', { static: true })
  private myModal: ModalDirective;
  @ViewChild('columnTypeForm', { static: true })
  private columnTypeForm: NgForm;

  @Input()
  set showTime(val: boolean) {
    if (val) {
      this.cellRoles = [CellRole.IGNORED, CellRole.BACKGROUND, CellRole.TIME, CellRole.DATA];
    } else {
      this.cellRoles = [CellRole.IGNORED, CellRole.BACKGROUND, CellRole.DATA];
    }
  }

  isData(): boolean {
    return (this.cellRole === CellRole.DATA.name);
  }

  isTime(): boolean {
    return (this.cellRole === CellRole.TIME.name);
  }

  isImageBased(): boolean {
    return (this.isTime() && (this.timeType === TimeColumnType.IMG_NUMBER.name));
  }

  show(selectedRange: CellRangeDescription, label?: string) {

    if (!selectedRange) {
      return;
    }

    // if (this.columnTypeForm) this.columnTypeForm.reset();

    this.orgRange = selectedRange;

    this.rangeSize = selectedRange.range.size();
    this.rangeLabel = label ? label : selectedRange.columnRangeLabel;
    // this.rangeContent = selectedRange.content;
    if (selectedRange.role) {
      this.cellRole = selectedRange.role.name;
    }

    if (selectedRange.role == CellRole.DATA && selectedRange.details) {
      this.dataLabel = selectedRange.details.dataLabel;
    }
    if (selectedRange.role == CellRole.TIME && selectedRange.details) {
      this.timeType = selectedRange.details.timeType.name;
      this.timeOffset = selectedRange.details.timeOffset;
      this.imgInterval = selectedRange.details.imgInterval;
      this.firstRow = selectedRange.details.firstRow;
    }


    if (this.myModal) {
      this.myModal.show();
    }
  }

  hide() {
    if (this.myModal) {
      this.myModal.hide();
    }
  }

  accepted() {


    if (!this.isValid()) {
      return;
    }

    this.emitDescription();


    this.hide();
  }

  acceptedAndNext() {
    if (!this.isValid()) {
      return;
    }

    const description = this.emitDescription();
    if (description.range.lastCol >= this.lastCol) {
      this.hide();
      return;
    }

    const range = this.nextRange(description.range, this.rangeSize);
    const next = new CellRangeDescription(range);
    next.role = CellRole.DATA;

    this.show(next);

  }

  nextRange(last: CellRange, size: number) {

    const f = last.lastCol + 1;
    let l = f + size - 1;
    l = Math.min(l, this.lastCol);

    return new CellRange(new CellCoordinates(f, last.first.row), new CellCoordinates(l, last.first.row));
  }

  emitDescription(): CellRangeDescription {
    const range = this.recalculateRange(this.orgRange.range);

    let details: any = {};
    if (this.isData()) {
      details = new DataColumnProperties(this.dataLabel);
    } else if (this.isTime()) {
      const v = new TimeColumnProperties();
      v.firstRow = this.firstRow;
      v.timeType = TimeColumnType.get(this.timeType);
      v.timeOffset = this.timeOffset;
      if (this.isImageBased()) {
        v.imgInterval = this.imgInterval;
      }

      details = v;
    }

    const description = new CellRangeDescription(range, this.orgRange.content);
    description.role = CellRole.get(this.cellRole);
    description.details = details;

    this.onAccepted.emit(description);

    return description;

  }

  protected isValid(): boolean {
    const err: string[] = [];
    const role = CellRole.get(this.cellRole);
    if (!role) {
      err.push('Unknown role: ' + this.cellRole);
    }
    if (this.isData()) {
      if (!this.dataLabel || this.dataLabel.trim() === '') {
        err.push('Non empty data label is required');
        this.dataLabel = null;
      }
    }
    if (this.isTime()) {
      if (!this.firstRow || this.firstRow < 1) {
        err.push('Row nr of the first time point must be >= 1');
      }
      if (this.isImageBased()) {
        if (!this.imgInterval || this.imgInterval <= 0) {
          err.push('Image interval must be > 0');
        }
      }
    } else {
      // not time
      if (!this.rangeSize || this.rangeSize < 1) {
        err.push('Block size must be >= 1');
      }
    }

    if (err.length === 0) {
      this.errors = null;
      return true;
    }
    return false;

  }

  protected recalculateRange(range: CellRange): CellRange {

    let f = range.first;
    // let l = range.last;

    if (this.isTime()) {
      // set row to selected time row
      f = new CellCoordinates(f.col, this.firstRow);
      return new CellRange(f, f);
    }


    if (this.rangeSize !== range.size()) {
      const nr = f.col + this.rangeSize - 1;
      const l = new CellCoordinates(Math.min(nr, this.lastCol), f.row);
      return new CellRange(f, l);
    }
    return range;
  }
}
