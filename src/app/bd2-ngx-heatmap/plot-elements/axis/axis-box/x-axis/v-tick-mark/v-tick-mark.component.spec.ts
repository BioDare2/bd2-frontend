import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import {VTickMarkComponent} from './v-tick-mark.component';
import {Tick} from '../../../../../bd2-heatmap.dom';

describe('VTickMarkComponent', () => {
  let component: VTickMarkComponent;
  let fixture: ComponentFixture<VTickMarkComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [VTickMarkComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VTickMarkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('calculates positions', () => {
    component.tick = new Tick(10, 0, '11', true);
    component.length = 3;
    component.calculatePositions();

    expect(component.marky2).toBe(-3);
    expect(component.texty2).toBe(-(3 + 4));
    expect(component.textdy).toBe(0);

    component.tick = new Tick(10, 0, '11', false);
    component.length = 4;
    component.calculatePositions();

    expect(component.marky2).toBe(4);
    expect(component.texty2).toBe((4 + 4));
    expect(component.textdy).toBe('0.6em');
  });

  it('renders mark and label', () => {
    let line = fixture.nativeElement.querySelector('line');
    let text = fixture.nativeElement.querySelector('text');

    expect(line).toBeFalsy();
    expect(text).toBeFalsy();

    component.tick = new Tick(10, 0, '11', true);
    fixture.detectChanges();

    line = fixture.nativeElement.querySelector('line');
    text = fixture.nativeElement.querySelector('text');

    expect(line).toBeTruthy();
    expect(text).toBeTruthy();
    expect(text.textContent).toContain('11');

  });
});
