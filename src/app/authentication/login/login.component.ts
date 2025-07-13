import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonserviceService } from '../../Service/CommonService/commonservice.service';
import { AuthService } from '../../Service/auth/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm: FormGroup | any;
  showPassword: boolean = false;

  constructor(private fb: FormBuilder, private auth: AuthService, private spinner: NgxSpinnerService, public service: CommonserviceService, private router: Router, private toastr: ToastrService) { }

  ngOnInit(): void {
    window.scrollTo(0, 0);

    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }
  
    const data = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password
    };
  
    this.spinner.show();
  
    let users = JSON.parse(localStorage.getItem('users') || '[]');
    const userIndex = users.findIndex(
      (user: any) => user.email === data.email && user.password === data.password
    );
  
    if (userIndex !== -1) {
      const matchedUser = users[userIndex];
  
      users[userIndex].status = true;
      localStorage.setItem('users', JSON.stringify(users));
  
      const fakeToken = Math.random().toString(36).substring(2);
  
      if (matchedUser.role === 'Admin') {
        localStorage.setItem('token', fakeToken);
        localStorage.setItem('type', 'Admin');
        localStorage.setItem('email', data.email);
        localStorage.setItem('name', matchedUser.firstName);
        this.router.navigate(['/admin/dashboard']);
        this.toastr.success(`Welcome, Admin ${matchedUser.username}!`);
      } else {
        localStorage.setItem('token', fakeToken);
        localStorage.setItem('type', 'User');
        localStorage.setItem('email', data.email);
        localStorage.setItem('name', matchedUser.firstName);
        this.router.navigate(['/user/dashboard']);
        this.toastr.success(`Welcome, User ${matchedUser.username}!`);
      }
    } else {
      this.toastr.error('Invalid email or password');
    }
  
    this.loginForm.reset();
    this.spinner.hide();
  }
  
  

  navigateToRegister(): void {
    this.router.navigate(['/register']); // Assuming you have a register route configured
  }
}