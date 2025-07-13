import { Component } from '@angular/core';
import { NgxSpinnerService } from "ngx-spinner";
import { Router, RouterStateSnapshot } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.scss']
})
export class UserDashboardComponent {

  username: string = '';
  role: string = '';
  currentUrl: any;

  constructor(private spinner: NgxSpinnerService, private router: Router, private location: Location) { }

  ngOnInit() {
    window.scrollTo(0, 0);
    this.getActiveUserDetails();
  }

  getActiveUserDetails() {
    this.spinner.show();

    const email = localStorage.getItem('email');
    const role = localStorage.getItem('type');
    const token = localStorage.getItem('token');

    const currentPath = this.location.path();
    if (currentPath == '' && role === 'Admin') {
      this.router.navigate(['/admin/dashboard']);
    }else if(currentPath == '' && !token){
      this.router.navigate(['/login']);
    }

    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const currentUser = users.find((user: any) => user.email === email);

    if (currentUser) {
      this.username = currentUser.username || 'User';
      this.role = role || 'User';
    }

    this.spinner.hide();
  }
}
