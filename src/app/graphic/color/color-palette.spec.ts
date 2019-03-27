import {BD2ColorPalette} from './color-palette';

describe('BD2ColorPalette', () => {


  it('gives pallet array', () => {
    let p = BD2ColorPalette.palette(3);
    expect(p.length).toBe(3);
    expect(p[0]).not.toEqual(p[1]);
    expect(p[2]).toBeDefined();

    p = BD2ColorPalette.palette(30);
    expect(p.length).toBe(30);
    expect(p[0]).not.toEqual(p[1]);
    expect(p[0]).not.toEqual(p[10]);
    expect(p[0]).not.toEqual(p[11]);
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

  it('toRGBA ignores non hex colors', () => {
    const color = 'black';
    expect(BD2ColorPalette.toRGBA(color, 1)).toBe(color);
  });

  it('toRGBA decodes hex colors', () => {
    const color = '#1f77b4';
    expect(BD2ColorPalette.toRGBA(color, 0.3)).toBe('rgba(31,119,180,0.3)');
  });

});
