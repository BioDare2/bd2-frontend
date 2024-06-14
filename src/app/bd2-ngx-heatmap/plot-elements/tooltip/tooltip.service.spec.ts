import {fakeAsync, tick} from '@angular/core/testing';

import {TooltipService} from './tooltip.service';
import {Point} from '../../bd2-heatmap.dom';

describe('TooltipService', () => {
  let service: TooltipService;

  beforeEach(() => {
    service = new TooltipService();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('show sends reques', fakeAsync(() => {
    const label = 'A';
    const point = {x: 1, y: 2};
    const location = {x: 2, y: 3};

    let resp: [boolean, string, Point, Point];

    service.request$.subscribe( v => resp = v);
    expect(resp).toBeUndefined();
    service.showTooltip(label, point, location);
    tick();

    expect(resp[0]).toBe(true);
    expect(resp[1]).toBe(label);
    expect(resp[2]).toBe(point);
    expect(resp[3]).toBe(location);

  }));

  it('hide sends reques', fakeAsync(() => {
    const point = {x: 1, y: 2};
    const location = {x: 2, y: 3};

    let resp: [boolean, string, Point, Point];

    service.request$.subscribe( v => resp = v);
    expect(resp).toBeUndefined();
    service.hideTooltip(point, location);
    tick();

    expect(resp[0]).toBe(false);
    expect(resp[1]).toBeUndefined();
    expect(resp[2]).toBe(point);
    expect(resp[3]).toBe(location);

  }));

  it('on destroy closes', fakeAsync(() => {
    let finished = false;
    service.request$.subscribe( v => {}, e => {}, () => finished = true);
    service.ngOnDestroy();
    tick();
    expect(finished).toBe(true);
  }));
});
