import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import {LabelsComponent} from './labels.component';
import {GraphicContext, Serie} from '../../bd2-heatmap.dom';
import {scaleBand} from 'd3-scale';

describe('LabelsComponent', () => {
  let component: LabelsComponent;
  let fixture: ComponentFixture<LabelsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [LabelsComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LabelsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('color is using the scale and ix', () => {
    const context = new GraphicContext();

    context.labelsColors = ix => 'c' + ix;

    component.graphic = context;

    expect(component.color(2)).toEqual('c2');

  });

  it('maxHeight returns the bandwith', () => {
    const context = new GraphicContext();
    context.yScale = scaleBand().domain(['1', '2']).range([0, 10]);

    component.graphic = context;
    expect(component.maxHeight()).toBe(context.yScale.bandwidth());

  });

  it('yStart uses scales', () => {

    const context = new GraphicContext();
    context.yScale = scaleBand().domain(['1', '2']).range([0, 10]);

    component.graphic = context;

    const serie: Serie = {key: '2'} as Serie;
    expect(component.yStart(serie)).toBe(5);


  });
});
