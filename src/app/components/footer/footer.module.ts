import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [FooterComponent],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
  ],
  exports: [FooterComponent]
})

export class FooterModule { }
