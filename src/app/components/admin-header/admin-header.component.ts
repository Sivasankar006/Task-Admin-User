import { Component, ViewChild, ElementRef, AfterViewInit, HostListener } from "@angular/core";
import { AuthService } from '../../Service/auth/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-header',
  templateUrl: './admin-header.component.html',
  styleUrls: ['./admin-header.component.scss']
})
export class AdminHeaderComponent {

  constructor(public Authservice: AuthService, private toastr: ToastrService, private router: Router) { }
  sidebarOpen = false;

  ngOnInit(): void {
  }

  logout(): void {
    const email = localStorage.getItem('email');
    const users = JSON.parse(localStorage.getItem('users') || '[]');

    const updatedUsers = users.map((user: any) => ({
      ...user,
      status: user.email === email ? false : user.status
    }));

    localStorage.setItem('users', JSON.stringify(updatedUsers));
    localStorage.removeItem('token');
    localStorage.removeItem('type');
    localStorage.removeItem('email');
    localStorage.removeItem('name');
    this.toastr.success("Logout Successfully");
    this.router.navigate(['/login']);
  }

}
