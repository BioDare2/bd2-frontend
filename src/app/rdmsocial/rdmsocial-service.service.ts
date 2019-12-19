import {Injectable} from '@angular/core';
import {RDMAssayGUIAspects} from './rdmsocial.dom';
import {BioDareRestService} from '../backend/biodare-rest.service';
import {ExperimentalAssayView} from '../dom/repo/exp/experimental-assay-view';

@Injectable({
  providedIn: 'root'
})
export class RDMSocialServiceService {

  visited: Set<number> = new Set<number>();

  constructor(private BD2REST: BioDareRestService) {

    console.log('RDMSocialServiceService created');
  }


  public getAssayGuiAspects(exp: ExperimentalAssayView): Promise<RDMAssayGUIAspects> {

    return this.BD2REST.rdmAssayGuiAspects(exp.id)
      .then(aspects => {
        this.visited.add(exp.id);
        return aspects;
      });
  }

  public shouldShowMeasurementWarning(exp: ExperimentalAssayView): Promise<boolean> {

    // if (2>0) return Promise.resolve(false);

    if (!exp.security.isOwner) {
      return Promise.resolve(false);
    }

    if (this.visited.has(exp.id)) {
      return Promise.resolve(false);
    }

    return this.getAssayGuiAspects(exp)
      .then(aspects => aspects.showMeasurementWarning);
  }

  public registerNewAssay(exp: ExperimentalAssayView) {
    this.visited.add(exp.id);
  }

  public registerMeasurementWarning(exp: ExperimentalAssayView) {

    this.BD2REST.rdmRegisterWarning(exp.id, 'MEASUREMENT')
      .then(resp => true);
  }

  public canProceedByMeasurement(exp: ExperimentalAssayView): Promise<boolean> {

    // if (2>0) return Promise.resolve(true);

    if (!exp.security.isOwner) {
      return Promise.resolve(true);
    }

    return this.getAssayGuiAspects(exp)
      .then(aspects => aspects.canProceedByMeasurement);
  }

}
