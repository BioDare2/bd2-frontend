import { Component } from '@angular/core';
import { FeaturedDatasetService } from './featured-dataset.service';
import { ExperimentalAssayView } from '../../dom/repo/exp/experimental-assay-view';
import { Trace } from '../../tsdata/plots/ts-plot.dom';

@Component({
  selector: 'bd2-featured-dataset',
  templateUrl: './featured-dataset.component.html',
  styleUrls: ['./featured-dataset.component.css'],
  standalone: false
})
export class FeaturedDatasetComponent {

  featuredDataset: any;
  authors: string = '';
  affiliations: string = '';
  previewTraces: Trace[] = [];

  constructor(private featuredDatasetService: FeaturedDatasetService) { }

  ngOnInit(): void {
    this.fetchFeaturedDataset();
  }

  fetchFeaturedDataset(): void {
    const p = this.featuredDatasetService.loadFeaturedExperiment();
    if (!p || typeof (p as any).then !== 'function') {
      // Defensive: mock in tests might not be prepared
      return;
    }
    p.then(resp => {
      this.featuredDataset = ExperimentalAssayView.deserialize(resp);
      this.authors = (this.featuredDataset.contributionDesc.authors || [])
        .map(a => `${a.firstName} ${a.lastName}`).join(', ');
      this.affiliations = (this.featuredDataset.contributionDesc.institutions || [])
        .map(i => i.name).join(', ');
      this.featuredDatasetService.previewTraces(this.featuredDataset.id)
        .subscribe(trs => this.previewTraces = (trs || []) as Trace[]);
    }).catch(err => {
    });
  }
}
