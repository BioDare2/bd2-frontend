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
  MatButtonModule,
  MatButtonToggleModule,
  MatGridListModule
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
    MatButtonModule,
    MatButtonToggleModule,
    MatGridListModule
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
    MatButtonModule,
    MatButtonToggleModule,
    MatGridListModule
  ]
})
export class MaterialsModule {
}
