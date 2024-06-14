import { ComponentFixture, fakeAsync, TestBed, tick, waitForAsync } from '@angular/core/testing';

import {LabelBoxComponent} from './label-box.component';

describe('LabelBoxComponent', () => {
  let component: LabelBoxComponent;
  let fixture: ComponentFixture<LabelBoxComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [LabelBoxComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LabelBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
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
    component.setTextBBox(box);

    const margin = 4;
    expect(component.textBY).toBe(5 - margin);
    expect(component.textBHeight).toBe(6 + 2 * margin);
    expect(component.textBWidth).toBe(10 + 8 + margin);
  });

  it('update tbox gives observable that sets the dimensions', fakeAsync(() => {

    const box = {x: 0, y: 0, height: 6, width: 8} as SVGRect;
    const native =
      jasmine.createSpyObj('SVGGraphicsElement', ['getBBox']);
    native.getBBox.and.returnValue(box);

    const node = {nativeElement: native};
    component.textNode = node;

    component.updateTextBBox().subscribe( rect => {});
    tick();

    const margin = 4;
    expect(component.textBY).toBe(0 - margin);
    expect(component.textBHeight).toBe(6 + 2 * margin);
    expect(component.textBWidth).toBe(0 + 8 + margin);

  }));

  it('toggleLable to true, sets ready when finish updating and marksForDetection', fakeAsync(() => {

    const box = {x: 0, y: 0, height: 6, width: 8} as SVGRect;
    const native =
      jasmine.createSpyObj('SVGGraphicsElement', ['getBBox']);
    native.getBBox.and.returnValue(box);

    const change = jasmine.createSpyObj('ChangeDetectorRef', ['markForCheck']);
    const node = {nativeElement: native};

    component = new LabelBoxComponent(change as any);
    component.textNode = node;

    component.toggled = false;
    component.ready = false;

    component.toggleLabel(true);
    tick();
    expect(component.toggled).toBe(true);
    expect(component.ready).toBe(true);
    expect(change.markForCheck.calls.count()).toBe(1);

  }));

  it('fontSize debends on label height', () => {
    component.maxHeight = 4;
    expect(component.fontSize()).toBe(0);
    component.maxHeight = 10;
    expect(component.fontSize()).toBe(7);
    component.maxHeight = 20;
    expect(component.fontSize()).toBe(10);

  });

  it('margin size on label height', () => {
    component.maxHeight = 4;
    expect(component.marginSize()).toBe(1);
    component.maxHeight = 10;
    expect(component.marginSize()).toBe(1);
    component.maxHeight = 15;
    expect(component.marginSize()).toBe(2);
    component.maxHeight = 20;
    expect(component.marginSize()).toBe(4);

  });

  it('onChanges sets properties', () => {
    component.yStart = 10;
    component.maxHeight = 20;

    component.ngOnChanges({});

    expect(component.margin).toBe(4);
    expect(component.triggerY).toBe(14);
    expect(component.triggerHeight).toBe(12);
    expect(component.yMiddle).toBe(20);
  });
});
