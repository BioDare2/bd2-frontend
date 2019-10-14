import {SelectionColorCycler, TableSelector, TableStyler} from './table-styling';
import {CellSelection} from '../data-table-dom';


describe( 'TableStyler', () => {

  let styler: TableStyler;

  beforeEach( () => {

    styler = new TableStyler();
  });

  it('gets empty as rowBackground color on non set or the value', () => {

    expect(styler.rowBackground(1)).toEqual('');
    expect(styler.rowBackground(10)).toEqual('');

    styler.setRowBackground(2, 'green');
    expect(styler.rowBackground(2)).toEqual('green');
    expect(styler.rowBackground(10)).toEqual('');
  });

  it('gets empty as colBackground color on non set or the value', () => {

    expect(styler.colBackground(1)).toEqual('');
    expect(styler.colBackground(10)).toEqual('');

    styler.setColBackground(2, 'red');
    expect(styler.colBackground(2)).toEqual('red');
    expect(styler.colBackground(10)).toEqual('');
  });

  it('gets empty as cellBackground color on non set or the value', () => {

    expect(styler.cellBackground(1, 5)).toEqual('');
    expect(styler.cellBackground(5, 1)).toEqual('');

    styler.setCellBackground(1, 5, 'red');
    expect(styler.cellBackground(1, 5)).toEqual('red');
    expect(styler.cellBackground(5, 1)).toEqual('');

    styler.setCellBackground(5, 1, 'black');
    expect(styler.cellBackground(1, 5)).toEqual('red');
    expect(styler.cellBackground(5, 1)).toEqual('black');
  });

  it('gets column background color if cell is not set', () => {

    expect(styler.cellBackground(1, 5)).toEqual('');
    expect(styler.cellBackground(5, 1)).toEqual('');

    styler.setColBackground(1, 'green');
    expect(styler.cellBackground(1, 5)).toEqual('green');
    expect(styler.cellBackground(5, 1)).toEqual('');

    styler.setCellBackground(1, 5, 'red');
    expect(styler.cellBackground(1, 5)).toEqual('red');
    expect(styler.cellBackground(5, 1)).toEqual('');

    styler.setColBackground(5, 'green');
    expect(styler.cellBackground(1, 5)).toEqual('red');
    expect(styler.cellBackground(5, 1)).toEqual('green');
  });
});

describe( 'TableSelector', () => {

  let selector: TableSelector;

  beforeEach(() => {
    selector = new TableSelector();
  });

  it('toggleRow changes selection', () => {

    const styler = selector.tableStyler;

    expect(styler.rowBackground(1)).toEqual('');
    expect(styler.rowBackground(3)).toEqual('');

    let selection = new CellSelection(0, 0, '0', 1, 1, '1', 'x');

    selector.toggleRow(selection);
    expect(styler.rowBackground(1)).toBe(SelectionColorCycler.MAIN_ROW_BACKGROUND);
    expect(styler.rowBackground(3)).toEqual('');

    selection = new CellSelection(5, 0, '0', 1, 1, '1', 'x');

    selector.toggleRow(selection);
    expect(styler.rowBackground(1)).toBe(SelectionColorCycler.MAIN_ROW_BACKGROUND);
    expect(styler.rowBackground(3)).toEqual('');

    selection = new CellSelection(5, 0, '0', 3, 1, '1', 'x');

    selector.toggleRow(selection);
    expect(styler.rowBackground(1)).toEqual('');
    expect(styler.rowBackground(3)).toBe(SelectionColorCycler.MAIN_ROW_BACKGROUND);

  });

  it('toggleRow updates cells styler is requested', () => {

    const styler = selector.tableStyler;

    expect(styler.cellBackground(0, 1)).toEqual('');
    expect(styler.cellBackground(1, 3)).toEqual('');

    let selection = new CellSelection(0, 0, '0', 1, 1, '1', 'x');

    selector.toggleRow(selection, true);
    expect(styler.cellBackground(0, 1)).toBe(SelectionColorCycler.MAIN_CELL_BACKGROUND);
    expect(styler.cellBackground(1, 3)).toEqual('');

    selection = new CellSelection(1, 0, '0', 3, 1, '1', 'x');

    selector.toggleRow(selection, true);
    expect(styler.cellBackground(0, 1)).toEqual('');
    expect(styler.cellBackground(1, 3)).toBe(SelectionColorCycler.MAIN_CELL_BACKGROUND);


  });

});
