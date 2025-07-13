import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { SettingsService } from 'src/app/Service/settings/settings.service';

@Component({
  selector: 'app-admin-settings',
  templateUrl: './admin-settings.component.html',
  styleUrls: ['./admin-settings.component.scss']
})
export class AdminSettingsComponent {
  userdetails: any[] = [];
  selectedEmail: string | null = null;
  selectedUser: any = null;
  selectedForm!: FormGroup;

  fieldList = ['firstName', 'lastName', 'email', 'phone', 'profilePic', 'username', 'password'];

  constructor(private fb: FormBuilder, private toastr: ToastrService, private settingsService: SettingsService) {}

  ngOnInit(): void {
    window.scrollTo(0, 0);
    this.getuserdetails();
  }

  getuserdetails(): void {
    const users = JSON.parse(localStorage.getItem('users') || '[]').filter((u: any) => u.role === 'User');
    this.userdetails = users;
  }

  usersetting(user: any): void {
    this.selectedEmail = user.email;
    this.selectedUser = user;

    const formGroup = this.fieldList.reduce((acc, field) => {
      acc[field] = [this.settingsService.getFieldPermission(user.email, field)];
      return acc;
    }, {} as any);

    this.selectedForm = this.fb.group(formGroup);
  }

  clearSelection(): void {
    this.selectedEmail = null;
    this.selectedUser = null;
    this.selectedForm.reset();
  }

  submitSelectedUser(): void {
    const updatedPermissions = this.selectedForm.value;
    for (const fieldName in updatedPermissions) {
      this.settingsService.setFieldPermission(this.selectedEmail!, fieldName, updatedPermissions[fieldName]);
    }
    this.toastr.success('Permissions updated!');
    this.clearSelection();
  }
}
