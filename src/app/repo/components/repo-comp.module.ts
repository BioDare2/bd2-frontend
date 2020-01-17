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
import {DatepickerModule} from 'ngx-bootstrap/datepicker';
import {TypeaheadModule} from 'ngx-bootstrap/typeahead';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DatepickerModule,
    TypeaheadModule,

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
  providers: []
})
export class RepoComponentsModule {
}
