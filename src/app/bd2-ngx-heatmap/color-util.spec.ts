import {colors} from './color-util';

describe('ColorUtil', () => {

  it('colors gives coloars for range -1,0,1 for step', () => {

    let col = colors();
    expect(col.length).toBe(21);

    col = colors('red', 'white', 'blue', 1);
    expect(col.length).toBe(3);
    expect(col).toEqual(['#ff0000', '#ffffff', '#0000ff']);

  });
});
