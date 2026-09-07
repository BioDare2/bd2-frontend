import {Component, ChangeDetectionStrategy} from '@angular/core';
import {ShutdownEventsService} from './system/shutdown-events.service';
import { environment } from './../environments/environment';

@Component({
    selector: 'bd2-root',
    templateUrl: './app.component.html',
    styles: [],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class AppComponent {
  title = 'Welcome to BioDare2!';

  constructor(private shutdowns: ShutdownEventsService) {
    console.log("Is on production: "+environment.production);
  }


}
