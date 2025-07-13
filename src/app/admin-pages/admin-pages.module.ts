import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
 
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./admin-dashboard/admin-dashboard.module').then((m) => m.AdminDashboardModule)
  },
  {
    path: 'profile',
    loadChildren: () =>
      import('./admin-profile/admin-profile.module').then((m) => m.AdminProfileModule)
  },
  {
    path: 'user-management',
    loadChildren: () =>
      import('./admin-usermanage/admin-usermanage.module').then((m) => m.AdminUsermanageModule)
  },
  {
    path: 'settings',
    loadChildren: () =>
      import('./admin-settings/admin-settings.module').then((m) => m.AdminSettingsModule)
  }
];

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes) 
  ],
  exports: [RouterModule]
})
export class AdminPagesModule {}
