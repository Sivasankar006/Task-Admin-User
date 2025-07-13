import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserProfileComponent } from './user-profile.component';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms'; 
import { FooterModule } from '../../components/footer/footer.module';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { HeaderModule } from 'src/app/components/header/header.module';


const routes: Routes = [
  {
      path: '',
      component: UserProfileComponent,
      pathMatch: 'full'
  }
];

@NgModule({
  declarations: [UserProfileComponent],
  imports: [
    CommonModule,
    HeaderModule,
    ReactiveFormsModule,
    FooterModule,
    RouterModule.forChild(routes),
    FormsModule,
    CKEditorModule
  ]
})

export class UserProfileModule { }
