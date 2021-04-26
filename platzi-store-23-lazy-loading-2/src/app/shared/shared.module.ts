import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExponentialPipe } from './pipes/exponential/exponential.pipe';
import { HighlightDirective } from './directives/highlight/highlight.directive';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { GroupByPipe } from './pipes/groupBy/group-by.pipe';

@NgModule({
  declarations: [
    ExponentialPipe,
    FooterComponent,
    HeaderComponent,
    HighlightDirective,
    GroupByPipe,
  ],
  exports: [
    ExponentialPipe,
    FooterComponent,
    HeaderComponent,
    HighlightDirective,
    GroupByPipe,
  ],
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule,
    ReactiveFormsModule
  ]
})
export class SharedModule { }
