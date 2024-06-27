import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { AboutComponent } from './about.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { PublicModule } from '../public/public.module';
import { MatDividerModule } from '@angular/material/divider';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule } from '@angular/forms';
import { PivotTableModule } from '../pivot-table/pivot-table.module';

const routes: Routes = [
    {
        path     : 'about',
        component: AboutComponent
    },
    {
        path: '', redirectTo: 'about', pathMatch: 'full' // default: redirect to about when public
    },
];

@NgModule({
    declarations: [
        AboutComponent
    ],
    imports     : [
      RouterModule.forChild(routes),
      MatButtonModule,
      MatIconModule,
      MatDividerModule,
      PublicModule,
      CommonModule,
      FlexLayoutModule,
      MatCardModule,
      MatFormFieldModule,
      MatSelectModule,
      MatCheckboxModule,
      FormsModule,
      PivotTableModule,
    ]
})
export class AboutModule
{
}
