import {Trace} from '../plots/ts-plot.dom';
import {DisplayParameters} from '../plots/ts-display.dom';
import {ExperimentalAssayView} from '../../dom/repo/exp/experimental-assay-view';
import {ColumnMap} from './column-map';
import {PageEvent} from '@angular/material/paginator';

export class CSVExporter {

  SEP = ',';

  renderCSVTable(timeseries: Trace[], params: DisplayParameters, page: PageEvent, exp: ExperimentalAssayView): string {

    const headers = this.prepareHeaders(exp, params, page, timeseries.length);
    this.appendDataLabels(headers, timeseries);

    const data = this.prepareDataTable(timeseries);

    let txt = this.mapToString(headers, this.SEP);
    txt += this.mapToString(data, this.SEP);

    return txt;
  }

  prepareHeaders(exp: ExperimentalAssayView, params: DisplayParameters, page: PageEvent, traces: number): ColumnMap<string, string> {
    const headers = this.prepareExpHeaders(exp);
    this.appendDisplayProperties(headers, params);
    this.appendDataProperties(headers, traces, page);
    return headers;
  }

  prepareExpHeaders(exp: ExperimentalAssayView): ColumnMap<string, string> {

    const headers = new ColumnMap<string, string>(false);
    headers.put('Exp Id:', '' + exp.id, 0);
    headers.put('Exp URL:', 'https://biodare2.ed.ac.uk/experiment/' + exp.id, 0);
    headers.put('Exp Name:', exp.name, 0);
    exp.contributionDesc.authors.forEach((p, ix) => {
      headers.put('Authors:', p.name, ix);
    });


    return headers;

  }

  appendDisplayProperties(headers: ColumnMap<string, string>, params: DisplayParameters) {

    headers.put('Time range:', params.timeScaleLabel, 0);
    headers.put('Detrending:', params.detrending.label, 0);
    if (params.hourly) {
      headers.put('Hourly binned:', 'true', 0);
    }
    if (params.log2) {
      headers.put('Log2 transform:', '' + params.log2, 0);
    }
    headers.put('Normalization:', params.normalisation, 0);
    headers.put('Normalization:', params.trimFirst ? 'within range' : 'whole serie', 1);
    headers.put('Align:', params.align, 0);
  }

  appendDataProperties(headers: ColumnMap<string, string>, traces: number, page: PageEvent) {
    headers.put('Traces', traces + ' of ' + page.length, 0);
    const pages = Math.floor(page.length / page.pageSize) + ( (page.length % page.pageSize) === 0 ? 0 : 1);
    headers.put('Data Page', (page.pageIndex + 1) + ' of ' + pages, 0 );

  }

  appendDataLabels(headers: ColumnMap<string, string>, timeseries: Trace[]) {
    timeseries.forEach((trace, ix) => {
      headers.put('Label:', trace.label, ix);
    });
  }

  prepareDataTable(timeseries: Trace[]): ColumnMap<number, number> {

    const table = new ColumnMap<number, number>();
    timeseries.forEach((ts) => {
      const keys = ts.data.map(tp => tp.x);
      const values = ts.data.map(tp => tp.y);
      table.appendColumn(keys, values);
    });
    return table;
  }

  mapToString(table: ColumnMap<any, any>, SEP: string): string {

    let txt = '';
    table.forEachFlat((row) => {
      for (let i = 0; i < row.length; i++) {
        if (row[i] !== undefined) {
          txt += row[i];
        }
        txt += SEP;
      }
      txt += '\n';
    });
    return txt;
  }


}
