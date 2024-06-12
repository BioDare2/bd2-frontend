import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {StaticContentComponent} from './static-content/static-content.component';
import {StaticContentDialogComponent} from './static-content-dialog/static-content-dialog.component';
import {MatLegacyDialogModule as MatDialogModule} from '@angular/material/legacy-dialog';

@NgModule({
    imports: [
        CommonModule,
        MatDialogModule
    ],
    declarations: [StaticContentComponent, StaticContentDialogComponent],
    exports: [StaticContentComponent]
})
export class StaticContentModule {
}
