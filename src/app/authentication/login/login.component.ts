import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonserviceService } from '../../Service/CommonService/commonservice.service';
import { AuthService } from '../../Service/auth/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from "ngx-spinner";
import { Location } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  showPassword = false;

  captchaQuestion = '';
  correctCaptcha = 0;
  captchaError = '';

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private spinner: NgxSpinnerService,
    public service: CommonserviceService,
    private router: Router, private location: Location,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    window.scrollTo(0, 0);
    this.generateCaptcha();

    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      captchaAnswer: ['', Validators.required]
    });
    this.autoredirect();
  }

  autoredirect() {
    const role = localStorage.getItem('type');
    const token = localStorage.getItem('token');
    const currentPath = this.location.path();
    if ((currentPath == '' || currentPath == '/login') && role === 'Admin') {
      this.router.navigate(['/admin/dashboard']);
    } else if ((currentPath == '' || currentPath == '/login') && role === 'User') {
      this.router.navigate(['/user/dashboard']);
    } else if (!token) {
      this.router.navigate(['/login']);
    }
  }
  
  generateCaptcha(): void {
    const num1 = Math.floor(Math.random() * 10) + 1;
    const num2 = Math.floor(Math.random() * 10) + 1;
    this.correctCaptcha = num1 + num2;
    this.captchaQuestion = `What is ${num1} + ${num2}?`;
  }

  onSubmit(): void {
    this.spinner.show();

    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      this.toastr.error('Please file the form fields');
      this.spinner.hide();
      return;
    }

    const enteredCaptcha = parseInt(this.loginForm.value.captchaAnswer, 10);
    if (enteredCaptcha !== this.correctCaptcha) {
      this.captchaError = 'Incorrect answer. Please try again.';
      this.generateCaptcha();
      this.loginForm.patchValue({ captchaAnswer: '' });
      this.spinner.hide();
      return;
    } else {
      this.captchaError = '';
    }

    const data = this.loginForm.value;
    let users = JSON.parse(localStorage.getItem('users') || '[]');
    const userIndex = users.findIndex(
      (user: any) => user.email === data.email && user.password === data.password
    );

    if (userIndex !== -1) {
      const matchedUser = users[userIndex];
      users[userIndex].status = true;
      localStorage.setItem('users', JSON.stringify(users));

      const fakeToken = Math.random().toString(36).substring(2);
      localStorage.setItem('token', fakeToken);
      localStorage.setItem('type', matchedUser.role);
      localStorage.setItem('email', data.email);
      localStorage.setItem('name', matchedUser.firstName);

      const route = matchedUser.role === 'Admin' ? '/admin/dashboard' : '/user/dashboard';
      this.router.navigate([route]);
      this.toastr.success(`Welcome, ${matchedUser.role} ${matchedUser.username}!`);
    } else {
      this.toastr.error('Invalid email or password');
    }

    this.loginForm.reset();
    this.generateCaptcha();
    this.spinner.hide();
  }

  navigateToRegister(): void {
    this.router.navigate(['/register']);
  }
}
