import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ExperimentsRoutingModule} from './experiments-routing.module';
import {ExperimentsListComponent} from './experiments-list/experiments-list.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RepoComponentsModule} from '../repo/components/repo-comp.module';
import {ExperimentSummaryComponent} from './experiments-list/experiment-summary/experiment-summary.component';
import {MatButtonModule} from '@angular/material/button';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatTableModule} from '@angular/material/table';
import {SearchAndSortPanelComponent} from './search-and-sort-panel/search-and-sort-panel.component';
import {SortSwitchComponent} from './search-and-sort-panel/sort-switch/sort-switch.component';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatIconModule} from '@angular/material/icon';

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
    MatIconModule,
    RepoComponentsModule,
    ExperimentsRoutingModule
  ]
})
export class ExperimentsModule {
}
