import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
  constructor(private auth: AuthService, private router: Router, private toastr: ToastrService) { }

  ngOnInit(): void {
  }

  loggedIn(): boolean {
    return this.auth.authenticated();
  }

  logout(): void {
    this.auth.logOut();
    this.toastr.success("logged out successfully")
    this.router.navigate(['']);
  }

}
