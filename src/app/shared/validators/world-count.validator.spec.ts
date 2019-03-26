import {SimpleTokenizer, SimpleWorldsTools, WorldCountValidator} from './world-count.validator';

describe('SimpleTokenizer', () => {

  it('should return empty string if starts with null, or empty string', () => {

    let tokenizer = new SimpleTokenizer(null);
    expect(tokenizer.next()).toBe('');

    tokenizer = new SimpleTokenizer(undefined);
    expect(tokenizer.next()).toBe('');

    tokenizer = new SimpleTokenizer('');
    expect(tokenizer.next()).toBe('');

  });

  it('should return the only world that contains', () => {
    const tokenizer = new SimpleTokenizer('OKish');
    expect(tokenizer.next()).toBe('okish');
    expect(tokenizer.next()).toBe('');
    expect(tokenizer.next()).toBe('');
  });

  it('should trims whitecaracters', () => {
    const tokenizer = new SimpleTokenizer(`  OKish
         `);
    expect(tokenizer.next()).toBe('okish');
    expect(tokenizer.next()).toBe('');
    expect(tokenizer.next()).toBe('');
  });

  it('should split on whitecharaceters', () => {
    const tokenizer = new SimpleTokenizer(` OKish\trubish
        if
        not\t\t\t \there`);
    expect(tokenizer.next()).toBe('okish');
    expect(tokenizer.next()).toBe('rubish');
    expect(tokenizer.next()).toBe('if');
    expect(tokenizer.next()).toBe('not');
    expect(tokenizer.next()).toBe('here');
    expect(tokenizer.next()).toBe('');
  });

  it('should handle polish characters and numbers', () => {
    const tokenizer = new SimpleTokenizer('toc1-23 polięółśćż 123');
    expect(tokenizer.next()).toBe('toc1-23');
    expect(tokenizer.next()).toBe('polięółśćż');
    expect(tokenizer.next()).toBe('123');
    expect(tokenizer.next()).toBe('');

  });

  it('should remove some punctuations', () => {
    const tokenizer = new SimpleTokenizer('toc1.ma here, not. above: .,');
    expect(tokenizer.next()).toBe('toc1ma');
    expect(tokenizer.next()).toBe('here');
    expect(tokenizer.next()).toBe('not');
    expect(tokenizer.next()).toBe('above');
    expect(tokenizer.next()).toBe('');

  });

});


describe('SimpleWorldsTools', () => {

  describe('removeLetterChain', () => {

    it('can handle empty string', () => {
      expect(SimpleWorldsTools.removeLetterChain(null)).toBe('');
      expect(SimpleWorldsTools.removeLetterChain(undefined)).toBe('');
      expect(SimpleWorldsTools.removeLetterChain('')).toBe('');
    });

    it('can handle single letter', () => {
      expect(SimpleWorldsTools.removeLetterChain('a')).toBe('a');
    });

    it('removes chain of same letters', () => {
      expect(SimpleWorldsTools.removeLetterChain('aaallabcddefggg')).toBe('alabcdefg');
    });
  });

  describe('removePairChain', () => {

    it('can handle empty string', () => {
      expect(SimpleWorldsTools.removePairChain(null)).toBe('');
      expect(SimpleWorldsTools.removePairChain(undefined)).toBe('');
      expect(SimpleWorldsTools.removePairChain('')).toBe('');
    });

    it('can handle short strings', () => {
      expect(SimpleWorldsTools.removePairChain('s')).toBe('s');
      expect(SimpleWorldsTools.removePairChain('sd')).toBe('sd');
      expect(SimpleWorldsTools.removePairChain('sds')).toBe('sds');
      expect(SimpleWorldsTools.removePairChain('sdsf')).toBe('sdsf');
      expect(SimpleWorldsTools.removePairChain('sdsfs')).toBe('sdsfs');
    });

    it('preserves triplicates', () => {
      expect(SimpleWorldsTools.removePairChain('sdsadafgh')).toBe('sdsadafgh');
      expect(SimpleWorldsTools.removePairChain('sdsadafghf')).toBe('sdsadafghf');
    });

    it('removes pairs', () => {
      expect(SimpleWorldsTools.removePairChain('sdsddafgdada')).toBe('sddafgda');
      expect(SimpleWorldsTools.removePairChain('ssdsddafgdada')).toBe('ssddafgda');
      expect(SimpleWorldsTools.removePairChain('alalal')).toBe('al');
      expect(SimpleWorldsTools.removePairChain('alalala')).toBe('ala');
    });


  });

  describe('isSensibleWorld', () => {

    it('gives false on short worlds', () => {
      expect(SimpleWorldsTools.isSensibleWorld('')).toBe(false);
      expect(SimpleWorldsTools.isSensibleWorld('a')).toBe(false);
      expect(SimpleWorldsTools.isSensibleWorld('I')).toBe(false);
      expect(SimpleWorldsTools.isSensibleWorld('me')).toBe(false);
      expect(SimpleWorldsTools.isSensibleWorld('see')).toBe(false);
      expect(SimpleWorldsTools.isSensibleWorld('but')).toBe(false);
      expect(SimpleWorldsTools.isSensibleWorld('end')).toBe(false);
    });

    it('gives false on typical abuse', () => {
      expect(SimpleWorldsTools.isSensibleWorld('xxxxxxxxxxxxxxxxx')).toBe(false);
      expect(SimpleWorldsTools.isSensibleWorld('sdsfsdsdfdfdssdsd')).toBe(false);
      expect(SimpleWorldsTools.isSensibleWorld('fffdfdfdddfddf')).toBe(false);
      expect(SimpleWorldsTools.isSensibleWorld('sdfsdfsfsadfsdafs')).toBe(false);
      expect(SimpleWorldsTools.isSensibleWorld('sdfsdffssf')).toBe(false);
    });

    it('gives true on simple world', () => {
      expect(SimpleWorldsTools.isSensibleWorld('will')).toBe(true);
      expect(SimpleWorldsTools.isSensibleWorld('look')).toBe(true);
      expect(SimpleWorldsTools.isSensibleWorld('check')).toBe(true);
      expect(SimpleWorldsTools.isSensibleWorld('investigate')).toBe(true);
      expect(SimpleWorldsTools.isSensibleWorld('temperature')).toBe(true);
      expect(SimpleWorldsTools.isSensibleWorld('clock')).toBe(true);
    });

    it('countDistinctCharacters counts distings', () => {
      expect(SimpleWorldsTools.countDistinctCharacters('')).toBe(0);
      expect(SimpleWorldsTools.countDistinctCharacters('a')).toBe(1);
      expect(SimpleWorldsTools.countDistinctCharacters('aaaabaaa')).toBe(2);
      expect(SimpleWorldsTools.countDistinctCharacters('aacaabaafffa')).toBe(4);

    });
  });

  describe('simplifyWorld', () => {

    it('can handle empty string', () => {
      expect(SimpleWorldsTools.simplifyWorld(null)).toBe('');
      expect(SimpleWorldsTools.simplifyWorld(undefined)).toBe('');
      expect(SimpleWorldsTools.simplifyWorld('')).toBe('');
    });

    it('removes duplicates and pairs', () => {
      expect(SimpleWorldsTools.simplifyWorld('nothingTochange')).toBe('nothingTochange');
      expect(SimpleWorldsTools.simplifyWorld('hearMeeeeOeOut')).toBe('hearMeOut');
    });

  });

});

describe('WorldCountValidator', () => {
  let validator: WorldCountValidator;

  beforeEach(() => {
    validator = new WorldCountValidator();
  });

  it('should initialize correctly', () => {
    expect(validator).toBeTruthy();
    expect(validator.minWords).toBe(5);
  });

  it('should validate on long descriptions', () => {
    let text = 'Chcecking clock mutants in low and high lights';
    expect(validator.validateText(text)).toBeNull();

    text = 'Investigating auxin effect on clock genes mutants';
    expect(validator.validateText(text)).toBeNull();
  });

  it('should rejects random descriptions', () => {
    const text = 'xxxxxxxxxxxxxxxxxxxxxxxxxxx sdfsdfsfsadfsdafs fsafsffasfsa sdfsafsdafdfsadf dfdfdfdfdfdfd ';
    expect(validator.validateText(text)).not.toBeNull();
  });

  it('should rejects description with known wrong words', () => {
    const text = 'Sensible description with more than few words is required';
    expect(validator.validateText(text)).not.toBeNull();
  });

  it('should cache previously valid text', () => {

    spyOn(validator, 'countWords').and.callThrough();
    expect((validator.countWords as any).calls.count()).toBe(0);
    let text = 'Chcecking clock mutants in low and high blue lights';
    expect(validator.validateText(text)).toBeNull();
    expect((validator.countWords as any).calls.count()).toBe(1);

    text = 'xxxxxxxxxxxxxxxxxxxxxxxxxxx sdfsdfsfsadfsdafs fsafsffasfsa sdfsafsdafdfsadf dfdfdfdfdfdfd';
    expect(validator.validateText(text)).not.toBeNull();
    // console.log("A: ",validator.validateText(text));
    expect((validator.countWords as any).calls.count()).toBe(2);


    text = 'Chcecking clock mutants in low and high blue lights more worlds';
    expect(validator.validateText(text)).toBeNull();
    expect((validator.countWords as any).calls.count()).toBe(2);


    text = 'Chcecking clock mutants in low and high blue';
    expect(validator.validateText(text)).toBeNull();
    expect((validator.countWords as any).calls.count()).toBe(3);

  });


  it('should count longer worlds only', () => {

    const text = 'I am who I am but I will be there and no matter what';
    const expT = 'wil there mater what';
    const exp = 4;
    expect(validator.countWords(text, 5)).toBe(exp);
  });

  it('should break worlds on spaces tabs and new lines', () => {

    const text = `space tabulation\tnewline
        here theend`;
    const exp = 5;
    expect(validator.countWords(text, 5)).toBe(exp);
  });

  it('should remove letters duplicates from counting', () => {
    const text = 'ddddd ssssss good accept';
    const exp = 2;
    expect(validator.countWords(text, 5)).toBe(exp);
  });

  it('should remove letters duplicates from counting with high minLength', () => {
    const text = 'ddddd ssssss good accept';
    const exp = 2;
    validator.minWords = 20;
    expect(validator.countWords(text, 5)).toBe(exp);
  });

  it('should remove pair of sequences', () => {

    const text = 'toto dfdfokrest fkfk';
    const exp = 1;
    expect(validator.countWords(text, 5)).toBe(exp);
  });

  it('should not count duplicates', () => {

    const text = 'duplicate Duplicate clock Clock duplicatE';
    const exp = 2;
    expect(validator.countWords(text, 5)).toBe(exp);
  });


  it('should give high number on sensible descriptions', () => {

    let text = 'Chcecking typical clock mutants in low and high lights';
    // console.log(validator.countWords(text,20)+"\t"+text);
    expect(validator.countWords(text, 20)).toBeGreaterThan(4);

    text = 'Investigating oxin effect on clock';
    // console.log(validator.countWords(text,20)+"\t"+text);

    text = 'Screening for clock mutants in read light';
    // console.log(validator.countWords(text,20)+"\t"+text);

    text = 'Phaser resposne in GAL1 and WT by temp.';
    // console.log(validator.countWords(text,20)+"\t"+text);

  });
});
