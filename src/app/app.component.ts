import {Component} from '@angular/core';
import {ShutdownEventsService} from './system/shutdown-events.service';

@Component({
  selector: 'bd2-root',
  templateUrl: './app.component.html',
  styles: []
})
export class AppComponent {
  title = 'Welcome to BioDare2!';

  constructor(private shutdowsn: ShutdownEventsService) {
  }
}
