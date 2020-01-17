import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {PPAPlotsComponent} from './ppaplots.component';
import {MaterialsModule} from '../../../../../shared/materials.module';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {PPAService} from '../../../ppa.service';
import {LegendModule} from '../../../../../graphic/legend/legend.module';
import {PPAPeriodPlotComponent} from './ppaperiod-plot/ppaperiod-plot.component';
import {PPASortWidgetComponent} from './ppasort-widget/ppasort-widget.component';
import {PPAPhasePlotComponent} from './ppaphase-plot/ppaphase-plot.component';
import {BD2NgxPolarplotModule} from 'bd2-ngx-polarplot';
import {BD2NgxHBoxplotModule} from 'bd2-ngx-hboxplot';
import {SVGSaverModule} from '../../../../../graphic/svg-saver/svg-saver.module';
import {FormsModule} from '@angular/forms';
import {NgModule} from '@angular/core';
import {ButtonsModule} from 'ngx-bootstrap';

@NgModule({
  imports: [MaterialsModule, NoopAnimationsModule, LegendModule,
    BD2NgxPolarplotModule,
    BD2NgxHBoxplotModule, SVGSaverModule,
    ButtonsModule,
    FormsModule],
  exports: [MaterialsModule, NoopAnimationsModule, LegendModule,
    BD2NgxPolarplotModule,
    BD2NgxHBoxplotModule, SVGSaverModule,
    FormsModule,
    PPAPlotsComponent
  ],
  declarations: [ PPAPlotsComponent, PPAPeriodPlotComponent, PPASortWidgetComponent, PPAPhasePlotComponent ]
})
export class PPAPlotsComponentTestModule {
}

describe('PPAPlotsComponent', () => {
  let ppaService: PPAService;

  let component: PPAPlotsComponent;
  let fixture: ComponentFixture<PPAPlotsComponent>;

  beforeEach(async(() => {
    ppaService = jasmine.createSpyObj('ppaService', ['getPPAJob']);

    TestBed.configureTestingModule({
      imports: [PPAPlotsComponentTestModule],
      declarations: [  ],
      providers: [
        {provide: PPAService, useValue: ppaService},
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PPAPlotsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
