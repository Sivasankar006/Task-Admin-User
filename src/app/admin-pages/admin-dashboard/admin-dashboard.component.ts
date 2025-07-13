import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidatorFn } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonserviceService } from '../../Service/CommonService/commonservice.service'; // Adjust the path to your service
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../Service/auth/auth.service';
import { ChartConfiguration, ChartType } from 'chart.js';


@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent {

  constructor(private fb: FormBuilder, private activatedRoute: ActivatedRoute, private route: Router, private service: CommonserviceService,
    private spinner: NgxSpinnerService, private toastr: ToastrService, private auth: AuthService) { }

  admindetails: any = [];
  userdetails: any = [];

  chartType: ChartType = 'doughnut';

  chartOptions: ChartConfiguration['options'] = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
    }
  };

  adminChartData = {
    labels: ['Active Admin', 'Inactive Admin'],
    datasets: [
      {
        data: [5, 3], 
        backgroundColor: ['#007bff', '#17a2b8']
      }
    ]
  };

  userChartData = {
    labels: ['Active Users', 'Inactive Users'],
    datasets: [
      {
        data: [20, 7], 
        backgroundColor: ['#28a745', '#ffc107']
      }
    ]
  };


  ngOnInit() {
    window.scrollTo(0, 0);
    this.getuserdetails();
  }

  getuserdetails(): void {
    this.spinner.show();
  
    const users = JSON.parse(localStorage.getItem('users') || '[]');
  
    this.admindetails = users.filter((e: any) => e.role === 'Admin');
    this.userdetails = users.filter((e: any) => e.role === 'User');
  
    const activeAdmins = this.admindetails.filter((u: any) => u.status === true).length;
    const inactiveAdmins = this.admindetails.filter((u: any) => u.status === false).length;
  
    const activeUsers = this.userdetails.filter((u: any) => u.status === true).length;
    const inactiveUsers = this.userdetails.filter((u: any) => u.status === false).length;
  
    this.adminChartData = {
      labels: ['Active Admin', 'Inactive Admin'],
      datasets: [
        {
          data: [activeAdmins, inactiveAdmins],
          backgroundColor: ['#007bff', '#17a2b8']
        }
      ]
    };
  
    this.userChartData = {
      labels: ['Active Users', 'Inactive Users'],
      datasets: [
        {
          data: [activeUsers, inactiveUsers],
          backgroundColor: ['#28a745', '#ffc107']
        }
      ]
    };
  
    this.spinner.hide();
  }
  


}

