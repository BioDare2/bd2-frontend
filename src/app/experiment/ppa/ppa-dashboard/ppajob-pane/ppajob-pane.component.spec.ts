import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import {PPAJobPaneComponent} from './ppajob-pane.component';
import {PPAService} from '../../ppa.service';
import {PhasesOptionsWidgetComponent} from './phases-options-widget.component';
import {PPAJobSummary} from '../../ppa-dom';
import {RouterTestingModule} from '@angular/router/testing';
import {PPAStatsTable2Component} from './ppastats-table2/ppastats-table2.component';
import {PPAResultsTable2Component} from './pparesults-table2/pparesults-table2.component';
import {PPAPlotsComponentTestModule} from './ppaplots/ppaplots.component.spec';
import {NgModule} from '@angular/core';
import {PPADialogsService} from '../../ppa-dialogs/ppadialogs.service';
import {MatDialogModule} from '@angular/material/dialog';

@NgModule({
  imports: [
    RouterTestingModule,
    PPAPlotsComponentTestModule,
    MatDialogModule
  ],
  exports: [
    RouterTestingModule,
    PPAPlotsComponentTestModule,
    PPAJobPaneComponent
  ],
  declarations: [ PPAJobPaneComponent, PPAStatsTable2Component, PPAResultsTable2Component,
    PhasesOptionsWidgetComponent ],
  providers: [PPADialogsService]
})
export class PPAJobPaneComponentTestModule {
}

describe('PPAJobPaneComponent', () => {
  let component: PPAJobPaneComponent;
  let fixture: ComponentFixture<PPAJobPaneComponent>;
  let ppaService: PPAService;

  beforeEach(waitForAsync(() => {
    ppaService = jasmine.createSpyObj('ppaService', ['getPPAJob']);

    TestBed.configureTestingModule({
      imports: [
        PPAJobPaneComponentTestModule
      ],
      declarations: [ ],
      providers: [
        {provide: PPAService, useValue: ppaService},
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PPAJobPaneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('initilizations', () => {

    const jobId = '2';
    const assayId = 3;
    let job: PPAJobSummary;

    beforeEach(() => {
      job = new PPAJobSummary();
      job.jobId = jobId;

    });

    /*
    it('loadJob takes job from service', () => {

      (ppaService.getPPAJob as any).and.returnValue(Promise.resolve(job));

      component.loadJob(jobId, assayId);
      expect((ppaService.getPPAJob as any)).toHaveBeenCalled();
    });

    it('loadJob emits new current job', fakeAsync(() => {

      let current: PPAJobSummary;
      (ppaService.getPPAJob as any).and.returnValue(Promise.resolve(job));
      component.jobStream.subscribe(j => current = j, err => fail(err));

      component.loadJob(jobId, assayId);
      tick();
      expect(current).toBe(job);

    }));*/

    /*
    it('job is subscribed to currentJobStream', fakeAsync(() => {

      component.jobStream.next(job);
      tick();
      expect(component.job).toBe(job);

    }));*/
  });
});
