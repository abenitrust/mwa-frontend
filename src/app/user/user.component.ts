import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { environment } from 'src/environments/environment';

import { ApiService } from '../api.service';
import { Message } from '../model/message';
import { User } from '../model/user';





@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  user: User = new User();
  error: Message = new Message();

  @ViewChild('closeModal') closeModal?: ElementRef;

  constructor(
    private apiService: ApiService,
    private currentRoute: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    const id = this.currentRoute.snapshot.params['id'];
    this.getUser(id);
  }

  getUser(userId: string|number): void {
    this.apiService.getUser(userId).subscribe({
      next: (user) => this.handleGetUserSuccess(user),
      error: (error) => this.handleGetUserError(error.error)
    })
  }

  handleGetUserSuccess(user: User) {
    this.user = user;
    this.error = new Message();
  }

  handleGetUserError(error: Message) {
    this.toastr.error(environment.toastMsg.networkIssues);
  }

  edit(id: number | string): void {
    this.router.navigate(['users', id, 'edit']);
  }

  delete(id: string | number): void {
    this.apiService.deleteUser(id).subscribe({
      next: (message) => this.handleDeleteSuccess(message),
      error: (error) => this.handleDeleteError(error.error)
    })
  }

  handleDeleteSuccess(message: Message) {
    this.toastr.success(environment.toastMsg.userDeleted);
    this.router.navigate(['users']);
  }

  handleDeleteError(error: Message) {
    this.toastr.error(environment.toastMsg.userCantBeDeleted);
  }

  handlePasswordUpdateSuccess(message: Message) {
    this.toastr.success(environment.toastMsg.userPasswordUpdated);
    this.user.password = "";
    this.user.confirmPassord = "";
    this.closeModal?.nativeElement.click();
  }

  handlePasswordUpdateError(error: Message) {
    this.toastr.error(environment.toastMsg.userPasswordCantBeUpdated);
  }

  updatePassword() {
    if(this.user.password !== this.user.confirmPassord) {
      this.toastr.error(environment.toastMsg.passwordsDontMatch);
      return;
    }
    this.apiService.updateUserPassword(this.user).subscribe({
      next: (message) => this.handlePasswordUpdateSuccess(message),
      error: (error) => this.handleDeleteError(error.error)
    })
  }

}
