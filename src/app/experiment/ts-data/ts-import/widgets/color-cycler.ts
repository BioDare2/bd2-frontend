export class ColorCycler {

  static TIME_BG = 'lightyellow';
  static IGNORED_BG = 'lightgrey';
  static NOISE_BG = 'darkgrey';

  static colors = [
    'lightgreen',
    'lightblue',
    'lightcoral',
    'lightcyan',
    'lightgreen',
    'lightpink',
    'lightsalmon',
    'lightseagreen',
    'lightskyblue',
    'palegoldenrod',
    'paleturquoise',
    'palevioletred'
  ];

  static color(i: number): string {
    // let ix = i % this.colors.length;
    return ColorCycler.colors[i % ColorCycler.colors.length];
  }

}
