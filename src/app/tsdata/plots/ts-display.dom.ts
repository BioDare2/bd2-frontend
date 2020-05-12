import {DetrendingType} from '../ts-data-dom';
import { PageEvent } from '@angular/material/paginator';

export function validTimeScale(timeScale: any): { [key: string]: any } {
  // console.log("Validator called: "+JSON.stringify(control.value));
  const start = timeScale.timeStart;
  const end = timeScale.timeEnd;
  if (start < 0) {
    return {validTimeScale: 'Start time must >= 0'};
  }
  if (end < 0) {
    return {validTimeScale: 'End time must >= 0'};
  }
  if (end > 0 && start >= end) {
    return {validTimeScale: 'Start time must be < end time'};
  }
  // console.log("Validator passed: "+JSON.stringify(control.value));
  return null;
}


export class DisplayParameters {

  constructor(timeStart: number, timeEnd: number, public detrending: DetrendingType,
              public normalisation: string, public align: string, public page: PageEvent,
              public log2 = false, public trimFirst = false, public hourly = false) {

    this.timeScale = {
      timeStart,
      timeEnd
    };
    this.page = page || DisplayParameters.firstPage();

  }

  get timeStart(): number {
    return this.timeScale.timeStart;
  }

  get timeEnd(): number {
    return this.timeScale.timeEnd;
  }

  timeScale: {
    timeStart: number;
    timeEnd: number;
  };

  static firstPage() {
    const page = new PageEvent();
    page.pageIndex = 0;
    page.pageSize = 50;
    return page;

  }

  static equalsPages(page: PageEvent, otherPage: PageEvent) {
    if (page) {
      if (otherPage) {
        return (page.pageIndex === otherPage.pageIndex) &&
          (page.pageSize === otherPage.pageSize);
      } else {
        return false;
      }
    } else {
      return !otherPage;
    }
  }

  isValid(): boolean {
    if (this.timeScale.timeStart < 0 || this.timeScale.timeEnd < 0) {
      return false;
    }
    if (this.timeScale.timeEnd > 0 && this.timeScale.timeStart >= this.timeScale.timeEnd) {
      return false;
    }
    return true;
  }

  equals(other: DisplayParameters): boolean {
    if (!other) {
      return false;
    }
    if (!this.equalsView(other)) {
      return false;
    }
    if (this.detrending !== other.detrending) {
      return false;
    }
    if (!this.equalsPage(other.page)) {
      return false;
    }

    return true;
  }

  equalsView(other: DisplayParameters): boolean {
    if (!other) {
      return false;
    }
    if (this.timeScale.timeStart !== other.timeScale.timeStart) {
      return false;
    }
    if (this.timeScale.timeEnd !== other.timeScale.timeEnd) {
      return false;
    }
    if (this.normalisation !== other.normalisation) {
      return false;
    }
    if (this.align !== other.align) {
      return false;
    }
    if (this.log2 !== other.log2) {
      return false;
    }
    if (this.trimFirst !== other.trimFirst) {
      return false;
    }
    if (this.hourly !== other.hourly) {
      return false;
    }
    return true;
  }

  equalsPage(otherPage: PageEvent) {
    return DisplayParameters.equalsPages(this.page, otherPage);
  }

  clone(): DisplayParameters {
    const other = new DisplayParameters(this.timeStart, this.timeEnd, this.detrending,
      this.normalisation, this.align, this.page, this.log2, this.trimFirst, this.hourly);
    return other;
  }

  setAll(other: any) {
    Object.assign(this, other);

    this.timeScale.timeStart = other.timeScale ? other.timeScale.timeStart : other.timeStart;
    this.timeScale.timeEnd = other.timeScale ? other.timeScale.timeEnd : other.timeEnd;

    /*this.detrending = other.detrending;
    this.normalisation = other.normalisation;
    this.align = other.align;
    this.page = other.page;
    this.log2 = other.log2;
    this.trimFirst = other.trimFirst;*/
  }

}
