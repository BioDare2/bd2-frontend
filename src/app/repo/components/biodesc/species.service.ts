import {Injectable} from '@angular/core';
import {BioDareRestService} from '../../../backend/biodare-rest.service';
import {catchError, tap, timeout} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {of} from 'rxjs/internal/observable/of';

@Injectable({
  providedIn: 'root'
})
export class SpeciesService {


  private popularSpecies: string[] = [
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
    'Oryza sativa',
    'Ostreococcus tauri',
    'Phaeodactylum tricornutum',
    'Physcometrella patens',
    'Picea abies',
    'Rattus norvegicus',
    'Saccharomyces cerevisiae',
    'Synechococcus elongatus',
    'Synthetic data'
  ];

  private fetchedSpecies: string[] = undefined;

  constructor(private BD2REST: BioDareRestService) {

    console.log('Species Service');
    // this.refreshSpecies();
  }


  species(): Promise<string[]> {

    if (this.fetchedSpecies) { return Promise.resolve(this.fetchedSpecies); }


    return this.fetchSpecies().toPromise();
  }

  fetchSpecies(): Observable<string[]> {

    return this.BD2REST.species().pipe(
      timeout(5000),
      tap( spec => {
        if (spec && spec.length > 0) {
          this.fetchedSpecies = spec;
        } else {
          throw new Error('Retrieved empty species falls back to default');
        }
      }),
      catchError( err => {
        console.log(' Could not fetch species', err);
        return of(this.popularSpecies);
      })
    );
  }

}
