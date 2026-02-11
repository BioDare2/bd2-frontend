import {Validator} from '../../../shared/common-interfaces';
import {ExperimentalAssayView} from '../../../dom/repo/exp/experimental-assay-view';

/**
 * Validator for the biological description of an experiment.
 * 
 * Ensures that required fields such as species and data category are properly set.
 */
export class SimpleBioDescValidator implements Validator<ExperimentalAssayView> {

  static INSTANCE = new SimpleBioDescValidator();

  protected constructor() {
  }


  /* Validate the ExperimentalAssayView object based on presence of species and data category fields */
  validate(obj: ExperimentalAssayView): string[] {
    const err: string[] = [];
    if (!obj) {
      return ['Cannot validate null object'];
    }
    if (!obj.species || obj.species.trim() == '') {
      err.push('Non empty species is required');
    }
    if (!obj.dataCategory || obj.dataCategory.name == 'NONE') {
      err.push('Data category is required');
    }

    return err;
  }
}
