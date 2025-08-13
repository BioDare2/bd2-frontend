import { Injectable } from '@angular/core';
import { Observable, firstValueFrom } from 'rxjs';
import { BioDareRestService } from 'src/app/backend/biodare-rest.service';
import { DetrendingType, TSSort } from 'src/app/tsdata/ts-data-dom';
import { PageEvent } from '@angular/material/paginator';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FeaturedDatasetService {

  constructor(private BD2REST: BioDareRestService) {
  }

  featuredId(): Promise<number | null> {
    return firstValueFrom(this.BD2REST.getFeaturedDataset());
  }

  loadFeaturedExperiment(): Promise<any> {
    return this.featuredId()
      .then(id => {
        if (id == null) throw new Error('No featured dataset id');
        return this.BD2REST.experiment(id);
      });
  }

  experiment(id: number): any {
    return this.BD2REST.experiment(id);
  }

  previewTraces(expId: number): Observable<any[]> {
    const page: PageEvent = { pageIndex: 0, pageSize: 5, length: 0 };
    const sort = {} as TSSort;
    return this.BD2REST.tsdata(expId, DetrendingType.LIN_DTR, page, sort).pipe(
      map((resp: any) => Array.isArray(resp.traces) ? resp.traces : [])
    );
  }

}
