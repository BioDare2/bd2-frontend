export class LocalDate {

  constructor(private _year: number,
              private _month: number,
              private _day: number) {
  }

  get date(): Date {
    return new Date(this._year, this._month - 1, this._day);
  }

  static deserialize(jsonObj: any): LocalDate {
    if (jsonObj) {
      return new LocalDate(jsonObj[0], jsonObj[1], jsonObj[2]);
    } else {
      return null;
      // return new Date(jsonObj[0],jsonObj[1]-1,jsonObj[2]);
    }
  }

  toJSON(): number[] {
    return [this._year, this._month, this._day];
  }


}

export class LocalDateTime {

  constructor(private _year: number,
              private _month: number,
              private _day: number,
              private _hour: number,
              private _minute: number,
              private _second?: number,
              private _milisecond?: number) {

    this._second = _second || 0;
    this._milisecond = _milisecond || 0;
  }

  get date(): Date {
    // return new Date(this._year, (this._month - 1), this._day, this._hour, this._minute, this._second, this._milisecond);
    return new Date(this._year, (this._month - 1), this._day, this._hour, this._minute, this._second);
  }

  static deserialize(jsonObj: any): LocalDateTime {
    if (jsonObj) {
      return new LocalDateTime(jsonObj[0], jsonObj[1], jsonObj[2], jsonObj[3], jsonObj[4], jsonObj[5], jsonObj[6]);
    } else {
      return null;
      // return new Date(jsonObj[0],jsonObj[1]-1,jsonObj[2]);
    }
  }

  toJSON(): number[] {
    return [this._year, this._month, this._day, this._hour, this._minute, this._second, this._milisecond];
  }


}
