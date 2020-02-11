import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ExperimentsRoutingModule} from './experiments-routing.module';
import {ExperimentsListComponent} from './experiments-list/experiments-list.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RepoComponentsModule} from '../repo/components/repo-comp.module';
import {ExperimentSummaryComponent} from './experiments-list/experiment-summary/experiment-summary.component';
import {MatButtonModule, MatButtonToggleModule, MatPaginatorModule, MatSlideToggleModule, MatTableModule} from '@angular/material';
import {SearchAndSortPanelComponent} from './search-and-sort-panel/search-and-sort-panel.component';

@NgModule({
  declarations: [ExperimentsListComponent, ExperimentSummaryComponent, SearchAndSortPanelComponent],
  imports: [
    CommonModule,
    FormsModule, ReactiveFormsModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatSlideToggleModule,
    MatPaginatorModule,
    MatTableModule,
    RepoComponentsModule,
    ExperimentsRoutingModule
  ]
})
export class ExperimentsModule {
}
