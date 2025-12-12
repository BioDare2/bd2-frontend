import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LegendComponent } from './legend.component';

describe('LegendComponent', () => {
  let component: LegendComponent;
  let fixture: ComponentFixture<LegendComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LegendComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(LegendComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not render legend when show is false', () => {
    component.show = false;
    component.graphic = {};
    fixture.detectChanges();
    const svgGroup = fixture.nativeElement.querySelector('g.bd2hm-legend');
    expect(svgGroup).toBeNull();
  });

  it('should not render legend when graphic is falsy', () => {
    component.show = true;
    component.graphic = null;
    fixture.detectChanges();
    const svgGroup = fixture.nativeElement.querySelector('g.bd2hm-legend');
    expect(svgGroup).toBeNull();
  });

  it('should render legend when show is true and graphic is set', () => {
    component.show = true;
    component.graphic = {};
    fixture.detectChanges();
    const svgGroup = fixture.nativeElement.querySelector('g.bd2hm-legend');
    expect(svgGroup).not.toBeNull();
  });

  it('should render both legend rectangles and texts', () => {
    component.show = true;
    component.graphic = {};
    fixture.detectChanges();
    const svgGroup = fixture.nativeElement.querySelector('g.bd2hm-legend');
    const rects = svgGroup.querySelectorAll('rect');
    const texts = svgGroup.querySelectorAll('text');
    expect(rects.length).toBe(4);
    expect(texts.length).toBe(2);
    expect(texts[0].textContent).toContain('Value > 0');
    expect(texts[1].textContent).toContain('Value < 0');
  });

  it('should set the transform attribute according to position input', () => {
    component.show = true;
    component.graphic = {};
    component.position = 'translate(50, 10)';
    fixture.detectChanges();
    const svgGroup = fixture.nativeElement.querySelector('g.bd2hm-legend');
    expect(svgGroup.getAttribute('transform')).toBe('translate(50, 10)');
  });
});
