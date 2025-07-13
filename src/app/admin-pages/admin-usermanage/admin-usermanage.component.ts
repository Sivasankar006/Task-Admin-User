// Updated AdminAddbookComponent renamed to AdminUserManagementComponent
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidatorFn } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-admin-usermanage',
  templateUrl: './admin-usermanage.component.html',
  styleUrls: ['./admin-usermanage.component.scss']
})
export class AdminUsermanageComponent {

  userForm: FormGroup;
  users: any[] = [];
  selectedUserIndex: number | null = null;
  useUrl: boolean = true;
  fileError: string = '';
  title: string = 'Add User';
  isEditMode: boolean = false;
  showPassword: boolean[] = [];
  editIndex: number | null = null;
  userDetails: any = [];

  constructor(
    private fb: FormBuilder,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private router: Router
  ) {
    this.userForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.pattern('^[0-9]{10}$')]],
      profilePic: ['', [this.validUrlValidator()]],
      username: ['', Validators.required],
      password: ['', Validators.required],
      role: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(): void {
    const localUsers = localStorage.getItem('users');
    const email = localStorage.getItem('email');
    this.users = localUsers ? JSON.parse(localUsers) : [];
    this.userDetails = this.users.find((u: any) => u.email == email);
  }

  onSubmit(): void {
    if (this.userForm.invalid) {
      this.toastr.error("Please fill in the form correctly.");
      this.userForm.markAllAsTouched();
      return;
    }

    const formValue = this.userForm.value;

    if (this.editIndex !== null) {
      const existingUser = this.users[this.editIndex];

      const updatedUser = {
        ...existingUser,
        ...formValue
      };

      this.users[this.editIndex] = updatedUser;
      this.toastr.success("User updated successfully.");
    } else {
      const newUser = {
        id: Date.now(),
        ...formValue,
        date: new Date(),
        status: this.userForm.value.email == this.userDetails.email ? true : false
      };
      this.users.push(newUser);
      this.toastr.success("User added successfully.");
    }

    localStorage.setItem('users', JSON.stringify(this.users));
    this.userForm.reset();
    this.editIndex = null;
    this.isEditMode = false;
  }


  editUser(user: any, i: number): void {
    this.isEditMode = true;
    this.userForm.patchValue(user);
    this.editIndex = i;
  }

  deleteUser(index: number): void {
    const deletedUserEmail = this.users[index].email;
    const currentUserEmail = localStorage.getItem('email');
  
    this.users.splice(index, 1);
    localStorage.setItem('users', JSON.stringify(this.users));
  
    const permissions = JSON.parse(localStorage.getItem('fieldPermissions') || '{}');
    if (permissions[deletedUserEmail]) {
      delete permissions[deletedUserEmail];
      localStorage.setItem('fieldPermissions', JSON.stringify(permissions));
    }
  
    this.toastr.success("User deleted successfully.");
  
    if (this.selectedUserIndex === index) {
      this.userForm.reset();
      this.title = 'Add User';
      this.selectedUserIndex = null;
    }
  
    if (deletedUserEmail === currentUserEmail || this.users.length === 0) {
      localStorage.removeItem('token');
      localStorage.removeItem('type');
      localStorage.removeItem('email');
      localStorage.removeItem('name');
      this.toastr.info('Session ended. Please log in again.');
      this.router.navigate(['/login']);
    }
  }
  


  onFileSelected(event: any): void {
    const file = event.target.files[0];
    this.fileError = '';

    if (file) {
      if (!file.type.startsWith('image/')) {
        this.fileError = 'Only image files are allowed.';
        return;
      }

      const reader = new FileReader();
      reader.onload = () => {
        const base64String = reader.result as string;
        this.userForm.patchValue({ profilePic: base64String });
      };
      reader.readAsDataURL(file);
    }
  }

  validUrlValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const value = control.value;
      if (!value) return null;

      const urlPattern = /^(http|https):\/\/[^\"\s]+$/;
      const base64Pattern = /^data:image\/[a-z]+;base64,/;

      const isValidUrl = urlPattern.test(value);
      const isBase64 = base64Pattern.test(value);

      return isValidUrl || isBase64 ? null : { invalidUrl: { value } };
    };
  }

  get f() {
    return this.userForm.controls;
  }



  togglePassword(i: number): void {
    this.showPassword[i] = !this.showPassword[i];
  }

  cancelEdit(): void {
    this.isEditMode = false;
    this.editIndex = null;
    this.userForm.reset();
  }



}
