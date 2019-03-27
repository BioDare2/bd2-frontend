import {ExperimentBaseComponent} from '../experiment-base.component';
import {ExperimentComponentsDependencies} from '../experiment-components.dependencies';
import {PPAService} from './ppa.service';


export class PPABaseComponent extends ExperimentBaseComponent {

  constructor(
    protected ppaService: PPAService,
    serviceDependencies: ExperimentComponentsDependencies) {
    super(serviceDependencies);

    this.titlePart = ' PPA';

  }

  goToPPAHome(id?: number) {
    const nav = this.expHomePath(id);
    nav.push('ppa');
    this.router.navigate(nav);
  }
}
