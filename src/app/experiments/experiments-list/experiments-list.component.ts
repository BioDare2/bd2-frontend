import {Component, OnDestroy, OnInit} from '@angular/core';
import {UserService} from '../../auth/user.service';
import {FeedbackService} from '../../feedback/feedback.service';
import {ExperimentService} from '../../experiment/experiment.service';
import {ExperimentSummary} from '../../dom/repo/exp/experiment-summary';
import {PageEvent} from '@angular/material';
import {ActivatedRoute} from '@angular/router';
import {filter, map} from 'rxjs/operators';
import {Subscription} from 'rxjs';
import {SearchAndSortOptions} from '../search-and-sort-panel/search-and-sort-panel.component';

@Component({
  template: `
    <div>
      <h2 class="float-left">Experiments
        <a (click)="refresh()" role="button" aria-label="refresh">
            <i class="material-icons bd-icon-inh bd-primary" style="font-size: larger;">refresh</i>
            <!--<span class="glyphicon glyphicon-repeat" aria-hidden="true"></span>-->
        </a>
      </h2>
      <div class="float-right">
        <mat-slide-toggle [(ngModel)]="showPublic">Show public</mat-slide-toggle>
      </div>

      <div class="clearfix"></div>

      <div *ngIf="!experiments || experiments.length < 1" class="alert alert-info">
        There are no visible experiments.
      </div>

      <div>

        <bd2-search-and-sort-panel [options]="initialSearchOptions" (search)="search($event)"></bd2-search-and-sort-panel>

        <mat-paginator #paginator [length]="currentPage?.length"
                       [pageSize]="currentPage?.pageSize || 25"
                       [pageIndex]="currentPage?.pageIndex"
                       [pageSizeOptions]="[10, 25, 50, 100, 200]"
                       (page)="loadPage($event)"

        >
        </mat-paginator>





        <div class="list-group">
          <bd2-experiment-summary *ngFor="let exp of experiments" [exp]="exp" >
          </bd2-experiment-summary>
        </div>

        <mat-paginator #paginator2 [length]="currentPage?.length"
                       [pageSize]="currentPage?.pageSize || 25"
                       [pageIndex]="currentPage?.pageIndex"
                       [pageSizeOptions]="[10, 25, 50, 100, 200]"
                       (page)="loadPage($event)"

        >
        </mat-paginator>
        <div class="float-left">
          <a *ngIf="paginator2.hasNextPage()"
             [routerLink]="[]" [queryParams]="{pageIndex: currentPage.pageIndex+1, pageSize: currentPage.pageSize}"
             style="color: rgba(0,0,0,.54);" >Next</a>
        </div>
      </div>
    </div>
  `,
  styles: []
})
export class ExperimentsListComponent implements OnInit, OnDestroy {

  experiments: ExperimentSummary[];
  currentPage: PageEvent;
  initialSearchOptions: SearchAndSortOptions;

  constructor(private experimentService: ExperimentService,
              private feedback: FeedbackService,
              private userService: UserService,
              private route: ActivatedRoute) {

  }

  _showPublic = false;
  routeSubscription: Subscription;

  get showPublic(): boolean {
    return this._showPublic;
  }

  set showPublic(val: boolean) {
    this._showPublic = val;
    this.refresh();
  }

  ngOnInit() {
    const firstPage = this.firstPage();

    this.currentPage = firstPage;
    this._showPublic = !this.userService.isLoggedIn();

    this.initialSearchOptions = {
      sorting: 'modified',
      direction: 'desc',
      showPublic: !this.userService.isLoggedIn(),
      query: ''
    };

    this.loadExperiments(this.currentPage);

    this.subscribeRoute();
  }

  ngOnDestroy(): void {
    if (this.routeSubscription) {
      this.routeSubscription.unsubscribe();
    }
  }

  search(options: SearchAndSortOptions) {
    console.log("Searching for", options);
  }

  firstPage() {
    const initialPage = +this.route.snapshot.queryParamMap.get('pageIndex') || 0;
    const initialSize = +this.route.snapshot.queryParamMap.get('pageSize') || 25;
    const firstPage = new PageEvent();
    firstPage.pageIndex = initialPage;
    firstPage.pageSize = initialSize;
    return firstPage;
  }

  subscribeRoute() {
    this.routeSubscription = this.route.queryParamMap.pipe(
      filter( params => params.has('pageIndex') && params.has('pageSize')),
      map( params => {
        const page = new PageEvent();
        page.pageSize = +params.get('pageSize');
        page.pageIndex = +params.get('pageIndex');
        return page;
      }),
    ).subscribe( page => this.loadPage(page));
  }

  refresh() {
    const page = Object.assign(new PageEvent(), this.currentPage );
    page.pageIndex = 0;
    this.loadExperiments(page);
  }

  loadExperiments(page: PageEvent) {
    const onlyOwned = !this.showPublic;
    this.experimentService.getExperiments(onlyOwned, page)
      .subscribe( wrapper => {
        this.experiments = wrapper.data;
        this.currentPage = wrapper.currentPage;
      }, reason => {
          this.feedback.error(reason);
      });
  }

  loadPage(page: PageEvent) {
    this.loadExperiments(page);
  }

}
