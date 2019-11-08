import {arraysMatch, pageObjectData, removeItemFromArr, shallowSet, sortObjectData} from './collections-util';
import {PageEvent} from '@angular/material';


describe('collections-util removeItemFromArr', () => {


  beforeEach(() => {
  });

  it('removes first equal element from input array', () => {

    const obj = {a: 'a'};
    let arr = [];

    expect(removeItemFromArr(obj, arr)).toBe(false);

    arr = [1, 2, obj, 3, obj];
    expect(removeItemFromArr(obj, arr)).toBe(true);
    expect(arr).toEqual([1, 2, 3, obj]);

  });

});

describe('collections-util shallowSet', () => {


  beforeEach(() => {
  });

  it('shallowSet copies properties from source object', () => {

    const source = {a: 'a', b: [1]};
    let dest: any = {};

    shallowSet(source, dest);

    expect(dest).toEqual(source);
    expect(dest.b).toBe(source.b);

    dest = {a: 'b', extra: 2};
    shallowSet(source, dest);
    expect(dest).not.toEqual(source);
    expect(dest.b).toBe(source.b);
    expect(dest.a).toEqual('a');
    expect(dest.extra).toEqual(2);


  });

});

describe('collections-util arraysMatch', () => {


  beforeEach(() => {
  });

  it('arraysMatch compare arrays', () => {

    let a: any[] = null;
    let b: any[];

    expect(arraysMatch(a, b)).toBe(false);

    a = [];
    expect(arraysMatch(a, b)).toBe(false);

    b = [];
    expect(arraysMatch(a, b)).toBe(true);

    a.push('1');
    expect(arraysMatch(a, b)).toBe(false);

    b.push(1);
    expect(arraysMatch(a, b)).toBe(false);

    a = [1, '2', 3];
    b = [1, '2', 3];

    expect(arraysMatch(a, b)).toBe(true);

    const o = {};
    a.push(o);
    expect(arraysMatch(a, b)).toBe(false);

    b.push(o);
    expect(arraysMatch(a, b)).toBe(true);

    a.push(o);
    b.push({});
    expect(arraysMatch(a, b)).toBe(false);

  });

});

describe('collections-util sortObjectData', () => {


  beforeEach(() => {
  });

  it('sortObjectData returns table sorted with the key', () => {

    const o1 = {a: 1, b: 'b'};
    const o2 = {a: 3, b: 'c'};
    const o3 = {a: 2, b: 'a'};
    const arr = [o1, o2 , o3 ];

    let k = v => v.a;

    let sorted = sortObjectData(arr, 'asc', k);
    expect(sorted).toEqual([o1, o3, o2]);

    sorted = sortObjectData(arr, 'desc', k);
    expect(sorted).toEqual([o2, o3, o1]);

    k = v => v.b;
    sorted = sortObjectData(arr, 'asc', k);
    expect(sorted).toEqual([o3, o1, o2]);

  });

  it('sortObjectData preservers original', () => {

    const o1 = {a: 1, b: 'b'};
    const o2 = {a: 3, b: 'c'};
    const o3 = {a: 2, b: 'a'};
    const arr = [o1, o2 , o3 ];

    const k = v => v.a;

    const sorted = sortObjectData(arr, 'asc', k);
    expect(sorted).toEqual([o1, o3, o2]);
    expect(arr).toEqual([o1, o2 , o3 ]);

  });

});

describe('collections-util pageObjectData', () => {


  beforeEach(() => {
  });

  it('pageObjectData returns table slice', () => {

    const o1 = {a: 1, b: 'b'};
    const o2 = {a: 3, b: 'c'};
    const o3 = {a: 2, b: 'a'};
    const arr = [o1, o2 , o3 ];

    let page: PageEvent;

    let paged = pageObjectData(arr, page);
    expect(paged).toBe(arr);

    page = new PageEvent();
    page.pageIndex = 0;
    page.pageSize = 2;
    paged = pageObjectData(arr, page);
    expect(paged).toEqual([o1, o2 ]);

    page = new PageEvent();
    page.pageIndex = 1;
    page.pageSize = 2;
    paged = pageObjectData(arr, page);
    expect(paged).toEqual([o3 ]);

  });

  it('pageObjectData preservers original', () => {

    const o1 = {a: 1, b: 'b'};
    const o2 = {a: 3, b: 'c'};
    const o3 = {a: 2, b: 'a'};
    const arr = [o1, o2 , o3 ];

    const page = new PageEvent();
    page.pageIndex = 0;
    page.pageSize = 2;
    const paged = pageObjectData(arr, page);
    expect(arr).toEqual([o1, o2 , o3 ]);
    expect(paged).not.toEqual([o1, o2 , o3 ]);

  });

});
