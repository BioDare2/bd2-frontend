import {CSVExporter} from './csv-exporter';
import {ExperimentalAssayView} from '../../dom/repo/exp/experimental-assay-view';
import {ColumnMap} from './column-map';
import {Timepoint, Trace} from '../plots/ts-plot.dom';
import {DisplayParameters} from '../plots/ts-display.dom';
import {DetrendingType} from '../ts-data-dom';

describe('CSVExporter', () => {

  let exporter: CSVExporter;

  beforeEach(() => {
    exporter = new CSVExporter();
  });

  it('prepares correct exp headers', () => {

    const exp = new ExperimentalAssayView();
    exp.id = 3;

    const headers = exporter.prepareExpHeaders(exp);
    expect(headers.getRow('Exp Id:')).toEqual(['3']);
  });

  it('appends correct data headers', () => {

    const params = new DisplayParameters(0, 0, DetrendingType.LIN_DTR, 'MEAN_NORM', 'NONE',
      DisplayParameters.firstPage());
    const table = new ColumnMap<string, string>();

    exporter.appendDataProperties(table, params);
    expect(table.getRow('Detrending:')).toEqual(['linear dtr']);
    expect(table.getRow('Normalization:')).toEqual(['MEAN_NORM']);
    expect(table.getRow('Align:')).toEqual(['NONE']);

  });

  it('appends data labels correctly', () => {

    const table = new ColumnMap<string, string>();
    const data: Trace[] = [];

    let t = new Trace();
    t.label = 'ALA';
    data.push(t);

    t = new Trace();
    t.label = '2';
    data.push(t);

    exporter.appendDataLabels(table, data);

    expect(table.getRow('Label:')).toEqual(['ALA', '2']);

  });

  it('creates correct data table', () => {

    const data: Trace[] = [];

    let t = new Trace();
    t.data.push(new Timepoint(0, 1));
    t.data.push(new Timepoint(2, 3));
    t.data.push(new Timepoint(3, 4));
    data.push((t));

    t = new Trace();
    t.data.push(new Timepoint(1, 2));
    t.data.push(new Timepoint(2, 3));
    data.push((t));

    const table = exporter.prepareDataTable(data);
    expect(table.getRow(0)).toEqual([1]);
    expect(table.getRow(1)).toEqual([undefined, 2]);
    expect(table.getRow(2)).toEqual([3, 3]);
    expect(table.getRow(3)).toEqual([4]);

  });

  it('mapToString renders the table', () => {
    let table = new ColumnMap<any, any>(false);
    table.put('A', 'A1', 0);
    table.put('B', 'B1', 0);

    let txt = exporter.mapToString(table, ',');

    let exp = 'A,A1,\n'
      + 'B,B1,\n';

    expect(txt).toEqual(exp);
    table = new ColumnMap<any, any>(true);

    table.append(3, 1);
    table.append(3, 2);
    table.put(1, 0, 0);
    table.put(1, 2, 2);
    table.put(1, false, 3);

    txt = exporter.mapToString(table, ',');

    exp = '1,0,,2,false,\n'
      + '3,1,2,\n';

    expect(txt).toEqual(exp);

  });

});

