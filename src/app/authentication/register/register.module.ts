import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './register.component';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';  
import { HeaderModule } from '../../components/header/header.module';
import { HttpClientModule } from '@angular/common/http';
import { FooterModule } from 'src/app/components/footer/footer.module';

const routes: Routes = [
  {
      path: '',
      component: RegisterComponent,
      pathMatch: 'full'
  }
];

@NgModule({
  declarations: [RegisterComponent],
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

export class RegisterModule { }
