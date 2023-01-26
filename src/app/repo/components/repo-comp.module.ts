import {NgModule} from '@angular/core';

import {GeneralDescFormComponent} from './general/general-desc-form.component';
import {GeneralDescViewComponent} from './general/general-desc-view.component';
import {ContributionDescFormComponent} from './contribution/contribution-desc-form.component';
import {ContributionDescViewComponent} from './contribution/contribution-desc-view.component';
import {SimpleBioDescFormComponent} from './biodesc/simple-bio-desc-form.component';
import {SimpleBioDescViewComponent} from './biodesc/simple-bio-desc-view.component';
import {MeasurementDescRFormComponent} from './measure/measurement-desc-rform/measurement-desc-rform.component';
import {MeasurementDescViewComponent} from './measure/measurement-desc-view/measurement-desc-view.component';
import {CommonModule} from '@angular/common';
// import {DatepickerModule} from 'ngx-bootstrap/datepicker';
// import {TypeaheadModule} from 'ngx-bootstrap/typeahead';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatLegacyAutocompleteModule as MatAutocompleteModule} from '@angular/material/legacy-autocomplete';
import {MatLegacyCardModule as MatCardModule} from '@angular/material/legacy-card';
import {MatLegacyChipsModule as MatChipsModule} from '@angular/material/legacy-chips';
import {MAT_DATE_LOCALE, MatNativeDateModule} from '@angular/material/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatDividerModule} from '@angular/material/divider';
import {MatLegacyFormFieldModule as MatFormFieldModule} from '@angular/material/legacy-form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatLegacyInputModule as MatInputModule} from '@angular/material/legacy-input';
import {MatLegacySelectModule as MatSelectModule} from '@angular/material/legacy-select';

// import {MatMomentDateModule} from '@angular/material-moment-adapter';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    // DatepickerModule,
    // TypeaheadModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatNativeDateModule,
    // MatMomentDateModule,
    MatInputModule,
    MatChipsModule,
    MatIconModule,
    MatDividerModule,
    MatCardModule,
    MatSelectModule,
    MatAutocompleteModule
  ],
  declarations: [
    GeneralDescFormComponent,
    GeneralDescViewComponent,
    ContributionDescFormComponent,
    ContributionDescViewComponent,
    SimpleBioDescFormComponent,
    SimpleBioDescViewComponent,
    MeasurementDescRFormComponent,
    MeasurementDescViewComponent
  ],
  exports: [
    GeneralDescFormComponent,
    GeneralDescViewComponent,
    ContributionDescFormComponent,
    ContributionDescViewComponent,
    SimpleBioDescFormComponent,
    SimpleBioDescViewComponent,
    MeasurementDescRFormComponent,
    MeasurementDescViewComponent
  ],
  providers: [
    /* To get rid of us weird data format, but still, the input when edited manually interprets it in us way
    * even if showin in GB */
    {provide: MAT_DATE_LOCALE, useValue: 'en-GB'}
  ]
})
export class RepoComponentsModule {
}
