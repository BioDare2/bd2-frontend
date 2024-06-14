
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PolarPlotComponent } from './polar-plot.component';
import { PolarPoint} from '../polar-plot-utils/polar-plot.dom';
import {PolarDomainUtil} from '../polar-plot-utils/polar-domain-util';
import {BD2ColorPalette} from '../polar-plot-utils/color-palette';

describe('PolarPlotComponent', () => {
  let component: PolarPlotComponent;
  let fixture: ComponentFixture<PolarPlotComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PolarPlotComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PolarPlotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  /*
  it('prepareIndividualPolarData converts to polar and adds color ix', () => {

    const data = [[15, 16], [2, 2], [3]];
    const domain = [0, 24, 24];
    const palette = BD2ColorPalette.palette(data.length);
    const ans: PolarPoint[][] = component.prepareIndividualPolarData(data, domain, [], palette);
    expect(ans).toBeTruthy();
    expect(ans.length).toBe(3);
    expect(ans[2].length).toBe(1);
    expect(ans[2][0].color).toBe(palette[2]);
  });*/

  it('emits new palete after update', waitForAsync(() => {

    component.data = [[15, 16], [2], [3]];
    component.domain = [12, 24];

    let pallete: string[];
    component.colors.subscribe( p => pallete = p);

    component.updatePlot();
    fixture.whenStable().then( () => {

      expect(pallete).toBeDefined();
      expect(pallete.length).toBe(3);
    });

  }));

  it('creates a plot with two petals and data points', waitForAsync(() => {
    component.data = [[15, 16], [2]];
    component.domain = [12, 24];
    component.showIndividuals = 'all';

    // have to call it manually fixture detectChanges does not work
    component.ngOnChanges({});
    // fixture.detectChanges();

    fixture.whenStable().then( () => {
      const compiled = fixture.debugElement.nativeElement;

      // the grid
      expect(compiled.querySelector('.polarplot svg')).toBeTruthy();
      expect(compiled.querySelector('.polarplot .axisWrapper')).toBeTruthy();
      expect(compiled.querySelectorAll('.polarplot .axisWrapper .gridCircle').length).toBe(3);
      expect(compiled.querySelectorAll('.polarplot .axisWrapper .axis').length).toBe(8);
      expect(compiled.querySelectorAll('.polarplot .axisWrapper .axis line').length).toBe(8);
      expect(compiled.querySelectorAll('.polarplot .axisWrapper .axis .legend').length).toBe(8);
      expect(compiled.querySelector('.polarplot .axisWrapper .axis .legend').textContent).toContain('12');

      // the petal
      expect(compiled.querySelector('.polarplot .petalsWrapper')).toBeTruthy();
      expect(compiled.querySelectorAll('.polarplot .petalsWrapper .petal').length).toBe(2);
      expect(compiled.querySelectorAll('.polarplot .petalsWrapper .petal path').length).toBe(4);
      expect(compiled.querySelectorAll('.polarplot .petalsWrapper .petal circle').length).toBe(2);

      // indiv
      expect(compiled.querySelector('.polarplot .dotsWrapper')).toBeTruthy();
      expect(compiled.querySelectorAll('.polarplot .dotsWrapper .dotsGroup').length).toBe(2);
      expect(compiled.querySelectorAll('.polarplot .dotsWrapper .dotsGroup circle').length).toBe(3);

      // individualDotsInsetWrapper
      expect(compiled.querySelector('.polarplot .dotsInset')).toBeTruthy();

      // console.log(compiled.querySelectorAll('.polarplot .axisWrapper .gridCircle').constructor.name);
    });

  }));


  it('shows inset with individual data points', waitForAsync(() => {
    component.data = [[15], [2, 1, 3]];
    component.domain = [12, 24];
    component.showIndividuals = 'selected';

    const p = (new PolarDomainUtil()).dataToPetal([2, 1, 3], [0, 24, 24]);
    // have to call it manually fixture detectChanges does not work
    component.ngOnChanges({});
    component.showIndividualDataInset(p, 1);
    // fixture.detectChanges();

    fixture.whenStable().then( () => {
      const compiled = fixture.debugElement.nativeElement;

      // individualDotsInsetWrapper
      expect(compiled.querySelector('.polarplot .dotsInset')).toBeTruthy();
      expect(compiled.querySelectorAll('.polarplot .dotsInset circle').length).toBe(3);
      // console.log(compiled.querySelectorAll('.polarplot .axisWrapper .gridCircle').constructor.name);
    });

  }));



});
