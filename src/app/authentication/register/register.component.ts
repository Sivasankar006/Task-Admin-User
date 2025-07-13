import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registrationForm!: FormGroup;
  showPassword: boolean = false;
  showConfirmPassword: boolean = false;
  useUrl: boolean = true;
  fileError: string = '';

  constructor(
    private fb: FormBuilder,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    window.scrollTo(0, 0);
    this.createForm();
  }

  createForm() {
    this.registrationForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      profilePic: ['', Validators.required],
      username: ['', [Validators.required, Validators.minLength(4)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]],
      role: ['User', Validators.required],
    }, { validator: this.passwordMatchValidator });
  }

  passwordMatchValidator(form: FormGroup) {
    return form.get('password')?.value === form.get('confirmPassword')?.value
      ? null : { mismatch: true };
  }

  onSubmit(): void {
    if (this.registrationForm.invalid) {
      this.registrationForm.markAllAsTouched();
      this.toastr.error('Please file the form fields');
      return;
    }

    this.spinner.show();

    const formData = this.registrationForm.value;
    const data = {
      id: Date.now(),
      ...formData,
      date: new Date(),
      status: false
    };

    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const emailExists = users.some((user: any) => user.email === data.email);

    if (emailExists) {
      this.toastr.error('Email already exists');
      this.spinner.hide();
      return;
    }

    users.push(data);
    localStorage.setItem('users', JSON.stringify(users));

    this.toastr.success('Registration successful');
    this.registrationForm.reset();
    this.router.navigate(['/login']);
    this.spinner.hide();
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    this.fileError = '';
  
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = () => {
        const base64String = reader.result as string;
        this.registrationForm.patchValue({
          profilePic: base64String
        });
        this.registrationForm.get('profilePic')?.markAsTouched();
      };
      reader.readAsDataURL(file);
    } else {
      this.fileError = 'Only image files are allowed.';
    }
  }
  
}
