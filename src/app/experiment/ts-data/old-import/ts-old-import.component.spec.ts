import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ExperimentsTestToolModule} from '../../experiment_test_tool.spec';
import {TSOldImportComponent} from './ts-old-import.component';
import {DescribeTopcountTableComponent} from './widgets/describe-topcount-table.component';
import {SimpleAddDataFormComponent} from './widgets/simple-add-data.form.component';

describe('TSImportComponent', () => {
  let component: TSOldImportComponent;
  let fixture: ComponentFixture<TSOldImportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TSOldImportComponent, DescribeTopcountTableComponent,
        SimpleAddDataFormComponent],
      imports: [ExperimentsTestToolModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TSOldImportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
