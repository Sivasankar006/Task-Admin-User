import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminSettingsComponent } from './admin-settings.component';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';  
import { NgChartsModule } from 'ng2-charts';
import { FooterModule } from 'src/app/components/footer/footer.module';
import { AdminHeaderModule } from 'src/app/components/admin-header/admin-header.module';

const routes: Routes = [
  {
      path: '',
      component: AdminSettingsComponent,
      pathMatch: 'full'
  }
];

@NgModule({
  declarations: [AdminSettingsComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AdminHeaderModule,
    NgChartsModule,
    RouterModule.forChild(routes),
    FormsModule,
    FooterModule
  ]
})

export class AdminSettingsModule { }
