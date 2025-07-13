import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { UserDashboardComponent } from './user-dashboard.component';
import { FooterModule } from 'src/app/components/footer/footer.module';
import { HeaderModule } from 'src/app/components/header/header.module';

const routes: Routes = [
  {
      path: '',
      component: UserDashboardComponent,
      pathMatch: 'full'
  }
];

@NgModule({
  declarations: [UserDashboardComponent],
  imports: [
    CommonModule,
    HeaderModule,
    FooterModule,
    RouterModule.forChild(routes),
    FormsModule,
  ]
})

export class UserDashboardModule { }
