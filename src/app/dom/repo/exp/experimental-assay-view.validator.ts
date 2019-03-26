import {Validator} from '../../../shared/common-interfaces';
import {ExperimentalAssayView} from '../../../dom/repo/exp/experimental-assay-view';
import {GeneralDescValidator} from '../shared/general-desc.validator';
import {ContributionDescValidator} from '../contribution/contribution-desc.validator';
import {SimpleBioDescValidator} from '../biodesc/simple-bio-desc.validator';

export class ExperimentalAssayViewValidator implements Validator<ExperimentalAssayView> {

  static INSTANCE = new ExperimentalAssayViewValidator();
  generalV = GeneralDescValidator.INSTANCE;
  contribV = ContributionDescValidator.INSTANCE;
  bioV = SimpleBioDescValidator.INSTANCE;

  protected constructor() {
  }

  validate(obj: ExperimentalAssayView): string[] {
    let err: string[] = [];

    err = err.concat(this.generalV.validate(obj.generalDesc),
      this.contribV.validate(obj.contributionDesc),
      this.bioV.validate(obj));


    return err;
  }
}
