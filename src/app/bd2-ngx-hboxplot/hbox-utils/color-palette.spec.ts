import {BD2ColorPalette} from './color-palette';
describe('BD2ColorPalette', () => {

  it('gives pallet array', () => {
    let p = BD2ColorPalette.palette(3);
    expect(p.length).toBe(3);
    expect(p[2]).toBeDefined();

    p = BD2ColorPalette.palette(30);
    expect(p.length).toBe(30);
    expect(p[29]).toBeDefined();
  });

  it('extends empty palette to black', () => {
    let p: string[] = [];
    expect(BD2ColorPalette.extendPalette(p, 2)).toEqual(['black', 'black']);

    p = null;
    expect(BD2ColorPalette.extendPalette(p, 2)).toEqual(['black', 'black']);
  });

  it('extends given palette', () => {
    const p: string[] = ['red', 'blue'];

    let ans = BD2ColorPalette.extendPalette(p, 2);
    expect(ans).toEqual(['red', 'blue']);

    ans = BD2ColorPalette.extendPalette(p, 3);
    expect(ans).toEqual(['red', 'blue', 'red']);

    ans = BD2ColorPalette.extendPalette(p, 4);
    expect(ans).toEqual(['red', 'blue', 'red', 'blue']);
  });
});
