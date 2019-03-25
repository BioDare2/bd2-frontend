import {Injectable, NgZone} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';


/*
 * Common service shared by all reCaptcha component instances
 * through dependency injection.
 * This service has the task of loading the reCaptcha API once for all
 *
 * As the language is passed to the <script>, the first component
 * determines the language of all subsequent components. This is a limitation
 * of the present Google API.
 */
@Injectable({
  providedIn: 'root'
})
export class ReCaptchaService {

  public readonly captchSiteKey: string;
  private scriptLoaded = false;
  private readySubject: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(zone: NgZone) {
    /* the callback needs to exist before the API is loaded */
    window['reCaptchaOnloadCallback' as any] = (() => zone.run(this.onloadCallback.bind(this))) as any;
  }

  public getReady(language: string): Observable<boolean> {
    if (!this.scriptLoaded) {
      this.scriptLoaded = true;
      const doc = document.body as HTMLDivElement;
      const script = document.createElement('script');
      script.innerHTML = '';
      script.src = 'https://www.google.com/recaptcha/api.js?onload=reCaptchaOnloadCallback&render=explicit' +
        (language ? '&hl=' + language : '');
      script.async = true;
      script.defer = true;
      doc.appendChild(script);
    }
    return this.readySubject.asObservable();
  }

  private onloadCallback() {
    this.readySubject.next(true);
  }
}
