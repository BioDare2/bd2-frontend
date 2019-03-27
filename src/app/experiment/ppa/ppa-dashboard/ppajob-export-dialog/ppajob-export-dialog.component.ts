import {Component, OnInit, ViewChild} from '@angular/core';
import {ModalDirective} from 'ngx-bootstrap';
import {Subject} from 'rxjs';
import {first} from 'rxjs/operators';

@Component({
  selector: 'bd2-ppajob-export-dialog',
  template: `

    <div bsModal #exportDialog="bs-modal" (onHide)="hidden()" [config]="modalOptions"
         class="modal fade" tabindex="-1" role="dialog" aria-labelledby="exportDialog" aria-hidden="true">

      <div class="modal-dialog modal-sm">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" aria-label="Close" (click)="cancel()">
              <span aria-hidden="true">&times;</span>
            </button>
            <h4 class="modal-title">Export job results</h4>
          </div>
          <div class="modal-body">
            <label class="" for="phaseType">Phase type</label>
            <select class="form-control" required
                    id="phaseType"
                    [(ngModel)]="phaseType"
                    name="phaseType"
            >
              <option value="ByMethod">method specific</option>
              <option value="ByFit">by fit</option>
              <option value="ByFirstPeak">by first peak</option>
              <option value="ByAvgMax">by averaged peaks</option>

            </select>
            <hr>
            <div>
              <button class="btn btn-primary btn-sm" (click)="cancel()">Cancel</button>
              <button class="btn btn-primary btn-sm" (click)="accepted()">Export</button>
            </div>
          </div>
        </div>
      </div>

    </div>
  `,
  styles: []
})
export class PPAJobExportDialogComponent implements OnInit {

  // @Output()
  selected = new Subject<string>();
  modalOptions = {};
  phaseType = 'ByFit';

  @ViewChild(ModalDirective)
  private myModal: ModalDirective;

  constructor() {
  }

  ngOnInit() {
  }

  hidden() {
    console.log('Export dialog Hidden');
    this.selected.next(null);
  }


  cancel() {
    if (this.myModal) {
      this.myModal.hide();
    }
  }

  accepted() {
    this.selected.next(this.phaseType);

    if (this.myModal) {
      this.myModal.hide();
    }
  }


  show(phaseType?: string): Promise<string> {
    if (!this.myModal) {
      return Promise.resolve(null);
    }

    if (phaseType) {
      this.phaseType = phaseType;
    }

    this.myModal.show();

    return this.selected.pipe(first()).toPromise();

  }


}
