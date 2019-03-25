import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';

import {getStaticDocParams, StaticDocsOptions} from '../known-docs';
import {TitleSetterService} from '../../core/titlesetter.service';

@Component({
  templateUrl: './documents.component.html',
})
export class DocumentsComponent implements OnInit {

  tocON = false;

  document: string;
  missing: string;

  documentOptions: string[][] = StaticDocsOptions;

  constructor(private route: ActivatedRoute, private titleSetter: TitleSetterService) {

    console.log('DS created');
  }

  ngOnInit() {

    this.route.params.forEach((params: Params) => {

      let doc = params.doc;
      if (!doc || doc === 'all') {
        doc = 'about';
        this.tocON = true;
      }

      const docParams = getStaticDocParams(doc);

      if (docParams) {
        this.missing = undefined;
        this.document = doc;
        this.setTitle(docParams);
      } else {
        this.missing = 'Unknown document: ' + doc;
        this.document = undefined;
        this.tocON = true;

      }


    });

  }

  setTitle(docParams: string[]) {
    const title = docParams[2] ? docParams[2] : docParams[0].charAt(0).toUpperCase() + docParams[0].slice(1);
    this.titleSetter.setTitle(title);
  }
}
