
export class BD2ColorPalette {

  static schemeCategory10 = [
    '#1f77b4',
    '#ff7f0e',
    '#2ca02c',
    '#d62728',
    '#9467bd',
    '#8c564b',
    '#e377c2',
    '#7f7f7f',
    '#bcbd22',
    '#17becf'
  ];

  static schemeCategory20 = [
'#1f77b4'
, '#aec7e8'
, '#ff7f0e'
, '#ffbb78'
, '#2ca02c'
, '#98df8a'
, '#d62728'
, '#ff9896'
, '#9467bd'
, '#c5b0d5'
, '#8c564b'
, '#c49c94'
, '#e377c2'
, '#f7b6d2'
, '#7f7f7f'
, '#c7c7c7'
, '#bcbd22'
, '#dbdb8d'
, '#17becf'
, '#9edae5'];

  static extendPalette(palette: string[] | ReadonlyArray<string>, size: number): string[] {

    if (!palette || palette.length === 0) {
      palette = ['black'];
    }

    const out = [];
    for (let i = 0; i < size; i++) {
      out.push(palette[i % palette.length]);
    }
    return out;

  }

  static palette(size: number): string[] {
    // if (true) return BD2ColorPalette.extendPalette(['#1f77b4'], size);
    if (size <= BD2ColorPalette.schemeCategory10.length) {
      return BD2ColorPalette.extendPalette(BD2ColorPalette.schemeCategory10, size);
    } else {
      return BD2ColorPalette.extendPalette(BD2ColorPalette.schemeCategory20, size);
    }

  }
}
