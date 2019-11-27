export class IntervalsKeeper<T> {

  id: T;
  interval: number;
  deadline: number;

  constructor(
    private readonly RELOAD_INT = 1000, // 1 s
    private readonly MAX_RELOAD_INT = 30 * 1000, // 30 s
    private readonly MAX_RELOAD_TIME = 5 * 60 * 1000, // 5 min
    private readonly RELOAD_FACTOR = 2
  ) {

    if (RELOAD_FACTOR < 1) {
      this.RELOAD_FACTOR = 2;
    }
  }

  nextInterval(id: T): number {
    if (this.id !== id) {
      this.reset(id);
    } else {
      if (this.interval < this.MAX_RELOAD_INT) {
        this.interval *= this.RELOAD_FACTOR;
      }
    }

    if (this.deadline > Date.now()) {
      return this.interval;
    } else {
      return undefined;
    }
  }

  reset(id: T) {
    this.id = id;
    this.interval = this.RELOAD_INT;
    this.deadline = Date.now() + this.MAX_RELOAD_TIME;
  }

}
