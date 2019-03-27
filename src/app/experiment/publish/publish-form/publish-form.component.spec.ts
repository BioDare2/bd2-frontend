import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ExperimentsTestToolModule} from '../../experiment_test_tool.spec';
import {PublishFormComponent} from './publish-form.component';

describe('PublishFormComponent', () => {
  let component: PublishFormComponent;
  let fixture: ComponentFixture<PublishFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PublishFormComponent
      ],
      imports: [ExperimentsTestToolModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PublishFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
