export class DataCategory {

  protected static valuesMap: Map<String, DataCategory>;
  protected static validOptions: DataCategory[];
  protected static values: DataCategory[] = DataCategory.initValues();

  protected constructor(public nr: number, public name: string, public shortName: string,
                        public longName: string, public disabled?: boolean) {
  }

  public static get(name: string) {
    return DataCategory.getValuesMap().get(name);
  }

  public static getValues() {
    /*if (!DataCategory.values) {
      DataCategory.values = DataCategory.initValues();
    }*/
    return DataCategory.values;
  }

  public static getValidOptions(): DataCategory[] {
    if (!DataCategory.validOptions) {
      DataCategory.validOptions = DataCategory.values.filter(dc => !(dc.disabled));
    }
    return DataCategory.validOptions;
  }

  static deserialize(val: string | number): DataCategory {

    if (val === null || val === undefined) {
      return null;
    }
    const c = DataCategory.getValuesMap().get(val as string);
    if (c) {
      return c;
    }
    let ix = +val;
    if (ix < 0 || ix >= DataCategory.getValues().length) {
      ix = 0;
    }
    return DataCategory.getValues()[ix];
  }

  protected static initValues(): DataCategory[] {

    const v: DataCategory[] = [];
    v.push(new DataCategory(0, 'NONE', 'NONE', 'None', true));
    v.push(new DataCategory(1, 'EXPR_REPORTER', 'EXPR_REP', 'Expression reporter (e.g. Luc/GFP-imaging)'));
    v.push(new DataCategory(2, 'SIGNALLING_REPORTER', 'SIG_REP', 'Signalling reporter (e.g. Aequorin)'));
    v.push(new DataCategory(3, 'DELAYED_FLUORESCENCE', 'DF', 'Delayed fluorescence'));
    v.push(new DataCategory(4, 'LEAF_MOVEMENT', 'LEAF_MV', 'Leaf movement'));
    v.push(new DataCategory(5, 'GEN_IMAGING', 'IMG', 'Other imaging'));
    v.push(new DataCategory(6, 'PROTEIN', 'PROT', 'Protein levels (e.g. Western blot)'));
    v.push(new DataCategory(7, 'TRANSCRIPT', 'RNA', 'RNA levels (e.g. qRT-PCR)'));
    v.push(new DataCategory(8, 'METABOLITE', 'MET', 'Metabolite levels (e.g. LC-MS)'));
    v.push(new DataCategory(9, 'BEHAVIOUR', 'BEHAVE', 'Behaviour (e.g. wheel running)'));
    v.push(new DataCategory(10, 'PHYSIOLOGY', 'PHYS', 'Physiology (e.g. biomass)'));
    v.push(new DataCategory(11, 'DEVELOPMENT', 'DEVEL', 'Development'));
    v.push(new DataCategory(12, 'OTHER', 'OTHER', 'OTHER'));
    v.push(new DataCategory(13, 'UNKNOWN', 'UNKNOWN', 'Unknown', true));
    v.push(new DataCategory(14, 'PCR', 'PCR', 'qRT-PCR', true));
    v.push(new DataCategory(15, 'TRANSC_FUSION', 'TSCR_FS', 'Transcriptional fusion', true));
    v.push(new DataCategory(16, 'TRANSL_FUSION', 'TSLT_FS', 'Translational fusion', true));
    return v;
  }

  protected static getValuesMap(): Map<String, DataCategory> {
    if (!DataCategory.valuesMap) {
      const map = new Map<String, DataCategory>();

      DataCategory.getValues().forEach(c => map.set(c.name, c));
      DataCategory.valuesMap = map;
    }
    return DataCategory.valuesMap;
  }

  public equals(other: DataCategory) {
    return (this.name === other.name);
  }

  toJSON(): string {
    return this.name;
  }


}
