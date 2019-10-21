import {LabelsToColors, SelectionColorCycler, TableSelector, TableStyler} from './table-styling';
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

    selection = new CellSelection(5, 5, '0', 1, 1, '1', 'x');

    selector.toggleRow(selection);
    expect(styler.rowBackground(1)).toBe(SelectionColorCycler.MAIN_ROW_BACKGROUND);
    expect(styler.rowBackground(3)).toEqual('');

    selection = new CellSelection(5, 5, '0', 3, 3, '1', 'x');

    selector.toggleRow(selection);
    expect(styler.rowBackground(1)).toEqual('');
    expect(styler.rowBackground(3)).toBe(SelectionColorCycler.MAIN_ROW_BACKGROUND);

  });

  it('toggleRow updates cell styles if  requested', () => {

    const styler = selector.tableStyler;

    expect(styler.cellBackground(0, 1)).toEqual('');
    expect(styler.cellBackground(1, 3)).toEqual('');

    let selection = new CellSelection(0, 0, '0', 1, 1, '1', 'x');

    selector.toggleRow(selection, true);
    expect(styler.cellBackground(0, 1)).toBe(SelectionColorCycler.MAIN_CELL_BACKGROUND);
    expect(styler.cellBackground(1, 3)).toEqual('');

    selection = new CellSelection(1, 1, '0', 3, 3, '1', 'x');

    selector.toggleRow(selection, true);
    expect(styler.cellBackground(0, 1)).toEqual('');
    expect(styler.cellBackground(1, 3)).toBe(SelectionColorCycler.MAIN_CELL_BACKGROUND);


  });

  it('toggleRow is real rows number based', () => {

    const styler = selector.tableStyler;

    expect(styler.cellBackground(10, 10)).toEqual('');
    expect(styler.cellBackground(10, 13)).toEqual('');

    let selection = new CellSelection(0, 10, '10', 0, 10, '10', 'x');

    selector.toggleRow(selection, true);
    expect(styler.cellBackground(10, 10)).toBe(SelectionColorCycler.MAIN_CELL_BACKGROUND);
    expect(styler.cellBackground(10, 13)).toEqual('');
    expect(styler.cellBackground(0, 0)).toEqual('');

    selection = new CellSelection(0, 10, '10', 3, 13, '13', 'x');

    selector.toggleRow(selection, true);
    expect(styler.cellBackground(10, 10)).toEqual('');
    expect(styler.cellBackground(0, 3)).toEqual('');
    expect(styler.cellBackground(10, 13)).toBe(SelectionColorCycler.MAIN_CELL_BACKGROUND);
    // expect(styler.cellBackground(11, 13)).toBe(SelectionColorCycler.MAIN_ROW_BACKGROUND);

  });

  it('toggleCol is real rows number based', () => {

    const styler = selector.tableStyler;

    expect(styler.cellBackground(10, 10)).toEqual('');
    expect(styler.cellBackground(10, 13)).toEqual('');
    expect(styler.cellBackground(11, 13)).toEqual('');

    let selection = new CellSelection(0, 10, '10', 0, 10, '10', 'x');

    selector.toggleCol(selection, true);
    expect(styler.cellBackground(10, 10)).toBe(SelectionColorCycler.MAIN_CELL_BACKGROUND);
    expect(styler.cellBackground(10, 13)).toEqual(SelectionColorCycler.MAIN_COL_BACKGROUND);
    expect(styler.cellBackground(0, 0)).toEqual('');
    expect(styler.cellBackground(11, 13)).toEqual('');

    selection = new CellSelection(0, 11, '11', 3, 13, '13', 'x');

    selector.toggleCol(selection, true);
    expect(styler.cellBackground(10, 10)).toEqual('');
    expect(styler.cellBackground(10, 13)).toEqual('');
    expect(styler.cellBackground(0, 3)).toEqual('');
    expect(styler.cellBackground(11, 13)).toBe(SelectionColorCycler.MAIN_CELL_BACKGROUND);
    expect(styler.cellBackground(11, 12)).toBe(SelectionColorCycler.MAIN_COL_BACKGROUND);
    // expect(styler.cellBackground(11, 13)).toBe(SelectionColorCycler.MAIN_ROW_BACKGROUND);

  });

});

describe( 'LabelsToColors', () => {

  let collorer: LabelsToColors;

  beforeEach( () => {

    collorer = new LabelsToColors();
  });

  it('assignes consistent colors', () => {

    const cA = collorer.toColor('A');
    const cB = collorer.toColor('B');
    const cC = collorer.toColor('C');
    const cA2 = collorer.toColor('A');

    expect(cA).toBeTruthy();
    expect(cA).toBe(cA2);
    expect(cA).not.toEqual(cB);
    expect(cA).not.toEqual(cC);
    expect(cC).not.toEqual(cB);

    expect(collorer.toColor('')).toBeUndefined();
  });

  it('gives undefined for empty string', () => {

    expect(collorer.toColor('')).toBeUndefined();
    expect(collorer.toColor(null)).toBeUndefined();
    expect(collorer.toColor(undefined)).toBeUndefined();
  });

});
