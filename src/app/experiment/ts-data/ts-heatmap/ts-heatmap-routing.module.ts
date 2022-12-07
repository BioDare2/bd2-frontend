import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TsHeatmapViewComponent} from './ts-heatmap-view/ts-heatmap-view.component';

const routes: Routes = [
  {path: '', pathMatch: 'full', component: TsHeatmapViewComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TsHeatmapRoutingModule {
}
