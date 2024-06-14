import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import {YAxisComponent} from './y-axis.component';
import {scaleBand} from 'd3-scale';

describe('YAxisComponent', () => {
  let component: YAxisComponent;
  let fixture: ComponentFixture<YAxisComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [YAxisComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(YAxisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('onChanges sets its properties', () => {

    const domain = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const scale = scaleBand<number>()
      .domain(domain)
      .range([0, 100]);

    component.yScale = scale;
    component.xPosition = 20;

    component.ngOnChanges({});
    expect(component.y2).toBe(100);
    expect(component.axisTransform).toEqual('translate(20,0)');
  });

  it('renders axis', () => {

    const domain = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const scale = scaleBand<number>()
      .domain(domain)
      .range([0, 100]);

    component.yScale = scale;
    component.xPosition = 20;

    fixture.detectChanges();

    const g = fixture.nativeElement.querySelector('g.bd2hm-y-axis');
    expect(g).toBeTruthy();

    const line = fixture.nativeElement.querySelector('line');
    expect(line).toBeTruthy();

  });
});
