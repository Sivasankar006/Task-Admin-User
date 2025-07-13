import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';  
import { HttpClientModule } from '@angular/common/http';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { AdminUsermanageComponent } from './admin-usermanage.component';
import { FooterModule } from 'src/app/components/footer/footer.module';
import { AdminHeaderModule } from 'src/app/components/admin-header/admin-header.module';


const routes: Routes = [
  {
      path: '',
      component: AdminUsermanageComponent,
      pathMatch: 'full'
  }
];

@NgModule({
  declarations: [AdminUsermanageComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AdminHeaderModule,
    HttpClientModule,
    CKEditorModule,
    RouterModule.forChild(routes),
    FormsModule,
    FooterModule,
  ]
})
export class AdminUsermanageModule { }
