import {NgModule} from '@angular/core';
import {
  MatFormFieldModule,
  MatSelectModule,
  MatPaginatorModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatSortModule,
  MatTableModule,
  MatSlideToggleModule,
  MatCardModule,
  MatDividerModule,
  MatStepperModule,
  MatInputModule,
  MatButtonModule
} from '@angular/material';

@NgModule({
  imports: [
    MatFormFieldModule,
    MatSelectModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatSortModule,
    MatTableModule,
    MatSlideToggleModule,
    MatCardModule,
    MatDividerModule,
    MatStepperModule,
    MatInputModule,
    MatButtonModule
  ],
  exports: [
    MatFormFieldModule,
    MatSelectModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatSortModule,
    MatTableModule,
    MatSlideToggleModule,
    MatCardModule,
    MatDividerModule,
    MatStepperModule,
    MatInputModule,
    MatButtonModule
  ]
})
export class MaterialsModule {
}
