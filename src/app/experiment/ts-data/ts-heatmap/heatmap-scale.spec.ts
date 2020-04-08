import {HeatmapScale} from './heatmap-scale';


fdescribe('HeatmapScale', () => {
  let scales: HeatmapScale;

  beforeEach(() => {
    scales = new HeatmapScale();
  });

  it('should be created', () => {
    expect(scales).toBeTruthy();
  });

  it('scaledColors scales points', ()=>{

    let scale = scales.scaledColors(-10,10);

    expect(scale[0].point).toBe(-10);
    expect(scale[1].point).toBe(-9);
    expect(scale[10].point).toBe(0);
    expect(scale[20].point).toBe(10);

    scale = scales.scaledColors(0,100);
    expect(scale[0].point).toBe(0);
    expect(scale[1].point).toBe(5);
    expect(scale[10].point).toBe(50);
    expect(scale[20].point).toBe(100);
  })

  it('customScales scales', ()=> {

    const scale = scales.customScale(-10, 10);

    expect(scale[0]).toEqual({
      from: -10.5 ,
      to: -9.5,
      color: '#d62728',
      name: '-10',
      point: -10,
    });
    expect(scale[20]).toEqual({
      from: 9.5 ,
      to: 10.5,
      color: '#1f77b4',
      name: '10',
      point: 10,
    });
    expect(scale[19]).toEqual({
      from: 8.5 ,
      to: 9.5,
      color: '#3585bc',
      name: '9',
      point: 9,
    });
  })
});
