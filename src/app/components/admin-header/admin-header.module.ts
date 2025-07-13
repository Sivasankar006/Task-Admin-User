import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AdminHeaderComponent } from './admin-header.component';


@NgModule({
  declarations: [AdminHeaderComponent],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
  ],
  exports: [AdminHeaderComponent]
})

export class AdminHeaderModule { }
