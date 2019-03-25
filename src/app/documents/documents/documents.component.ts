import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import {getStaticDocParams, StaticDocsOptions} from '../known-docs';
import {TitleSetterService} from '../../core/titlesetter.service';
import {Subscription} from 'rxjs';
import {map} from 'rxjs/operators';

@Component({
  templateUrl: './documents.component.html',
})
export class DocumentsComponent implements OnInit, OnDestroy {

  tocON = false;

  document: string;
  missing: string;

  documentOptions: string[][] = StaticDocsOptions;
  docSubsrciption: Subscription;

  constructor(private route: ActivatedRoute, private titleSetter: TitleSetterService) {

    console.log('DS created');
  }

  ngOnDestroy(): void {
    if (this.docSubsrciption) {
      this.docSubsrciption.unsubscribe();
    }
  }

  ngOnInit() {

    this.docSubsrciption =
      this.route.paramMap.pipe(
        map(params => {
          let doc = params.get('doc');
          if (!doc || doc === 'all') {
            doc = 'about';
          }
          return doc;
        })
      ).subscribe(doc => {
        const docParams = getStaticDocParams(doc);

        if (doc === 'about') {
          this.tocON = true;
        }

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
