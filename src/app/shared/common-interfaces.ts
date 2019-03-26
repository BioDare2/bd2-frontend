
export interface SetAble<V> {

  setAll(v:any): void;
  clone(): V;
}

export interface Validator<T> {

  validate(obj:T):string[];

}
