/**
 * Utility class for smart rounding of numerical values based on a given base value.
 * 
 * The rounding precision is determined by the magnitude of the base value:
 * - If the base is less than 0.01, no rounding is applied.
 * - If the base is between 0.01 and 1, values are rounded to four decimal places.
 * - If the base is between 1 and 1000, values are rounded to two decimal places.
 * - If the base is 1000 or greater, values are rounded to the nearest whole number.
 */
export class SmartRounder {

  static round(value: number, base?: number): number {

    base = base || value;
    base = Math.abs(base);

    if (base < 0.01) {
      return value;
    }

    if (base < 1) {
      return Math.round(value * 10000) / 10000;
    }

    if (base < 1000) {
      return Math.round(value * 100) / 100;
    }
    return Math.round(value);
  }
}
