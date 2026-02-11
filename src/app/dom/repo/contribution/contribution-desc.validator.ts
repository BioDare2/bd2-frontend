import {Validator} from '../../../shared/common-interfaces';
import {ContributionDesc} from './contribution-desc';

/**
 * Validator for ContributionDesc objects.
 * 
 * Ensures that the description has at least one author.
 */
export class ContributionDescValidator implements Validator<ContributionDesc> {

  static INSTANCE = new ContributionDescValidator();

  validate(obj: ContributionDesc): string[] {
    if (!obj) {
      return ['Contribution cannot be empty'];
    }

    if (obj.authors.length < 1) {
      return ['At least one author is required'];
    }
    return [];
  }

  protected ContributionDescValidator() {
  }
}
