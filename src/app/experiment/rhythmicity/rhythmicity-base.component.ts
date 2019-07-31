import {ExperimentBaseComponent} from '../experiment-base.component';
import {ExperimentComponentsDependencies} from '../experiment-components.dependencies';
import {RhythmicityService} from './rhythmicity.service';


export class RhythmicityBaseComponent extends ExperimentBaseComponent {

  constructor(
    protected rhythmicityService: RhythmicityService,
    serviceDependencies: ExperimentComponentsDependencies) {
    super(serviceDependencies);

    this.titlePart = ' Rhythm';

  }

  goToRhythmicityHome(id?: number) {
    const nav = this.expHomePath(id);
    nav.push('rhythmicity');
    this.router.navigate(nav);
  }
}
