import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {ContributionDescFormComponent} from './contribution-desc-form.component';
import {ContributionDesc} from '../../../dom/repo/contribution/contribution-desc';
import {FormsModule} from '@angular/forms';
// import { By } from '@angular/platform-browser';
// import { DebugElement } from '@angular/core';


describe('ContributionDescFormComponent', () => {

  let component: ContributionDescFormComponent;
  let orgModel: ContributionDesc;
  let fixture: ComponentFixture<ContributionDescFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [ContributionDescFormComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    orgModel = new ContributionDesc();
    fixture = TestBed.createComponent(ContributionDescFormComponent);
    component = fixture.componentInstance;
    component.model = orgModel;
    fixture.detectChanges();
  });


  it('Does not adds duplicated institutions', () => {

    component.institutionName = 'Inst 1';
    component.addInstitution();
    expect(component.model.institutions.length).toBe(1);

    component.institutionName = 'Inst 1';
    component.addInstitution();
    expect(component.model.institutions.length).toBe(1);

    component.institutionName = 'Inst 2';
    component.addInstitution();
    expect(component.model.institutions.length).toBe(2);

  });

  it('Does not adds duplicated fundings', () => {
    component.funderName = 'Agg1';
    component.grantNr = 'XX';
    component.addFunding();
    expect(component.model.fundings.length).toBe(1);

    component.funderName = 'Agg1';
    component.grantNr = undefined;
    component.addFunding();
    expect(component.model.fundings.length).toBe(2);

    component.funderName = 'Agg1';
    component.grantNr = undefined;
    component.addFunding();
    expect(component.model.fundings.length).toBe(2);

    component.funderName = 'Agg1';
    component.grantNr = 'XX';
    component.addFunding();
    expect(component.model.fundings.length).toBe(2);
  });
});
