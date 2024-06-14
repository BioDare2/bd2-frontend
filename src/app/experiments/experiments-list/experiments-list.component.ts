import {Component, OnDestroy, OnInit} from '@angular/core';
import {UserService} from '../../auth/user.service';
import {FeedbackService} from '../../feedback/feedback.service';
import {ExperimentService} from '../../experiment/experiment.service';
import {ExperimentSummary} from '../../dom/repo/exp/experiment-summary';
import {PageEvent} from '@angular/material/paginator';
import {Sort} from '@angular/material/sort';
import {ActivatedRoute} from '@angular/router';
import {filter, map} from 'rxjs/operators';
import {Subscription} from 'rxjs';
import {SearchAndSortOptions, SearchOptions} from '../search-and-sort-panel/search-and-sort-panel.component';
import {ExperimentsFetcherService} from '../services/experiments-fetcher.service';

@Component({
  templateUrl: './experiments-list.component.html',
  styles: [],
  providers: [ExperimentsFetcherService]
})
export class ExperimentsListComponent implements OnInit, OnDestroy {

  experiments: ExperimentSummary[];
  initialSearchOptions: SearchAndSortOptions;

  constructor(private experimentService: ExperimentService,
              public fetcher: ExperimentsFetcherService,
              private feedback: FeedbackService,
              private userService: UserService,
              private route: ActivatedRoute) {

  }

  routeSubscription: Subscription;



  ngOnInit() {
    const firstPage = this.firstPage();

    this.initialSearchOptions = {
      sorting: {active: 'modified', direction: 'desc'},
      showPublic: !this.userService.isLoggedIn(),
      query: ''
    };


    this.subscribeRoute();

    this.fetcher.experiment$.subscribe( exps => this.experiments = exps);
    this.fetcher.error$.subscribe( err => this.feedback.error(err));
    this.fetcher.on(true);

    this.sort(this.initialSearchOptions.sorting);
    this.search(this.initialSearchOptions);
    // page must be last as searech and sort resets the page
    this.page(this.firstPage());

  }

  ngOnDestroy(): void {
    if (this.routeSubscription) {
      this.routeSubscription.unsubscribe();
    }

    if (this.fetcher) {
      this.fetcher.close();
    }
  }

  search(options: SearchOptions) {
    //console.log('L Searching for', options);
    this.fetcher.input(options);
  }

  sort(sort: Sort) {
    //console.log('L Sort', sort);
    this.fetcher.sort(sort);
  }

  page(page: PageEvent) {
    // console.log('Page', page);
    this.fetcher.page(page);
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
    ).subscribe( page => this.page(page));
  }

  refresh() {
    // const page = Object.assign(new PageEvent(), this.currentPage );
    // page.pageIndex = 0;
    // this.loadExperiments(page);
    this.fetcher.refresh();
  }


  /*
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
  }*/

}
