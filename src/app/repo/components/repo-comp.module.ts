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
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatCardModule} from '@angular/material/card';
import {MatChipsModule} from '@angular/material/chips';
import {MAT_DATE_LOCALE, MatNativeDateModule} from '@angular/material/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatDividerModule} from '@angular/material/divider';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';

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
