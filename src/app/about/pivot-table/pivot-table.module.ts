import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatDividerModule } from '@angular/material/divider';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule } from '@angular/forms';
import { PivotTableComponent } from './pivot-table.component';

@NgModule({
    declarations: [
        PivotTableComponent
    ],
    imports     : [
      MatButtonModule,
      MatIconModule,
      MatDividerModule,
      CommonModule,
      FlexLayoutModule,
      MatCardModule,
      MatFormFieldModule,
      MatSelectModule,
      MatCheckboxModule,
      FormsModule,
  ],
  exports: [PivotTableComponent]
})
export class PivotTableModule
{
}
