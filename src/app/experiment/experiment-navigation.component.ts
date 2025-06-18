import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ExperimentalAssayView} from '../dom/repo/exp/experimental-assay-view';


@Component({
    selector: 'bd2-experiment-navigation',
    template: `
    @if (experiment) {
      <div style="margin-bottom: 2em;">
        <nav class="secondary">
          <a [routerLink]="['/experiments']"><i class="material-icons bd-icon">fast_rewind</i></a>
          <a role="button" (click)="back()" class="shade"><i class="material-icons bd-icon" >arrow_left</i></a>
          <a role="button" (click)="refresh()" class="shade"><i class="material-icons bd-icon">refresh</i></a>
          <a [routerLink]="['.']" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}">Overview</a>
          @if (experiment.security.canWrite) {
            <a [routerLink]="['edit']" routerLinkActive="active"
            [routerLinkActiveOptions]="{exact: true}">Edit</a>
          }
          @if (experiment.features.hasTSData) {
            <a [routerLink]="['.','data','view','ts']" routerLinkActive="active"
            [routerLinkActiveOptions]="{exact: true}">Show data</a>
          }
          @if (experiment.features.hasTSData) {
            <a [routerLink]="['.','data','view','heatmap']" routerLinkActive="active"
            [routerLinkActiveOptions]="{exact: true}">Heatmap</a>
          }
          <!-- we start at new upload<a *ngIf="experiment.security.canWrite && !experiment.features.hasTSData" [routerLink]="['.','data','upload']"
        routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}">Import data</a>
        <a *ngIf="experiment.security.canWrite && experiment.features.hasTSData" [routerLink]="['.','data','upload']"
        routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}">Replace data</a> -->
        @if (experiment.security.canWrite && experiment.features.hasTSData && !experiment.features.hasPPAJobs) {
          <a
            [routerLink]="['ppa/new']" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}">Period
          analysis</a>
        }
        @if (experiment.features.hasPPAJobs) {
          <a [routerLink]="['ppa']" routerLinkActive="active"
          [routerLinkActiveOptions]="{exact: false}">Period analysis</a>
        }
        @if ((experiment.security.canWrite && experiment.features.hasTSData) || experiment.features.hasRhythmicityJobs) {
          <a
            [routerLink]="['rhythmicity']" routerLinkActive="active"
          [routerLinkActiveOptions]="{exact: false}">Rhythmicity</a>
        }
        @if (experiment.security.canWrite) {
          <a [routerLink]="['.','data','ts-import']"
            routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}">
          {{experiment.features.hasTSData ? 'Replace data' : 'Import data'}}</a>
        }
        <a [routerLink]="['file']" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}">Files</a>
        @if (experiment.security.isOwner || experiment.security.isSuperOwner) {
          <a [routerLink]="['publish']"
            routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}">
            <!-- <img src="assets/Open_Access_logo_small.svg" style="height: 1em;" >-->
            <i class="material-icons bd-icon" style="color: green">lock_open</i>
          </a>
        }
      </nav>
    </div>
    }
    `,
    providers: [],
    standalone: false
})
export class ExperimentNavigationComponent {

  @Input()
  experiment: ExperimentalAssayView;

  @Output()
  onRefresh: EventEmitter<boolean> = new EventEmitter<boolean>();

  refresh() {
    this.onRefresh.emit(true);
  }

  back() {
    window.history.back();
  }
}
