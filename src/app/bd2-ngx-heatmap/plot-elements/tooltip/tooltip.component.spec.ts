import { ComponentFixture, fakeAsync, TestBed, tick, waitForAsync } from '@angular/core/testing';

import {TooltipComponent} from './tooltip.component';
import {TooltipService} from './tooltip.service';
import {GraphicContext, LookAndFeelSizing} from '../../bd2-heatmap.dom';
import {HeatmapGraphUtil} from '../../heatmap-graph-util';

describe('TooltipComponent', () => {
  let component: TooltipComponent;
  let fixture: ComponentFixture<TooltipComponent>;
  let tooltip: TooltipService;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [TooltipComponent],
      providers: [TooltipService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TooltipComponent);
    component = fixture.componentInstance;
    tooltip = TestBed.inject(TooltipService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('format label trims it', () => {
    expect(component.formatLabel(undefined)).toEqual('');
    expect(component.formatLabel(null)).toEqual('');
    expect(component.formatLabel('cos')).toEqual('cos');
    expect(component.formatLabel('12345678901234567890123456789012345678901234567890')).toEqual(
      '12345678901234567890123456789012345678...'
    );
  });

  it('gets text bbox', () => {

    const box = {x: 10, y: 5, height: 6, width: 8} as SVGRect;
    const native =
      jasmine.createSpyObj('SVGGraphicsElement', ['getBBox']);
    native.getBBox.and.returnValue(box);

    const node = {nativeElement: native};
    component.textNode = node;

    expect(component.textBBox()).toBe(box);
  });

  it('set textBBox add margins', () => {
    const box = {x: 10, y: 5, height: 6, width: 8} as SVGRect;
    const margin = 5;
    component.boxMargin = margin;
    component.setTextBBox(box);

    expect(component.textBX).toBe(10 - margin);
    expect(component.textBY).toBe(5 - margin);
    expect(component.textBHeight).toBe(6 + 2 * margin);
    expect(component.textBWidth).toBe(8 + 2 * margin);
  });

  it('update tbox gives observable that sets the dimensions', fakeAsync(() => {

    const box = {x: 0, y: 0, height: 6, width: 8} as SVGRect;
    const native =
      jasmine.createSpyObj('SVGGraphicsElement', ['getBBox']);
    native.getBBox.and.returnValue(box);

    const node = {nativeElement: native};
    component.textNode = node;
    const margin = 5;
    component.boxMargin = margin;
    component.updateTextBBox().subscribe( rect => {});
    tick();

    expect(component.textBX).toBe(0 - margin);
    expect(component.textBY).toBe(0 - margin);
    expect(component.textBHeight).toBe(6 + 2 * margin);
    expect(component.textBWidth).toBe(8 + 2 * margin);

  }));

  it('format values uses the formaters', () => {
    const graphic = new GraphicContext();
    graphic.domainFormatter = (v) => 'X';
    graphic.valuesFormatter = (v) => 'Y';

    component.graphic = graphic;
    expect(component.formatValues({x: 1, y: 2})).toEqual('X : Y');
  });

  it('hideTooltip trigers change detection', () => {
    const change = jasmine.createSpyObj('ChangeDetectorRef', ['markForCheck', 'detectChanges']);

    component = new TooltipComponent(tooltip, change);
    component.show = true;

    component.hideTooltip(undefined, undefined);
    expect(component.show).toBe(false);
    expect(change.detectChanges.calls.count()).toBe(1);

  });

  it('translate to data location, uses the dimensions and appplies margin', () => {
    const location = {x: 1, y: 5, width: 10};
    const textW = 20;
    const workW = 100;

    const x = 1 + 10 + 2 * 4;
    expect(component.translateToDataLocation(location, textW, workW)).toEqual(`translate(${x}, 5)`);

  });

  it('translate to data location, flips if leaves workspace', () => {
    const location = {x: 80, y: 5, width: 10};
    const textW = 20;
    const workW = 100;

    const x = 80 - 20;
    expect(component.translateToDataLocation(location, textW, workW)).toEqual(`translate(${x}, 5)`);

  });

  it('showTooltip to true, sets ready when finish updating and detects changes', fakeAsync(() => {

    const box = {x: 0, y: 0, height: 6, width: 8} as SVGRect;
    const native =
      jasmine.createSpyObj('SVGGraphicsElement', ['getBBox']);
    native.getBBox.and.returnValue(box);

    const change = jasmine.createSpyObj('ChangeDetectorRef', ['markForCheck', 'detectChanges']);
    const node = {nativeElement: native};

    const util = new HeatmapGraphUtil();
    const graphic = util.prepareGraphicContext([], new LookAndFeelSizing());

    component = new TooltipComponent(tooltip, change);
    component.graphic = graphic;
    component.textNode = node;

    component.show = false;
    component.ready = false;

    component.showTooltip('A', {x: 8, y: 10}, {x: 80, y: 5, width: 10});
    tick();
    expect(component.show).toBe(true);
    expect(component.ready).toBe(true);
    expect(change.detectChanges.calls.count()).toBe(2);
  }));

});
