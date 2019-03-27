import {async, ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';

import {HboxPlotModule} from 'bd2-ngx-hboxplot';
import {PolarPlotModule} from 'bd2-ngx-polarplot';
import {PPAJobPaneComponent} from './ppajob-pane.component';
import {PPAService} from '../../ppa.service';
import {FormsModule} from '@angular/forms';
import {PhasesOptionsWidgetComponent} from './phases-options-widget.component';
import {PPAJobSummary} from '../../ppa-dom';
import {LegendModule} from '../../../../graphic/legend/legend.module';
import {SVGSaverModule} from '../../../../graphic/svg-saver/svg-saver.module';
import {PPAStatsTableComponent} from './ppastats-table/ppastats-table.component';
import {PPAJobResultsTableComponent} from './ppajob-results-table/ppajob-results-table.component';
import {RouterTestingModule} from '@angular/router/testing';


describe('PPAJobPaneComponent', () => {
  let component: PPAJobPaneComponent;
  let fixture: ComponentFixture<PPAJobPaneComponent>;
  let ppaService: PPAService;

  beforeEach(async(() => {
    ppaService = jasmine.createSpyObj('ppaService', ['getPPAJob']);

    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        HboxPlotModule,
        PolarPlotModule,
        LegendModule,
        SVGSaverModule,
        RouterTestingModule
      ],
      declarations: [PPAJobPaneComponent, PPAStatsTableComponent, PhasesOptionsWidgetComponent, PPAJobResultsTableComponent],
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

    const jobId = 2;
    const assayId = 3;
    let job: PPAJobSummary;

    beforeEach(() => {
      job = new PPAJobSummary();
      job.jobId = jobId;

    });

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

    }));

    it('job is subscribed to currentJobStream', fakeAsync(() => {

      component.jobStream.next(job);
      tick();
      expect(component.job).toBe(job);

    }));
  });
});
