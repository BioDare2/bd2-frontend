import {Component, forwardRef, OnInit} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';

/**
 * Based on
 * https://javascript-conference.com/blog/angular-reactive-forms-building-custom-form-controls/
 * https://itnext.io/creating-a-custom-form-field-control-compatible-with-reactive-forms-and-angular-material-cf195905b451
 */

const CUSTOM_VALUE_ACCESSOR: any = {
  provide : NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => SortSwitchComponent),
  multi : true,
};

@Component({
  selector: 'bd2-sort-switch',
  template: `
    <button mat-mini-fab aria-label="sorting" [disabled]="disabled">
      <i *ngIf="value === 'asc'" class="material-icons  icon-flipped-h" (click)="select('desc')">sort</i>
      <i *ngIf="value === 'desc'" class="material-icons"  (click)="select('')">sort</i>
      <i *ngIf="value === ''" class="material-icons" (click)="select('asc')">more_horiz</i>
    </button>
  `,
  styles: [],
  providers : [CUSTOM_VALUE_ACCESSOR],
})
export class SortSwitchComponent implements OnInit, ControlValueAccessor {

  value = '';
  disabled = false;

  private onChange = (_: any) => {};
  private onTouched = () => {};

  constructor() { }

  ngOnInit() {
  }

  select(val: string) {
    if (this.disabled) { return; }

    this.value = val;
    this.onChange(this.value);
    this.onTouched();
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  writeValue(obj: any): void {
    this.value = obj;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

}
