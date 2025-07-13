import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';  
import { NgChartsModule } from 'ng2-charts';
import { FooterModule } from 'src/app/components/footer/footer.module';
import { AdminDashboardComponent } from './admin-dashboard.component';
import { AdminHeaderModule } from 'src/app/components/admin-header/admin-header.module';

const routes: Routes = [
  {
      path: '',
      component: AdminDashboardComponent,
      pathMatch: 'full'
  }
];

@NgModule({
  declarations: [AdminDashboardComponent],
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
export class AdminDashboardModule { }
