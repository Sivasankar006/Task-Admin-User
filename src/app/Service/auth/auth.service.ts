import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CommonserviceService } from '../CommonService/commonservice.service';
import { ToastrService } from 'ngx-toastr';
import { from } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private router: Router, private service: CommonserviceService, private toastr: ToastrService) { }

  sendToken(token: string): any {
    localStorage.setItem('token', token);
  }

  getToken(): any {
    return localStorage.getItem('token');
  }


  isLoggedIn(): any {
    return this.getToken() !== null && this.getToken() !== '';
  }

  email(email: string): any {
    localStorage.setItem('email', email);
  }

}
