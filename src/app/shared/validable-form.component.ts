import {Validator} from './common-interfaces';

export abstract class ValidableFormComponent<T> {

  errors: string[] = undefined;

  constructor(protected validator?: Validator<T>) {
  }

  triggerValidation(): boolean {
    const err = this.validate(this.getModel());
    if (err) {
      this.showErrors(err);
      return false;
    } else {
      this.clearErrors();
      return true;
    }
  }

  clearErrors() {
    this.errors = undefined;
  }

  showErrors(err: string[]) {
    // err.forEach( e => this.errors.push(e));
    this.errors = err;
  }

  validate(obj: T): string[] {
    if (this.validator) {
      const err = this.validator.validate(obj);
      if (err.length === 0) {
        return null;
      } else {
        return err;
      }
    }
    return null;
  }

  protected abstract getModel(): T;
}
