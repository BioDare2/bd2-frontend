import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {
  trigger,
  state,
  style,
  transition,
  animate
} from '@angular/animations';

@Component({
  selector: 'bd2-cookieconsent',
  templateUrl: './agree-cookies.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush, // manually handling to improve performance
  animations: [
    trigger('shown', [
      state('inactive', style({
        opacity: 0,
        paddingTop: '0px',
        paddingBottom: '0px',
        height: 0

      })),
      state('active', style({
        opacity: 1,
        paddingTop: '90px',
        paddingBottom: '90px'
      })),
      transition('void => *', animate('1200ms 6000ms ease-in')),
      transition('active => inactive', animate('300ms ease-out'))
    ])
  ],
  styles: []
})
export class AgreeCookiesComponent implements OnInit {

  show: boolean;
  nostorage: boolean;

  constructor(private changeDetector: ChangeDetectorRef) {

  }

  ngOnInit(): void {


    if (typeof(Storage) !== 'undefined') {
      // console.log("Storage");
      this.nostorage = false;

      const consent = localStorage.getItem('BioDare2CookieConsent');
      // console.log("Consent: "+consent);
      this.show = consent ? false : true;
      // this.show = true;

    } else {
      console.log('No storage');
      this.nostorage = true;
      this.show = true;
    }
  }

  agree() {
    console.log('Agreed');
    localStorage.setItem('BioDare2CookieConsent', '' + new Date());
    this.show = false;
    this.changeDetector.markForCheck();
  }

}
