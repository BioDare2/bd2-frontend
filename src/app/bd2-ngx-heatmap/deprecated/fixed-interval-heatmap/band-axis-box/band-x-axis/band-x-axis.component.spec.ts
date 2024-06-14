import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import {BandXAxisComponent} from './band-x-axis.component';
import {VTickMarkComponent} from '../../../../plot-elements/axis/axis-box/x-axis/v-tick-mark/v-tick-mark.component';
import {scaleBand} from 'd3-scale';
import {CommonModule} from '@angular/common';
import {ChangeDetectionStrategy} from '@angular/core';

describe('BandXAxisComponent', () => {
  let component: BandXAxisComponent;
  let fixture: ComponentFixture<BandXAxisComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [BandXAxisComponent, VTickMarkComponent],
      imports: [CommonModule]
    })
    .overrideComponent(BandXAxisComponent , {
      set: {  changeDetection: ChangeDetectionStrategy.Default  }
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BandXAxisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('domain steps gives steps depending on points numbers', () => {

    expect(component.domainStep(10)).toBe(4);
    expect(component.domainStep(25)).toBe(4);
    expect(component.domainStep(30)).toBe(6);
    expect(component.domainStep(73)).toBe(6);
    expect(component.domainStep(80)).toBe(12);
    expect(component.domainStep(169)).toBe(12);
    expect(component.domainStep(170)).toBe(24);
    expect(component.domainStep(400)).toBe(24);

  });

  it('calculates ticks positions using the domain and the length depending steps', () => {
    const domain = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const scale = scaleBand<number>()
      .domain(domain)
      .range([0, 100]);

    let ticks = component.calculateTicksPosition(undefined);
    expect(ticks).toEqual([]);

    ticks = component.calculateTicksPosition(scale);
    expect(component.domainStep(domain.length)).toBe(4);
    expect(ticks).toEqual([1, 5, 9]);

  });

  it('prepare ticks makes ticks', () => {
    const domain = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const scale = scaleBand<number>()
      .domain(domain)
      .range([0, 100]);

    let ticks = component.prepareTicks(undefined);
    expect(ticks).toEqual([]);

    component.top = true;
    ticks = component.prepareTicks(scale);
    expect(component.domainStep(domain.length)).toBe(4);
    expect(ticks.length).toBe(3);

    let tick = ticks[0];
    expect(tick.label).toBe(1);
    expect(tick.x).toBe(5);
    expect(tick.y).toBe(0);
    expect(tick.top).toBe(true);

    tick = ticks[2];
    expect(tick.label).toBe(9);
    expect(tick.x).toBe(85);
    expect(tick.y).toBe(0);
    expect(tick.top).toBe(true);

  });

  it('ticksXPosition allocates in the middle of the band', () => {
    const domain = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const scale = scaleBand<number>()
      .domain(domain)
      .range([0, 10]);

    expect(component.tickXPosition(1, scale)).toBe(0.5);
    expect(component.tickXPosition(10, scale)).toBe(9.5);
  });

  it('ngOnChanges calculates parameters', () => {

    const domain = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const scale = scaleBand<number>()
      .domain(domain)
      .range([0, 10]);

    component.xScale = scale;
    component.yPosition = 20;
    component.top = true;

    component.ngOnChanges({});

    expect(component.axisTransform).toEqual('translate(0,20)');
    expect(component.x2).toBe(10);
    expect(component.ticks.length).toBeGreaterThan(1);
  });

  xit('detectChanges calculates parameters', () => {

    const domain = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const scale = scaleBand<number>()
      .domain(domain)
      .range([0, 10]);

    component.xScale = scale;
    component.yPosition = 20;
    component.top = true;

    fixture.detectChanges();

    expect(component.axisTransform).toEqual('translate(0,20)');
    expect(component.x2).toBe(10);
    expect(component.ticks.length).toBeGreaterThan(1);
  });

  it('renders svg elements', () => {

    const domain = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const scale = scaleBand<number>()
      .domain(domain)
      .range([0, 10]);

    component.xScale = scale;
    component.yPosition = 20;
    component.top = true;

    // detect changes does not calls it, why???
    component.ngOnChanges({});
    fixture.detectChanges();
    expect(component.ticks.length).toBeGreaterThan(1);

    const line = fixture.nativeElement.querySelector('line');
    expect(line).toBeDefined();
    expect(line.y2.baseVal.value).toBe(0);
    expect(line.x2.baseVal.value).toBe(10);


    const ticks = fixture.nativeElement.querySelectorAll('g.bd2hm-tickMark');
    expect(ticks).toBeDefined();
    expect(ticks.length).toBe(component.ticks.length);



  });

});
