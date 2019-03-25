export const StaticDocsOptions = [

  ['about', 'About', 'Documentation'],
  ['service', 'Service Description (T&C)', 'Service Description (T&C)'],
  ['privacy', 'Privacy Statement', 'Privacy Statement'],
  ['faq', 'Frequently Asked Questions (FAQ)', 'FAQ'],
  ['timeseries-data', 'TimeSeries data and formats', 'Timeseries data'],
  ['period-methods', 'Methods of period analysis', 'Period analysis methods'],
  ['detrending', 'Detrending for period analysis', 'Detrending and analysis'],
  ['phases', 'Phase calculation', 'Phase calculation'],
];

export function isKnownStaticDoc(name: string) {

  return (StaticDocsOptions.findIndex(op => op[0] === name) >= 0);
}

export function getStaticDocParams(name: string): string[] {

  return (StaticDocsOptions.find(op => op[0] === name));
}

