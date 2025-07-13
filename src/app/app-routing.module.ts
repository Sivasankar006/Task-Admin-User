import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth-gard.service';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./user-pages/user-dashboard/user-dashboard.module').then(m => m.UserDashboardModule),
  },
  {
    path: 'register',
    loadChildren: () => import('./authentication/register/register.module').then(m => m.RegisterModule),
  },
  {
    path: 'login',
    loadChildren: () => import('./authentication/login/login.module').then(m => m.LoginModule),
  },
  {
    path: 'admin',
    loadChildren: () => import('./admin-pages/admin-pages.module').then(m => m.AdminPagesModule),
    canActivate: [AuthGuard],
    data: { roles: ['Admin'] }
  },

  {
    path: 'user',
    loadChildren: () => import('../app/user-pages/user-pages.module').then(m => m.UserPagesModule),
    canActivate: [AuthGuard],
    data: { roles: ['User'] }
  },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
