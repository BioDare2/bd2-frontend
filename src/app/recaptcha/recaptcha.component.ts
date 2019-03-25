/*
 * Code copied from
 * https://www.npmjs.com/package/angular2-recaptcha
 * https://github.com/xmaestro/angular2-recaptcha
 *
 * as it was not updated to recent angular and I did not want to install it as library.
 */


import {Component, ElementRef, EventEmitter, Input, NgZone, OnInit, Output, ViewChild} from '@angular/core';
import {ReCaptchaService} from './recaptcha.service';

@Component({
  selector: 'bd2-recaptcha',
  template: '<div #target></div>'
})

export class ReCaptchaComponent implements OnInit {

  @Input()
  site_key: string = null;
  @Input()
  theme = 'light';
  @Input()
  type = 'image';
  @Input()
  size = 'normal';
  @Input()
  tabindex = 0;
  /* Available languages: https://developers.google.com/recaptcha/docs/language */
  @Input()
  language: string = null;

  @Output()
  captchaResponse = new EventEmitter<string>();
  @Output()
  captchaExpired = new EventEmitter();

  @ViewChild('target') targetRef: ElementRef;
  widgetId: any = null;

  constructor(
    private _zone: NgZone,
    private _captchaService: ReCaptchaService) {
  }

  ngOnInit() {
    this._captchaService.getReady(this.language)
      .subscribe((ready) => {
        if (!ready) {
          return;
        }
        // noinspection TypeScriptUnresolvedVariable,TypeScriptUnresolvedFunction
        this.widgetId = (window as any).grecaptcha.render(this.targetRef.nativeElement, {
          sitekey: this.site_key,
          theme: this.theme,
          type: this.type,
          size: this.size,
          tabindex: this.tabindex,
          callback: ((response: any) => this._zone.run(this.recaptchaCallback.bind(this, response))) as any,
          'expired-callback': (() => this._zone.run(this.recaptchaExpiredCallback.bind(this))) as any
        });
      });
  }

  public reset() {
    if (this.widgetId === null) {
      return;
    }
    // noinspection TypeScriptUnresolvedVariable
    (window as any).grecaptcha.reset(this.widgetId);
  }

  public getResponse(): String {
    if (!this.widgetId) {
      return null;
    }
    // noinspection TypeScriptUnresolvedVariable
    return (window as any).grecaptcha.getResponse(this.targetRef.nativeElement);
  }

  private recaptchaCallback(response: string) {
    this.captchaResponse.emit(response);
  }

  private recaptchaExpiredCallback() {
    this.captchaExpired.emit();
  }
}
