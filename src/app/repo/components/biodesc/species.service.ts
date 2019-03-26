import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SpeciesService {


  private knownSpecies = [
    'Arabidopsis thaliana',
    'Brassica rapa',
    'Danio rerio',
    'Drosophila melanogaster',
    'Glycine max',
    'Homo sapiens',
    'Lemna gibba',
    'Lemna minor',
    'Marchantia polymorpha',
    'Medicago truncatula',
    'Mus musculus',
    'Nannochloropsis',
    'Neurospora crassa',
    'Ostreococcus tauri',
    'Phaeodactylum tricornutum',
    'Physcometrella patens',
    'Picea abies',
    'Rattus norvegicus',
    'Saccharomyces cerevisiae',
    'Synechococcus elongatus',
    'Synthetic data'
  ];

  species(): Promise<string[]> {
    return Promise.resolve(this.knownSpecies.slice());
  }
}
