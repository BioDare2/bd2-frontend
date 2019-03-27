import {Component, OnInit} from '@angular/core';
import {ExperimentBaseComponent} from '../../experiment-base.component';
import {ExperimentComponentsDependencies} from '../../experiment-components.dependencies';

@Component({
  selector: 'bd2-publish-form',
  template: `
    <div *ngIf="assay">
      <h3>Publish experiment</h3>

      <div *ngIf="assay.features.isOpenAccess">
        <alert type="info">
          Experiment is already publicly available under <strong>{{assay.features.licence}}</strong> licence.
        </alert>
      </div>
      <div *ngIf="!assay.features.isOpenAccess">
        <alert type="danger">
          You are about to make the data public. Once they are public they cannot be made private again.
          <ul>
            <li>make sure you know what you are doing</li>
            <li>make sure all contributors agree to public sharing</li>
            <li>double check the description is correct, not all changes will be possible after the publishing</li>
          </ul>
        </alert>

        <form #publishForm="ngForm">

          <div class="form-group">
            <label for="licence">Licence</label>
            <select class="form-control"
                    id="licence"
                    required
                    placeholder="Select licence"
                    [(ngModel)]="licence"
                    name="licence" #licenceF="ngModel"

            >
              <option *ngFor="let opt of licences; let ix = index" [value]="opt">{{opt}}
              </option>
            </select>
          </div>

          <div class="form-group">
            <label><input type="checkbox" required
                          id="terms"
                          [(ngModel)]="terms"
                          name="fTerms" #fTerms="ngModel"> I understand that I cannot undo this operation </label>
          </div>

          <button type="submit" class="btn btn-primary" [disabled]="!publishForm.form.valid " (click)="publish()">
            Publish
          </button>

        </form>
      </div>
    </div>
  `,
  styles: []
})
export class PublishFormComponent extends ExperimentBaseComponent implements OnInit {

  licence: string;
  licences = ['CC_BY'];
  terms: boolean;

  constructor(serviceDependencies: ExperimentComponentsDependencies) {
    super(serviceDependencies);
  }


  ngOnInit() {
    super.ngOnInit();
    this.licence = this.licences[0];
  }

  publish() {
    if (this.terms && this.licence) {
      this.experimentService.publish(this.assay, this.licence)
        .then(exp => {
          this.feedback.success('Experiment: "' + exp.name + '" published.');
          return exp;
        })
        .then(exp => {
          this.currentExperiment.push(exp);
          return exp;
        })
        .then(exp => {
          this.goToExpHome(exp.id);
        })
        .catch(reason => {
          this.feedback.error(reason);
        });

    }
  }
}
