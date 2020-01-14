import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ExperimentsTestToolModule} from '../../experiment_test_tool.spec';
import {TSImportComponent} from './ts-import.component';
import {DescribeTSTableComponent} from './widgets/describe-ts-table.component';
import {DescribeTopcountTableComponent} from './widgets/describe-topcount-table.component';
import {ColumnTypeDialogComponent} from './widgets/column-type.dialog.component';
import {ConfirmRowCopyDialogComponent} from './widgets/confirm-row-copy.dialog.component';
import {SimpleAddDataFormComponent} from './widgets/simple-add-data.form.component';
import {ModalModule} from 'ngx-bootstrap';

describe('TSImportComponent', () => {
  let component: TSImportComponent;
  let fixture: ComponentFixture<TSImportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TSImportComponent, DescribeTSTableComponent, DescribeTopcountTableComponent,
        ColumnTypeDialogComponent, ConfirmRowCopyDialogComponent, SimpleAddDataFormComponent],
      imports: [ExperimentsTestToolModule, ModalModule]
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
