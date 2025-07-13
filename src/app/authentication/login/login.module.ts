import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';  
import { HeaderModule } from '../../components/header/header.module';
import { FooterModule } from '../../components/footer/footer.module';

import { HttpClientModule } from '@angular/common/http';

const routes: Routes = [
  {
      path: '',
      component: LoginComponent,
      pathMatch: 'full'
  }
];

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HeaderModule,
    FooterModule,
    HttpClientModule,
    RouterModule.forChild(routes),
    FormsModule,
  ]
})

export class LoginModule { }
