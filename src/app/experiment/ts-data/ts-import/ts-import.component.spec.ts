import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ExperimentsTestToolModule} from '../../experiment_test_tool.spec';
import {TSImportComponent} from './ts-import.component';
import {DescribeTopcountTableComponent} from './widgets/describe-topcount-table.component';
import {SimpleAddDataFormComponent} from './widgets/simple-add-data.form.component';

describe('TSImportComponent', () => {
  let component: TSImportComponent;
  let fixture: ComponentFixture<TSImportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TSImportComponent, DescribeTopcountTableComponent,
        SimpleAddDataFormComponent],
      imports: [ExperimentsTestToolModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TSImportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
