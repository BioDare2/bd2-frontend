import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import {StatTestOptionsWidgetComponent} from './stat-test-options-widget.component';
import {MaterialsModule} from '../../../../../shared/materials.module';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {PValueFormComponent} from '../pvalue-form/pvalue-form.component';
import {StatTestOptions} from '../../../rhythmicity-dom';

describe('StatTestOptionsWidgetComponent', () => {
  let component: StatTestOptionsWidgetComponent;
  let fixture: ComponentFixture<StatTestOptionsWidgetComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ StatTestOptionsWidgetComponent, PValueFormComponent  ],
      imports: [MaterialsModule, NoopAnimationsModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatTestOptionsWidgetComponent);
    component = fixture.componentInstance;
    // fixture.detectChanges();
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('emits parameters in response to calls', () => {

    const res = [];
    component.options.subscribe( o => res.push(o));
    fixture.detectChanges();

    expect(res).toEqual([new StatTestOptions(0.001, false, false, false )]);

    component.pValue(0.05);
    expect(res).toEqual([
      new StatTestOptions(0.001, false, false, false ),
      new StatTestOptions(0.05, false, false, false )
    ]);

    component.bhCorrection(true);
    expect(res).toEqual([
      new StatTestOptions(0.001, false, false, false ),
      new StatTestOptions(0.05, false, false, false ),
      new StatTestOptions(0.05, true, false, false )]);
  });

  it('emits initial parameters', () => {

    const res = [];
    component.options.subscribe( o => res.push(o));
    fixture.detectChanges();

    expect(res).toEqual([new StatTestOptions(0.001, false, false, false )]);

  });
});
