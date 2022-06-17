import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from '../api.service';
import { AuthService } from '../auth.service';
import { Message } from '../model/message';
import { User } from '../model/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user: User = new User();
  error: Message = new Message();


  constructor(
    private auth: AuthService,
    private router: Router,
    private apiService: ApiService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {}

  submitForm(): void {
      this.login();
  }

  login(): void {
    this.apiService.login(this.user).subscribe({
      next: (token) => this.handleGetUserSuccess(token),
      error: (error) => this.handleError(error.error)
    })
  }

  handleGetUserSuccess(message: Message) {
    this.auth.login(message.token);
    this.toastr.success("Login successful!");
    this.router.navigate(['parts']);
    this.error = new Message();
  }
  
  handleError(error: any) {
    this.error = error;
    this.toastr.error("Error occurred, try again!")
  }
}
