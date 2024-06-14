import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import {VTickMarkComponent} from './v-tick-mark/v-tick-mark.component';
import {scaleLinear} from 'd3-scale';
import {CommonModule} from '@angular/common';
import {NumXAxisComponent} from './num-x-axis.component';
import {ChangeDetectionStrategy} from '@angular/core';

describe('NumXAxisComponent', () => {
  let component: NumXAxisComponent;
  let fixture: ComponentFixture<NumXAxisComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [NumXAxisComponent, VTickMarkComponent],
      imports: [CommonModule]
    })
    .overrideComponent(NumXAxisComponent , {
      set: {  changeDetection: ChangeDetectionStrategy.Default  }
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NumXAxisComponent);
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
    const domain = [1, 15];
    const scale = scaleLinear()
      .domain(domain)
      .range([0, 100]);

    let ticks = component.calculateTicksPosition(undefined);
    expect(ticks).toEqual([]);

    ticks = component.calculateTicksPosition(scale);
    expect(component.domainStep(15 - 1)).toBe(4);
    expect(ticks).toEqual([1, 5, 9, 13]);

  });

  it('prepare ticks makes ticks', () => {
    const domain = [1, 15];
    const scale = scaleLinear()
      .domain(domain)
      .range([0, 100]);

    let ticks = component.prepareTicks(undefined);
    expect(ticks).toEqual([]);

    component.top = true;
    ticks = component.prepareTicks(scale);
    expect(component.domainStep(15 - 1)).toBe(4);
    expect(ticks.length).toBe(4);

    let tick = ticks[0];
    expect(tick.label).toBe(1);
    expect(tick.x).toBe(0);
    expect(tick.y).toBe(0);
    expect(tick.top).toBe(true);

    tick = ticks[2];
    expect(tick.label).toBe(9);
    expect(tick.x).toBe(scale(9));
    expect(tick.y).toBe(0);
    expect(tick.top).toBe(true);

  });



  it('ngOnChanges calculates parameters', () => {

    const domain = [1, 15];
    const scale = scaleLinear()
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

    const domain = [1, 15];
    const scale = scaleLinear()
      .domain(domain)
      .range([0, 10]);

    component.xScale = scale;
    component.yPosition = 20;
    component.top = true;

    // does not calls ngOnChanges, why
    fixture.detectChanges();

    expect(component.axisTransform).toEqual('translate(0,20)');
    expect(component.x2).toBe(10);
    expect(component.ticks.length).toBeGreaterThan(1);
  });

  it('renders svg elements', () => {

    const domain = [1, 15];
    const scale = scaleLinear()
      .domain(domain)
      .range([0, 10]);

    component.xScale = scale;
    component.yPosition = 20;
    component.top = true;

    // not working, without calling WHY!!!!
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
