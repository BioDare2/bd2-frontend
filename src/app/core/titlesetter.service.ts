import {Injectable, Optional, SkipSelf} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import {Title} from '@angular/platform-browser';
import {distinctUntilChanged, filter} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TitleSetterService {

  constructor(private router: Router,
              private titleService: Title,
              @Optional() @SkipSelf() other: TitleSetterService) {

    console.log('TitleSetter created');

    if (other) {
      throw new Error(
        'TitleSetterService is already loaded. Activate it in the AppModule only');
    }

    router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      distinctUntilChanged((previous: NavigationEnd, current: NavigationEnd) => {
        return previous.url === current.url;
      })
    ).subscribe(
      (x: NavigationEnd) => {
        // console.log('router.change', x);
        this.changedURL(x.urlAfterRedirects);
      },
      err => {
        console.log('Error in router stream');
      },
      () => console.log('Router stream end')
    );

  }

  changedURL(url: string) {
    // console.log("U: "+url+"; "+url.constructor.name);

    const part = this.getTitleFromURL(url);
    if (part) {
      this.setTitle(part);
    }
  }

  getTitleFromURL(url: string): string {

    if (url.endsWith('welcome')) {
      return 'Circadian period analysis';
    }
    if (url.endsWith('experiments')) {
      return 'Experiments';
    }
    if (url.endsWith('experiments/new')) {
      return 'New Experiment';
    }
    if (url.endsWith('login')) {
      return 'Login';
    }
    if (url.endsWith('account/register')) {
      return 'Register';
    }
    if (url.endsWith('account/edit')) {
      return 'Account';
    }
    return '';
  }

  public setTitle(titlePart: string) {
    // console.log("ST: "+titlePart);
    this.titleService.setTitle('BioDare2 ' + titlePart);
  }

}
