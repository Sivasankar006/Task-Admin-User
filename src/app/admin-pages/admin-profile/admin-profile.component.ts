import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-admin-profile',
  templateUrl: './admin-profile.component.html',
  styleUrls: ['./admin-profile.component.scss']
})
export class AdminProfileComponent {
  userDetails: any = [];
  editForm!: FormGroup;
  isEditMode: boolean = false;
  showPassword: boolean = false;

  constructor(private fb: FormBuilder, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.loadUserDetails();
  }

  loadUserDetails() {
    const email = localStorage.getItem('email');
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    this.userDetails = users.find((u: any) => u.email == email);

    this.editForm = this.fb.group({
      username: [this.userDetails.username, Validators.required],
      firstName: [this.userDetails.firstName, Validators.required],
      lastName: [this.userDetails.lastName, Validators.required],
      email: [{ value: this.userDetails.email, disabled: true }, [Validators.required, Validators.email]],
      phone: [this.userDetails.phone, [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      profilePic: [this.userDetails.profilePic], 
      password: [this.userDetails.password, [Validators.required, Validators.minLength(6)]] 
    });


  }

  enableEdit() {
    this.isEditMode = true;
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
  
    const updatedData = this.editForm.value;
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const email = this.userDetails.email;
  
    const index = users.findIndex((u: any) => u.email === email);
    if (index !== -1) {
      users[index] = { ...users[index], ...updatedData, email };
      localStorage.setItem('users', JSON.stringify(users));
      this.toastr.success('Profile updated successfully');
      this.isEditMode = false;
      this.loadUserDetails();
    } else {
      this.toastr.error('User not found for update.');
    }
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
