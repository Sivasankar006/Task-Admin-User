import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent {
  userDetails: any;
  editForm!: FormGroup;
  isEditMode: boolean = false;
  showPassword: boolean = false;
  fieldPermissions: any = {};

  constructor(private fb: FormBuilder, private toastr: ToastrService) { }

  ngOnInit(): void {
    window.scrollTo(0, 0);
    this.loadUserDetails();
  }

  loadUserDetails() {
    const email: any = localStorage.getItem('email');
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    this.userDetails = users.find((u: any) => u.email === email);

    const storedPermissions = JSON.parse(localStorage.getItem('fieldPermissions') || '{}');
    this.fieldPermissions = storedPermissions[this.userDetails.email] || {};
    this.editForm = this.fb.group({
      username: [{ value: this.userDetails.username, disabled: !this.fieldPermissions.username }, Validators.required],
      firstName: [{ value: this.userDetails.firstName, disabled: !this.fieldPermissions.firstName }, Validators.required],
      lastName: [{ value: this.userDetails.lastName, disabled: !this.fieldPermissions.lastName }, Validators.required],
      email: [{ value: this.userDetails.email, disabled: !this.fieldPermissions.email }, [Validators.required, Validators.email]],
      phone: [{ value: this.userDetails.phone, disabled: !this.fieldPermissions.phone }, [Validators.pattern(/^[0-9]{10}$/)]],
      profilePic: [{ value: this.userDetails.profilePic, disabled: !this.fieldPermissions.profilePic }],
      password: [{ value: this.userDetails.password, disabled: !this.fieldPermissions.password }, [Validators.minLength(6)]],
    });
  }

  enableEdit() {
    const email = localStorage.getItem('email');
    const permissions = JSON.parse(localStorage.getItem('fieldPermissions') || '{}');

    if (email && permissions[email]) {
      const hasAccess = Object.values(permissions[email]).some(value => value === true);

      if (hasAccess) {
        this.isEditMode = true;
      } else {
        this.toastr.error("You don't have permission to edit this form.");
      }
    } else {
      this.toastr.error("Permission not found for your account.");
    }
  }


  cancelEdit() {
    this.isEditMode = false;
    this.editForm.reset(this.userDetails);
  }

  submitEdit() {
    if (this.editForm.invalid) {
      this.toastr.error('Please correct the form errors');
      return;
    }

    const updatedData = {
      ...this.userDetails,
      ...this.editForm.getRawValue() 
    };

    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const index = users.findIndex((u: any) => u.email === this.userDetails.email);
    if (index !== -1) {
      users[index] = updatedData;
      localStorage.setItem('users', JSON.stringify(users));
      this.toastr.success('Profile updated successfully');
    }

    this.isEditMode = false;
    this.loadUserDetails();
  }
  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const base64String = reader.result as string;
        this.editForm.patchValue({ profilePic: base64String });
      };
      reader.readAsDataURL(file);
    }
  }

}
