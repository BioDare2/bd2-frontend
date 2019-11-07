export function removeItemFromArr<V>(item: V, arr: V[]): boolean {
  const ix = arr.indexOf(item);
  if (ix >= 0) {
    arr.splice(ix, 1);
  }
  return ix >= 0;
}

export function shallowSet(source: any, destination: any) {
  for (const k in source) {
    destination[k] = source[k];
  }
}


export function arraysMatch(a: any[], b: any) {

  if (a === b) { return true; }
  if (a == null || b == null) { return false; }
  if (a.length !== b.length) { return false; }

  for (let i = 0; i < a.length; ++i) {
    if (a[i] !== b[i]) { return false; }
  }
  return true;
}
