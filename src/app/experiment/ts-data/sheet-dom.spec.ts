import {
  colNrToExcelLetter, CellCoordinates, CellRange, CellRangeDescription, ColumnBlocks,
  ColumnBlockEntry, CellRole, excelLettersToColNr, colNrToTopCountWellName, colNrToTopCountCoordinates
} from './sheet-dom';

describe('nrToExcel', () => {

  it('colNrToExcelLetter handles high numbers', () => {

    expect(colNrToExcelLetter(1)).toBe('A');
    expect(colNrToExcelLetter(17)).toBe('Q');
    expect(colNrToExcelLetter(26)).toBe('Z');
    expect(colNrToExcelLetter(27)).toBe('AA');
    expect(colNrToExcelLetter(53)).toBe('BA');
    expect(colNrToExcelLetter(80)).toBe('CB');
    expect(colNrToExcelLetter(702)).toBe('ZZ');
    expect(colNrToExcelLetter(703)).toBe('AAA');
    expect(colNrToExcelLetter(796)).toBe('ADP');
    expect(colNrToExcelLetter(16384)).toBe('XFD');

  });

});

describe('excelLettersToColNr', () => {

  it('excelLettersToColNr handles double letters correctly', () => {

    expect(excelLettersToColNr('A')).toBe(1);
    expect(excelLettersToColNr('Q')).toBe(17);
    expect(excelLettersToColNr('Z')).toBe(26);
    expect(excelLettersToColNr('AA')).toBe(27);
    expect(excelLettersToColNr('BA')).toBe(53);
    expect(excelLettersToColNr('CB')).toBe(80);
    expect(excelLettersToColNr('ZZ')).toBe(702);
    expect(excelLettersToColNr('AAA')).toBe(703);
    expect(excelLettersToColNr('ADP')).toBe(796);
    expect(excelLettersToColNr('XFD')).toBe(16384);
  });

});

describe('colNrToTopCountWellName', () => {

  it('converts correctly', () => {

    expect(colNrToTopCountWellName(1)).toBe('A1');
    expect(colNrToTopCountWellName(2)).toBe('A2');
    expect(colNrToTopCountWellName(12)).toBe('A12');
    expect(colNrToTopCountWellName(13)).toBe('B1');
    expect(colNrToTopCountWellName(96)).toBe('H12');
  });
});

describe('colNrToTopCountCoordinates', () => {

  it('converts to cell', () => {
    expect(colNrToTopCountCoordinates(1).col).toBe(1);
    expect(colNrToTopCountCoordinates(1).row).toBe(1);
    expect(colNrToTopCountCoordinates(2).col).toBe(2);
    expect(colNrToTopCountCoordinates(2).row).toBe(1);
    expect(colNrToTopCountCoordinates(12).col).toBe(12);
    expect(colNrToTopCountCoordinates(12).row).toBe(1);
    expect(colNrToTopCountCoordinates(13).col).toBe(1);
    expect(colNrToTopCountCoordinates(13).row).toBe(2);
    expect(colNrToTopCountCoordinates(96).col).toBe(12);
    expect(colNrToTopCountCoordinates(96).row).toBe(8);


  });
});
describe('CellCoordinates', () => {

  let coord: CellCoordinates;

  beforeEach(() => {

    coord = new CellCoordinates(2, 3);
  });

  it('nrLabel gives correct string column-row', () => {

    expect(coord.numericalLabel).toEqual('2-3');

  });

  it('toExcelLabel gives correct string LeeterRow', () => {
    expect(coord.excelLabel).toEqual('B3');
  });

  it('topCountWell gives correct well', () => {

    expect(coord.topCountWell).toBe('C2');
    coord.col = 12;
    coord.row = 8;
    expect(coord.topCountWell).toBe('H12');
  });

});

describe('CellRange', () => {

  it('constructor works', () => {

    const f = new CellCoordinates(2, 1);
    const l = new CellCoordinates(3, 2);

    const range = new CellRange(f, l);
    expect(range.first).toBe(f);
    expect(range.last).toBe(l);
  });

  it('constructor nomarlizes range', () => {

    const f = new CellCoordinates(10, 1);
    const l = new CellCoordinates(3, 2);

    const range = new CellRange(f, l);
    expect(range.first).toEqual(new CellCoordinates(3, 1));
    expect(range.last).toEqual(new CellCoordinates(10, 2));
  });

  it('correctly detects single cells', () => {

    let f = new CellCoordinates(2, 1);
    let l = new CellCoordinates(3, 2);

    let range = new CellRange(f, l);
    expect(range.isSingleCell()).toBe(false);

    f = new CellCoordinates(2, 1);
    l = new CellCoordinates(2, 1);

    range = new CellRange(f, l);
    expect(range.isSingleCell()).toBe(true);
  });

  it('excelLabel gives cell for single range', () => {

    const f = new CellCoordinates(2, 1);
    const l = new CellCoordinates(2, 1);

    const range = new CellRange(f, l);
    expect(range.fullRangeLabel).toBe('B1');

  });

  it('excelLabel gives excell range', () => {

    const f = new CellCoordinates(2, 1);
    const l = new CellCoordinates(3, 2);

    const range = new CellRange(f, l);
    expect(range.fullRangeLabel).toBe('B1-C2');

  });

  it('columnRangeLabel gives column for single range', () => {

    const f = new CellCoordinates(2, 1);
    const l = new CellCoordinates(2, 1);

    const range = new CellRange(f, l);
    expect(range.columnRangeLabel).toBe('B');

  });

  it('columnRangeLabel gives column range', () => {

    const f = new CellCoordinates(2, 1);
    const l = new CellCoordinates(3, 2);

    const range = new CellRange(f, l);
    expect(range.columnRangeLabel).toBe('B-C');

  });

  it('topCountRangeLabel gives single well for one cell', () => {

    const f = new CellCoordinates(5, 2);
    const l = new CellCoordinates(5, 2);

    const range = new CellRange(f, l);
    expect(range.topCountRangeLabel).toBe('B5');

  });

  it('topCountRangeLabel works', () => {

    const f = new CellCoordinates(2, 1);
    const l = new CellCoordinates(3, 2);

    const range = new CellRange(f, l);
    expect(range.topCountRangeLabel).toBe('A2-B3');

  });


  it('Calculetes size correctly', () => {
    let f = new CellCoordinates(2, 1);
    let l = new CellCoordinates(3, 2);

    let range = new CellRange(f, l);
    expect(range.size()).toBe(4);

    f = new CellCoordinates(1, 1);
    l = new CellCoordinates(3, 1);

    range = new CellRange(f, l);
    expect(range.size()).toBe(3);

  });
});

describe('ColumnBlockEntry', () => {

  let dsc: CellRangeDescription;
  let block: ColumnBlockEntry;

  beforeEach(() => {
    const f = new CellCoordinates(1, 1);
    const l = new CellCoordinates(2, 1);

    const range = new CellRange(f, l);
    dsc = new CellRangeDescription(range);
    dsc.role = CellRole.DATA;
    block = new ColumnBlockEntry(1, 2, dsc, 'TOC1');
  });

  it('isSimilar gives true for entries with same role and entry label', () => {
    const f = new CellCoordinates(3, 1);
    const l = new CellCoordinates(5, 1);

    const range = new CellRange(f, l);
    const dsc2 = new CellRangeDescription(range);
    dsc2.role = CellRole.DATA;
    dsc2.details = {size: 3, option: 'ala'};
    let block2 = new ColumnBlockEntry(3, 5, dsc2, 'TOC1');

    expect(block.isSimilar(block2)).toBe(true);

    dsc2.role = CellRole.IGNORED;
    block2 = new ColumnBlockEntry(3, 4, dsc2, 'TOC1');
    expect(block.isSimilar(block2)).toBe(false);

    block.details.role = CellRole.IGNORED;
    expect(block.isSimilar(block2)).toBe(true);
  });

  it('label gives column for single range', () => {

    const f = new CellCoordinates(2, 1);
    const l = new CellCoordinates(2, 1);

    const range = new CellRange(f, l);
    const dsc2 = new CellRangeDescription(range);
    const block2 = new ColumnBlockEntry(2, 2, dsc2, 'TOC1');

    expect(block2.label).toBe('B');

  });

  it('label gives column ranges', () => {

    const f = new CellCoordinates(2, 1);
    const l = new CellCoordinates(3, 1);

    const range = new CellRange(f, l);
    const dsc2 = new CellRangeDescription(range);
    const block2 = new ColumnBlockEntry(2, 3, dsc2, 'TOC1');

    expect(block2.label).toBe('B-C');

  });

  it('topcountlabel gives well for single range', () => {

    const f = new CellCoordinates(2, 1);
    const l = new CellCoordinates(2, 1);

    const range = new CellRange(f, l);
    const dsc2 = new CellRangeDescription(range);
    const block2 = new ColumnBlockEntry(f.col, l.col, dsc2, 'TOC1');

    expect(block2.topcountLabel).toBe('A2');

  });

  it('topcountlabel gives well ranges', () => {

    const f = new CellCoordinates(2, 1);
    const l = new CellCoordinates(13, 1);

    const range = new CellRange(f, l);
    const dsc2 = new CellRangeDescription(range);
    const block2 = new ColumnBlockEntry(f.col, l.col, dsc2, 'TOC1');

    expect(block2.topcountLabel).toBe('A2-B1');

  });

  it('trimEnd makes new entry with updated details', () => {

    const f = new CellCoordinates(2, 1);
    const l = new CellCoordinates(13, 1);

    const range = new CellRange(f, l);
    const dsc2 = new CellRangeDescription(range);
    dsc2.role = CellRole.DATA;
    dsc2.content = 'SOME';
    dsc2.details = 'X';
    const block2 = new ColumnBlockEntry(f.col, l.col, dsc2, 'TOC1');

    const trimmed = block2.trimEnd(4);

    expect(trimmed.start).toBe(2);
    expect(trimmed.end).toBe(3);
    expect(trimmed.value).toBe('TOC1');
    expect(trimmed.details.role).toBe(CellRole.DATA);
    expect(trimmed.details.content).toBe('SOME');
    expect(trimmed.details.details).toBe('X');
    expect(trimmed.details.firstCol).toBe(2);
    expect(trimmed.details.lastCol).toBe(3);
  });

  it('trimBegining makes new entry with updated details', () => {

    const f = new CellCoordinates(2, 1);
    const l = new CellCoordinates(13, 1);

    const range = new CellRange(f, l);
    const dsc2 = new CellRangeDescription(range);
    dsc2.role = CellRole.DATA;
    dsc2.content = 'SOME';
    dsc2.details = 'X';
    const block2 = new ColumnBlockEntry(f.col, l.col, dsc2, 'TOC1');

    const trimmed = block2.trimBegining(4);

    expect(trimmed.start).toBe(5);
    expect(trimmed.end).toBe(13);
    expect(trimmed.value).toBe('TOC1');
    expect(trimmed.details.role).toBe(CellRole.DATA);
    expect(trimmed.details.content).toBe('SOME');
    expect(trimmed.details.details).toBe('X');
    expect(trimmed.details.firstCol).toBe(5);
    expect(trimmed.details.lastCol).toBe(13);
  });

});

describe('ColumnBlocks', () => {

  let blocks: ColumnBlocks;

  beforeEach(() => {
    blocks = new ColumnBlocks();
  });


  it('details gives correct details of the column', () => {

    let f = new CellCoordinates(2, 1);
    let l = new CellCoordinates(10, 1);
    let range = new CellRange(f, l);
    const desc1 = new CellRangeDescription(range);
    desc1.details = 'A';

    f = new CellCoordinates(4, 1);
    l = new CellCoordinates(5, 1);
    range = new CellRange(f, l);
    const desc2 = new CellRangeDescription(range);
    desc2.details = 'B';

    expect(blocks.insert(desc1)).toBe(false);
    expect(blocks.insert(desc2)).toBe(true);

    let d = blocks.details(1);
    expect(d).toBeUndefined();
    d = blocks.details(2);
    expect(d.details).toBe(desc1.details);
    d = blocks.details(3);
    expect(d.details).toBe(desc1.details);
    d = blocks.details(4);
    expect(d.details).toBe(desc2.details);

  });


  it('Insert correctly appends column ranges', () => {

    let f = new CellCoordinates(2, 1);
    let l = new CellCoordinates(3, 1);
    let range = new CellRange(f, l);
    const desc1 = new CellRangeDescription(range);

    f = new CellCoordinates(4, 1);
    l = new CellCoordinates(4, 1);
    range = new CellRange(f, l);
    const desc2 = new CellRangeDescription(range);

    f = new CellCoordinates(6, 1);
    l = new CellCoordinates(8, 1);
    range = new CellRange(f, l);
    const desc3 = new CellRangeDescription(range);

    expect(blocks.insert(desc1)).toBe(false);
    expect(blocks.insert(desc2)).toBe(false);
    expect(blocks.insert(desc3)).toBe(false);

    expect(blocks.columns[2].details).toBe(desc1);
    expect(blocks.columns[3].details).toBe(desc1);
    expect(blocks.columns[4].details).toBe(desc2);
    expect(blocks.columns[5]).toBeUndefined();
    expect(blocks.columns[6].details).toBe(desc3);
    expect(blocks.columns[7].details).toBe(desc3);
    expect(blocks.columns[8].details).toBe(desc3);

  });

  it('Insert correctly overwrites column ranges', () => {

    let f = new CellCoordinates(2, 1);
    let l = new CellCoordinates(10, 1);
    let range = new CellRange(f, l);
    const desc1 = new CellRangeDescription(range);

    f = new CellCoordinates(4, 1);
    l = new CellCoordinates(5, 1);
    range = new CellRange(f, l);
    const desc2 = new CellRangeDescription(range);

    f = new CellCoordinates(11, 1);
    l = new CellCoordinates(12, 1);
    range = new CellRange(f, l);
    const desc3 = new CellRangeDescription(range);

    expect(blocks.insert(desc1)).toBe(false);
    expect(blocks.insert(desc2)).toBe(true);
    expect(blocks.insert(desc3)).toBe(false);


    expect(blocks.columns[2].end).toBe(3);
    expect(blocks.columns[3].start).toBe(2);
    expect(blocks.columns[3].end).toBe(3);
    expect(blocks.columns[4].start).toBe(4);
    expect(blocks.columns[5].end).toBe(5);
    expect(blocks.columns[6].start).toBe(6);
    expect(blocks.columns[6].end).toBe(10);
    expect(blocks.columns[7].start).toBe(6);
    expect(blocks.columns[7].end).toBe(10);
    expect(blocks.columns[10].start).toBe(6);
    expect(blocks.columns[10].end).toBe(10);

    expect(blocks.columns[2].details.details).toBe(desc1.details);
    expect(blocks.columns[3].details.details).toBe(desc1.details);
    expect(blocks.columns[4].details.details).toBe(desc2.details);
    expect(blocks.columns[5].details.details).toBe(desc2.details);
    expect(blocks.columns[6].details.details).toBe(desc1.details);
    expect(blocks.columns[7].details.details).toBe(desc1.details);
    expect(blocks.columns[10].details.details).toBe(desc1.details);
    expect(blocks.columns[11].details.details).toBe(desc3.details);
    expect(blocks.columns[12].details.details).toBe(desc3.details);


    expect(blocks.columns[2].details.firstCol).toBe(2);
    expect(blocks.columns[2].details.lastCol).toBe(3);
    expect(blocks.columns[4].details.firstCol).toBe(4);
    expect(blocks.columns[4].details.lastCol).toBe(5);
    expect(blocks.columns[6].details.firstCol).toBe(6);
    expect(blocks.columns[6].details.lastCol).toBe(10);
    expect(blocks.columns[11].details.firstCol).toBe(11);
    expect(blocks.columns[12].details.lastCol).toBe(12);




  });

  it('Insert refreshes ranges labels', () => {

    let f = new CellCoordinates(2, 1);
    let l = new CellCoordinates(10, 1);
    let range = new CellRange(f, l);
    const desc1 = new CellRangeDescription(range);

    f = new CellCoordinates(4, 1);
    l = new CellCoordinates(5, 1);
    range = new CellRange(f, l);
    const desc2 = new CellRangeDescription(range);


    expect(blocks.insert(desc1)).toBe(false);
    expect(blocks.insert(desc2)).toBe(true);

    const res = blocks.blocks;

    expect(res[0].label).toEqual('B-C');
    expect(res[1].label).toEqual('D-E');
    expect(res[2].label).toEqual('F-J');

  });

  it('blocks returns blocks in correct order without gaps', () => {

    let f = new CellCoordinates(2, 1);
    let l = new CellCoordinates(3, 1);
    let range = new CellRange(f, l);
    const desc1 = new CellRangeDescription(range);

    f = new CellCoordinates(4, 1);
    l = new CellCoordinates(4, 1);
    range = new CellRange(f, l);
    const desc2 = new CellRangeDescription(range);

    f = new CellCoordinates(6, 1);
    l = new CellCoordinates(8, 1);
    range = new CellRange(f, l);
    const desc3 = new CellRangeDescription(range);

    blocks.insert(desc3);
    blocks.insert(desc1);
    blocks.insert(desc2);

    const res = blocks.blocks;

    expect(res[0].details).toBe(desc1);
    expect(res[1].details).toBe(desc2);
    expect(res[2].details).toBe(desc3);
  });

  it('merge merges similar items', () => {

    let f = new CellCoordinates(2, 1);
    let l = new CellCoordinates(3, 1);
    let range = new CellRange(f, l);
    const desc1 = new CellRangeDescription(range);
    desc1.role = CellRole.IGNORED;

    f = new CellCoordinates(4, 1);
    l = new CellCoordinates(4, 1);
    range = new CellRange(f, l);
    const desc2 = new CellRangeDescription(range);
    desc2.role = CellRole.IGNORED;

    f = new CellCoordinates(5, 1);
    l = new CellCoordinates(5, 1);
    range = new CellRange(f, l);
    const desc3 = new CellRangeDescription(range);
    desc3.role = CellRole.DATA;
    desc3.details = {dataLable: 'cos'};

    blocks.insert(desc3);
    blocks.insert(desc1);
    blocks.insert(desc2);

    blocks.merge();

    const res = blocks.blocks;

    expect(res[0].details).toBe(desc1);
    expect(res[1].details).toBe(desc3);
  });

  it('merge refreshes labels', () => {

    let f = new CellCoordinates(2, 1);
    let l = new CellCoordinates(3, 1);
    let range = new CellRange(f, l);
    const desc1 = new CellRangeDescription(range);
    desc1.role = CellRole.IGNORED;

    f = new CellCoordinates(4, 1);
    l = new CellCoordinates(4, 1);
    range = new CellRange(f, l);
    const desc2 = new CellRangeDescription(range);
    desc2.role = CellRole.IGNORED;

    f = new CellCoordinates(5, 1);
    l = new CellCoordinates(5, 1);
    range = new CellRange(f, l);
    const desc3 = new CellRangeDescription(range);
    desc3.role = CellRole.DATA;
    desc3.details = {dataLable: 'cos'};

    blocks.insert(desc3);
    blocks.insert(desc1);
    blocks.insert(desc2);

    blocks.merge();

    const res = blocks.blocks;

    expect(res[0].label).toEqual('B-D');
    expect(res[1].label).toEqual('E');
  });

  it('deletes correctly creates gaps in the column blocks', () => {

    let f = new CellCoordinates(2, 1);
    let l = new CellCoordinates(10, 1);
    let range = new CellRange(f, l);
    const desc1 = new CellRangeDescription(range);
    desc1.role = CellRole.IGNORED;

    blocks.insert(desc1);

    f = new CellCoordinates(3, 1);
    l = new CellCoordinates(3, 1);
    range = new CellRange(f, l);
    expect(blocks.delete(range)).toBe(true);

    f = new CellCoordinates(6, 1);
    l = new CellCoordinates(7, 1);
    range = new CellRange(f, l);
    expect(blocks.delete(range)).toBe(true);

    const res = blocks.blocks;

    expect(res[0].label).toEqual('B');
    expect(res[0].details.role).toBe(desc1.role);
    expect(res[1].label).toEqual('D-E');
    expect(res[1].details.role).toBe(desc1.role);
    expect(res[2].label).toEqual('H-J');
    expect(res[2].details.role).toBe(desc1.role);
  });

  it('deletes handles outsiders', () => {

    let f = new CellCoordinates(2, 1);
    let l = new CellCoordinates(10, 1);
    let range = new CellRange(f, l);
    const desc1 = new CellRangeDescription(range);
    desc1.role = CellRole.IGNORED;

    blocks.insert(desc1);

    f = new CellCoordinates(1, 1);
    l = new CellCoordinates(1, 1);
    range = new CellRange(f, l);
    expect(blocks.delete(range)).toBe(false);

    f = new CellCoordinates(11, 1);
    l = new CellCoordinates(11, 1);
    range = new CellRange(f, l);
    expect(blocks.delete(range)).toBe(false);

    const res = blocks.blocks;

    expect(res[0].label).toEqual('B-J');
    expect(res[0].details).toBe(desc1);
  });

  it('deletes handles blocks ends', () => {

    let f = new CellCoordinates(2, 1);
    let l = new CellCoordinates(10, 1);
    let range = new CellRange(f, l);
    const desc1 = new CellRangeDescription(range);
    desc1.role = CellRole.IGNORED;

    blocks.insert(desc1);

    f = new CellCoordinates(2, 1);
    l = new CellCoordinates(2, 1);
    range = new CellRange(f, l);
    expect(blocks.delete(range)).toBe(true);

    f = new CellCoordinates(10, 1);
    l = new CellCoordinates(10, 1);
    range = new CellRange(f, l);
    expect(blocks.delete(range)).toBe(true);


    const res = blocks.blocks;

    expect(res[0].label).toEqual('C-I');
    expect(res[0].details.role).toBe(desc1.role);
    expect(res[0].details.content).toBe(desc1.content);
    expect(res[0].details.details).toBe(desc1.details);
  });


});
