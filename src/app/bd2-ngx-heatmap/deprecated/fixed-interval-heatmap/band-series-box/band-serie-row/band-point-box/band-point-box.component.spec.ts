import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import {BandPointBoxComponent} from './band-point-box.component';
import {scaleBand, scaleQuantize} from 'd3-scale';
import {TooltipService} from '../../../../../plot-elements/tooltip/tooltip.service';

describe('DataPointBoxComponent', () => {
  let component: BandPointBoxComponent;
  let fixture: ComponentFixture<BandPointBoxComponent>;
  let tooltip: jasmine.SpyObj<TooltipService>;


  beforeEach(waitForAsync(() => {
    tooltip = jasmine.createSpyObj('TooltipService', ['showTooltip', 'hideTooltip']);
    TestBed.configureTestingModule({
      declarations: [BandPointBoxComponent],
      providers: [{ provide: TooltipService, useValue: tooltip }]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BandPointBoxComponent);
    component = fixture.componentInstance;

    component.point = {x: 1, y: 2};
    component.yPosition = 20;
    component.yHeight = 10;
    component.xScale = scaleBand<any>().domain([1, 2]).range([0, 10]);
    component.colorScale = scaleQuantize<string>().domain([1, 2]).range(['a', 'b']);
    component.label = 'F';
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('showTooltip calls service with point and location', () => {
    component.ngOnChanges({});
    component.showTooltip({});

    const [label, point, location] = tooltip.showTooltip.calls.mostRecent().args;
    expect(label).toBe('F');
    expect(point).toBe(component.point);
    expect(location).toEqual({x: 0, y: 20, width: 5 - 1});
  });

  it('hideTooltip calls service', () => {
    component.ngOnChanges({});
    component.hideTooltip({});

    const [point, location] = tooltip.hideTooltip.calls.mostRecent().args;
    expect(point).toBeTruthy();
    expect(location).toBeTruthy();
  });
});
