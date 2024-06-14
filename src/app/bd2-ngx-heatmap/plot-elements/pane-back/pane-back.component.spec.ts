import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import {PaneBackComponent} from './pane-back.component';
import {GraphicContext} from '../../bd2-heatmap.dom';

describe('PaneBackComponent', () => {
  let component: PaneBackComponent;
  let fixture: ComponentFixture<PaneBackComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [PaneBackComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaneBackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('onChanges calculates dimensions', () => {
    const graphic = new GraphicContext();
    graphic.workspaceWidth = 100;
    graphic.workspaceHeight = 200;

    component.graphic = graphic;
    component.ngOnChanges({});

    expect(component.width).toBe(96);
    expect(component.height).toBe(196);

    component.margin = 0;
    component.ngOnChanges({});

    expect(component.width).toBe(100);
    expect(component.height).toBe(200);
  });
});
