import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {RhythmicityjobParamsRformComponent} from './rhythmicityjob-params-rform.component';
import {StaticContentTestModule} from '../../../../documents/static-content_test_tool.spec';
import {ReactiveFormsModule} from '@angular/forms';
import {ModalModule} from 'ngx-bootstrap';
import {MaterialsModule} from '../../../../shared/materials.module';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';

describe('RhythmicityjobParamsRformComponent', () => {
  let component: RhythmicityjobParamsRformComponent;
  let fixture: ComponentFixture<RhythmicityjobParamsRformComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RhythmicityjobParamsRformComponent ],
      imports: [
        // StaticContentModule,
        StaticContentTestModule,
        ReactiveFormsModule,
        ModalModule.forRoot(),
        MaterialsModule, NoopAnimationsModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RhythmicityjobParamsRformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
