import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TSImportDashboardComponent } from './tsimport-dashboard.component';
import {MaterialsModule} from '../../../shared/materials.module';
import {AlertModule} from 'ngx-bootstrap';
import {FileAssetModule} from '../../../file-asset/file-asset.module';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {UploadDataFileStepComponent} from './upload-data-file-step/upload-data-file-step.component';
import {ExperimentsTestToolModule} from '../../experiment_test_tool.spec';

describe('TSImportDashboardComponent', () => {
  let component: TSImportDashboardComponent;
  let fixture: ComponentFixture<TSImportDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TSImportDashboardComponent, UploadDataFileStepComponent ],
      imports: [MaterialsModule, AlertModule.forRoot(), FileAssetModule, NoopAnimationsModule,
        ExperimentsTestToolModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TSImportDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
