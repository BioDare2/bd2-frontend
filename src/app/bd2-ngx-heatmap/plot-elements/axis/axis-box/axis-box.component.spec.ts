import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import {AxisBoxComponent} from './axis-box.component';
import {HeatmapGraphUtil} from '../../../heatmap-graph-util';
import {LookAndFeelSizing} from '../../../bd2-heatmap.dom';
import {CommonModule} from '@angular/common';
import {NumXAxisComponent} from './x-axis/num-x-axis.component';
import {ChangeDetectionStrategy} from '@angular/core';
import {YAxisComponent} from './y-axis/y-axis.component';
import {VTickMarkComponent} from "./x-axis/v-tick-mark/v-tick-mark.component";

describe('AxisBoxComponent', () => {
  let component: AxisBoxComponent;
  let fixture: ComponentFixture<AxisBoxComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [AxisBoxComponent, NumXAxisComponent, YAxisComponent, VTickMarkComponent],
      imports: [CommonModule]
    })
    .overrideComponent(AxisBoxComponent , {
      set: {  changeDetection: ChangeDetectionStrategy.Default  }
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AxisBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });



  it('renders', () => {
    // does not work, WHY, *ngIf?
    const util = new HeatmapGraphUtil();
    const context = util.prepareGraphicContext([], new LookAndFeelSizing());

    component.graphic = context;
    fixture.detectChanges();

    let g = fixture.nativeElement.querySelector('g.bd2hm-axisWrapper');
    expect(g).toBeTruthy();

    g = fixture.nativeElement.querySelector('g.bd2hm-y-axis');
    expect(g).toBeTruthy();

    g = fixture.nativeElement.querySelector('g.bd2hm-x-axis');
    expect(g).toBeTruthy();


  });
});
