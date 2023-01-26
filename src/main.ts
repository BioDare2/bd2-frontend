import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';

/* maybe no longer needed with new angular, to be checked in the startup logs
import {environment} from './environments/environment';
import {enableProdMode} from '@angular/core';
if (environment.production) {
  enableProdMode();
}
*/

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
