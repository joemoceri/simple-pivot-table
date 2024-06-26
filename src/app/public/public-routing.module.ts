import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { AboutModule } from '../about/about.module';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  imports: [
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    RouterModule,
    AboutModule,
    FlexLayoutModule
  ]
})
export class PublicRoutingModule
{
}
