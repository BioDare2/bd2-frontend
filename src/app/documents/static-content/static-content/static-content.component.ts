import {Component, Input, OnInit, ChangeDetectionStrategy} from '@angular/core';
import {StaticContentService} from '../static-content.service';
import {FeedbackService} from '../../../feedback/feedback.service';

/**
 * Component for displaying static HTML content.
 */
@Component({
    selector: 'bd2-static-content',
    template: `<div [innerHTML]="content"></div>`,
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class StaticContentComponent implements OnInit {

  content = 'loading...';

  constructor(private contentService: StaticContentService, private feedback: FeedbackService) {
  }

  @Input()
  set docName(name: string) {

    if (!name) {
      return;
    }

    this.content = '';
    this.contentService.getDocs(name)
      .then(txt => this.content = txt)
      .catch(err => {
        this.content = 'Cannot load: ' + err;
        this.feedback.error(err);
      });

  }

  ngOnInit() {

  }

}
