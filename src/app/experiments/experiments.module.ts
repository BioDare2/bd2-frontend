import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ExperimentsRoutingModule} from './experiments-routing.module';
import {ExperimentsListComponent} from './experiments-list/experiments-list.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RepoComponentsModule} from '../repo/components/repo-comp.module';
import {ExperimentSummaryComponent} from './experiments-list/experiment-summary/experiment-summary.component';
import {MatLegacyButtonModule as MatButtonModule} from '@angular/material/legacy-button';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatLegacyPaginatorModule as MatPaginatorModule} from '@angular/material/legacy-paginator';
import {MatLegacySlideToggleModule as MatSlideToggleModule} from '@angular/material/legacy-slide-toggle';
import {MatLegacyTableModule as MatTableModule} from '@angular/material/legacy-table';
import {SearchAndSortPanelComponent} from './search-and-sort-panel/search-and-sort-panel.component';
import {SortSwitchComponent} from './search-and-sort-panel/sort-switch/sort-switch.component';
import {MatLegacyProgressBarModule as MatProgressBarModule} from '@angular/material/legacy-progress-bar';

@NgModule({
  declarations: [ExperimentsListComponent, ExperimentSummaryComponent, SearchAndSortPanelComponent, SortSwitchComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatSlideToggleModule,
    MatPaginatorModule,
    MatTableModule,
    MatProgressBarModule,
    RepoComponentsModule,
    ExperimentsRoutingModule
  ]
})
export class ExperimentsModule {
}
