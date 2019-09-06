import {Component, Input, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';

import {RevertableFormComponent} from '../../../shared/revertable-form.component';
import {ContributionDesc} from '../../../dom/repo/contribution/contribution-desc';
import {Funding} from '../../../dom/repo/contribution/funding';
import {Institution} from '../../../dom/repo/actors/institution';
import {Person} from '../../../dom/repo/actors/person';
import {removeItemFromArr} from '../../../shared/collections-util';
import {ContributionDescValidator} from '../../../dom/repo/contribution/contribution-desc.validator';

@Component({
  selector: 'bd2-contr-desc-form',
  templateUrl: './contribution-desc-form.component.html',
  outputs: ['onAccepted', 'onCancelled']
})
export class ContributionDescFormComponent extends RevertableFormComponent<ContributionDesc> {

  @Input()
  okLabel = 'Save';

  @Input()
  blocked = false;

  @ViewChild('persForm', { static: false }) persForm: NgForm;
  firstName: string;
  lastName: string;

  @ViewChild('instForm', { static: false }) instForm: NgForm;
  institutionName: string;

  @ViewChild('fundForm', { static: false }) fundForm: NgForm;
  funderName: string;
  grantNr: string;


  constructor() {
    super(ContributionDescValidator.INSTANCE);
  }

  get model(): ContributionDesc {
    return this._model;
  }

  @Input()
  set model(model: ContributionDesc) {
    this.setModel(model);
  }


  /*
  validate(obj:ContributionDesc):string[] {
    if (obj.authors.length < 1)
      return ['At least one author is required'];
  }*/

  addAuthor() {
    const p = this.selectedPerson();
    if (p) {
      this._model.authors.push(p);
      this.resetPerson();
      this.triggerValidation();
    }
  }

  addCurator() {
    const p = this.selectedPerson();
    if (p) {
      this._model.curators.push(p);
      this.resetPerson();
    }
  }

  removeAuthor(person: Person) {
    removeItemFromArr(person, this._model.authors);
    this.triggerValidation();
  }

  removeCurator(person: Person) {
    removeItemFromArr(person, this._model.curators);
  }

  addInstitution() {
    const i = this.selectedInstitution();
    if (i) {
      if (this.hasInstitution(i, this._model)) {
        return;
      }
      this._model.institutions.push(i);
      this.resetInstitution();
    }
  }

  hasInstitution(inst: Institution, m: ContributionDesc): boolean {

    return (m.institutions.findIndex(val => val.name === inst.name) >= 0);
  }

  removeInstitution(inst: Institution) {
    removeItemFromArr(inst, this.model.institutions);
  }

  addFunding() {
    const i = this.selectedFunding();
    if (i) {
      if (this.hasFunding(i, this._model)) {
        return;
      }
      this._model.fundings.push(i);
      this.resetFunding();
    }
  }

  hasFunding(funding: Funding, m: ContributionDesc): boolean {

    return (m.fundings.findIndex(f => f.name === funding.name) >= 0);
  }

  removeFunding(funding: Funding) {
    removeItemFromArr(funding, this._model.fundings);
  }

  protected resetPerson() {
    this.firstName = undefined;
    this.lastName = undefined;
    this.persForm.reset();
  }

  protected selectedPerson(): Person {
    if (this.firstName && this.lastName) {
      return new Person(this.firstName, this.lastName);
    } else {
      return null;
    }
  }

  protected resetInstitution() {
    this.institutionName = undefined;
    this.instForm.reset();
  }

  protected selectedInstitution(): Institution {
    if (this.institutionName) {
      return new Institution(this.institutionName);
    } else {
      return null;
    }
  }

  protected resetFunding() {
    this.funderName = undefined;
    this.grantNr = undefined;
    this.fundForm.reset();
  }

  protected selectedFunding(): Funding {
    if (this.funderName) {
      const i = new Institution(this.funderName);
      const f = new Funding();
      f.institution = i;
      f.grantNr = this.grantNr;
      return f;
    } else {
      return null;
    }
  }

}
