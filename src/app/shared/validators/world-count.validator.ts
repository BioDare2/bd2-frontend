import {ValidationErrors} from '@angular/forms';

export class SimpleTokenizer {

  nextPosition: number;
  currentWorld: string;
  limit: number;
  text: string;

  constructor(text: string) {
    this.text = text || '';
    this.nextPosition = 0;
    this.limit = this.text.length;
    this.currentWorld = '';
  }

  next(): string {
    if (this.nextPosition >= this.limit) {
      return '';
    }

    for (; this.nextPosition < this.limit; this.nextPosition++) {
      const c = this.text.charAt(this.nextPosition);
      if (c === ' ' || c === '\t' || c === '\n') {
        if (this.currentWorld) {
          const token = this.currentWorld.toLowerCase();
          this.currentWorld = '';
          return token;
        }
        // else nothing we read next charracter as it is chain of whitespaces

      } else if (c === '.' || c === ',' || c === ':' || c === '\'') {
        // skip punctuation
        continue;
      } else {
        // normal character
        this.currentWorld = this.currentWorld + c;
      }

    }

    // if here we read till the end, return the currentWorld as it is the last one
    return this.currentWorld.toLowerCase();
  }
}


export class SimpleWorldsTools {

  static bannedWords = SimpleWorldsTools.initBannedWords();

  static initBannedWords(): Set<String> {
    const banned = new Set<String>();
    banned.add('sensible');
    banned.add('description');
    banned.add('with');
    banned.add('more');
    banned.add('words');
    banned.add('required');
    // banned.add('clock');
    banned.add('purpose');
    banned.add('hypothesis');
    return banned;
  }

  static removeLetterChain(world: string): string {
    if (!world) {
      return '';
    }
    const limit = world.length;
    let simplified = world.charAt(0);
    let prev = world.charAt(0);
    for (let pos = 1; pos < limit; pos++) {
      const c = world.charAt(pos);
      if (c !== prev) {
        prev = c;
        simplified += c;
      }
    }
    return simplified;
  }

  static removePairChain(world: string): string {
    if (!world) {
      return '';
    }
    if (world.length < 4) {
      return world;
    }

    const limit = world.length - 1;
    let simplified = world.substring(0, 2);
    let prev = simplified;

    let pos = 2;
    while (pos < limit) {
      const pair = world.substring(pos, pos + 2);

      if (pair !== prev) {
        prev = prev.charAt(1) + pair.charAt(0);
        simplified += pair.charAt(0);
        pos++;
      } else {
        // skip the whole pair
        pos += 2;
      }
    }
    if (pos == limit) {
      // there is one sign left
      simplified += world.charAt(world.length - 1);
    }
    return simplified;
  }

  static simplifyWorld(world: string): string {
    let simplified = SimpleWorldsTools.removeLetterChain(world);
    simplified = SimpleWorldsTools.removePairChain(simplified);
    return simplified;
  }

  static countDistinctCharacters(world: string): number {
    if (!world) {
      return 0;
    }
    const chars = new Set<String>();
    for (let i = 0; i < world.length; i++) {
      chars.add(world.charAt(i));
    }
    return chars.size;

  }

  static isSensibleWorld(world: string): boolean {
    if (!world) {
      return false;
    }
    if (world.length > 6 && SimpleWorldsTools.countDistinctCharacters(world) <= 4) {
      return false;
    }

    if (SimpleWorldsTools.bannedWords.has(world)) {
      return false;
    }
    const simplified = SimpleWorldsTools.simplifyWorld(world);
    let threshold = 4;
    if (world.length === 4) {
      threshold = 3;
    }
    if (world.length > 10) {
      threshold = 0.6 * world.length;
    }
    return (simplified.length >= threshold);
  }

}


export class WorldCountValidator {

  minWords = 5;
  previouslyValid = '';

  constructor(words?: number) {
    this.minWords = words || 5;
  }

  validateText(text: string): ValidationErrors | null {

    if (text && this.previouslyValid && text.startsWith(this.previouslyValid)) {
      return null;
    }

    const words = this.countWords(text, this.minWords);
    if (words < this.minWords) {
      return {minWords: 'required ' + this.minWords + ' found: ' + words};
    }


    // valid, lets store it
    this.previouslyValid = text;
    return null;

  }

  countWords(text: string, limit: number): number {

    const tokenizer = new SimpleTokenizer(text);
    const worlds = new Set<String>();

    for (let world = tokenizer.next(); world && worlds.size < limit; world = tokenizer.next()) {
      if (SimpleWorldsTools.isSensibleWorld(world)) {
        worlds.add(world);
      }// ++;
    }
    return worlds.size;
  }
}
