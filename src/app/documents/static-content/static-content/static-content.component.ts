import {Component, Input, OnInit} from '@angular/core';
import {StaticContentService} from '../static-content.service';
import {FeedbackService} from '../../../feedback/feedback.service';

@Component({
  selector: 'bd2-static-content',
  template: `
    <div [innerHTML]="content"></div>
  `
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
