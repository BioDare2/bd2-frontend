export function removeItemFromArr<V>(item: V, arr: V[]): boolean {
  const ix = arr.indexOf(item);
  if (ix >= 0) {
    arr.splice(ix, 1);
  }
  return ix >= 0;
}

/* tslint:disable */
export function shallowSet(source: any, destination: any) {
  for (let k in source) {
    destination[k] = source[k];
  }
}

/* tslint:enable */


