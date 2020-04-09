import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeatmapPlotComponent } from './heatmap-plot.component';
import {NgApexchartsModule} from 'ng-apexcharts';
import {Timepoint, Trace} from '../../../../tsdata/plots/ts-plot.dom';
import {serialize} from 'v8';

fdescribe('HeatmapPlotComponent', () => {
  let component: HeatmapPlotComponent;
  let fixture: ComponentFixture<HeatmapPlotComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NgApexchartsModule],
      declarations: [ HeatmapPlotComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeatmapPlotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('minmax gives correct using traces meta', ()=> {

    const traces:Trace[] = [];

    expect(component.minMax(traces)).toEqual([NaN, NaN]);


    let t = new Trace();
    t.min = -1;
    t.max = 10;
    traces.push(t);

    t = new Trace();
    t.min = 0;
    t.max = 100;
    traces.push(t);

    expect(component.minMax(traces)).toEqual([-1, 100]);

  });

  it('padds correctly data', ()=> {
    const data: Timepoint[] = [];
    expect(component.padData(data, 2)).toBe(data);

    const t = new Timepoint(2, 10);
    data.push(t);
    expect(component.padData(data, 2)).toBe(data);

    const exp = []
    exp.push(new Timepoint(0, 10));
    exp.push(new Timepoint(1, 10));
    exp.push(t);
    expect(component.padData(data, 0)).toEqual(exp);


  });

  it('maps traces to padded series', () => {

    const traces:Trace[] = [];
    expect(component.mapTracesToPaddedSeries(traces)).toEqual([]);

    let tr = new Trace();
    tr.label = '1';
    tr.data.push(new Timepoint(1, 1));
    tr.data.push(new Timepoint(2, 2));
    traces.push(tr);

    tr = new Trace();
    tr.label = '2';
    tr.data.push(new Timepoint(0, 2));
    tr.data.push(new Timepoint(1, 3));
    traces.push(tr);

    const exp = [];
    const d = [];
    d.push(new Timepoint(0, 1));
    d.push(new Timepoint(1, 1));
    d.push(new Timepoint(2, 2));

    exp.push( {
      name: '1', data: d
    });
    exp.push( {
      name: '2', data: tr.data
    });

    expect(component.mapTracesToPaddedSeries(traces)).toEqual(exp);


  });
});
