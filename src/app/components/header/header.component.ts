import { Component } from "@angular/core";
import { AuthService } from '../../Service/auth/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  username: string | null = '';

  constructor(public Authservice: AuthService, private router: Router, private toastr: ToastrService) { }

  ngOnInit() {
    this.username = localStorage.getItem('name');
  }

  isDashboardActive(): boolean {
    return this.router.url === '/' || this.router.url === '/dashboard' || this.router.url === '/user/dashboard';
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

