import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PPAStatsTable2Component } from './ppastats-table2.component';
import {PPAService} from "../../../ppa.service";
import {MaterialsModule} from "../../../../../shared/materials.module";
import {NoopAnimationsModule} from "@angular/platform-browser/animations";

describe('PPAStatsTable2Component', () => {

  let ppaService: PPAService;

  let component: PPAStatsTable2Component;
  let fixture: ComponentFixture<PPAStatsTable2Component>;

  beforeEach(async(() => {
    ppaService = jasmine.createSpyObj('ppaService', ['getPPAJob']);

    TestBed.configureTestingModule({
      imports: [MaterialsModule, NoopAnimationsModule],
      declarations: [ PPAStatsTable2Component ],
      providers: [
        {provide: PPAService, useValue: ppaService},
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PPAStatsTable2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
