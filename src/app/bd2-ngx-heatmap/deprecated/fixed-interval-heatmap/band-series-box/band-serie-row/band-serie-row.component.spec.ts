import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import {BandSerieRowComponent} from './band-serie-row.component';
import {scaleBand} from 'd3-scale';
import {Serie} from '../../../../bd2-heatmap.dom';
import {FixedGraphicContext} from '../../bd2-fixed-heatmap.dom';

describe('SerieRowComponent', () => {
  let component: BandSerieRowComponent;
  let fixture: ComponentFixture<BandSerieRowComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [BandSerieRowComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BandSerieRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('onChangs calculates properties', () => {
    const graphic = new FixedGraphicContext();
    graphic.yScale = scaleBand<any>().domain([1, 2]).range([0, 10]);

    component.graphic = graphic;
    component.serie = {key: 1} as Serie;

    component.ngOnChanges({});
    expect(component.yPosition).toBe(0);
    expect(component.yHeight).toBe(5);

  });
});
