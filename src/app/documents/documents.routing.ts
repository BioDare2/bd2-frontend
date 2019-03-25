import {RouterModule, Routes} from '@angular/router';
import {DocumentsComponent} from './documents/documents.component';
import {NgModule} from '@angular/core';


const routes: Routes = [
  {
    path: '', // path: 'documents',
    children: [

      {
        path: '',
        redirectTo: 'all',
        pathMatch: 'full'
      },
      {
        path: ':doc',
        component: DocumentsComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DocumentsRoutingModule {
}
