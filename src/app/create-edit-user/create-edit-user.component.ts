import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from '../api.service';
import { CompatibleModels } from '../model/compatible-models';
import { Message } from '../model/message';

import { User } from '../model/user';

@Component({
  selector: 'app-create-edit-user',
  templateUrl: './create-edit-user.component.html',
  styleUrls: ['./create-edit-user.component.css']
})
export class CreateEditUserComponent implements OnInit {
  newUserFormMode: boolean = true;
  user: User = new User();
  error: Message = new Message();
  userId: number|string = "";

  constructor(
    private currentRoute: ActivatedRoute,
    private router: Router,
    private apiService: ApiService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    const id = this.currentRoute.snapshot.paramMap.get('id');
    if (id == null || id == "0") {
      this.newUserFormMode = true;
      this.user = new User();
    } else {
      this.userId = id;
      this.newUserFormMode = false;
      this.getUser();
    }
  }

  submitForm(): void {
    if (this.newUserFormMode == true) {
      this.createNewUser();
    } else {
      this.updateExistingUser();
    }
  }

  getUser(): void {
    this.apiService.getUser(this.userId).subscribe({
      next: (user) => this.handleGetUserSuccess(user),
      error: (error) => this.handleError(error.error)
    })
  }

  handleGetUserSuccess(user: User) {
    this.initUser(user);
    this.error = new Message();
  }

  createNewUser(): void {
    if(this.user.password !== this.user.confirmPassord) {
      this.toastr.error("Password don't match!");
      return;
    }
    this.apiService.addUser(this.user).subscribe({
      next: (message) => this.handleCreateSuccess(message),
      error: (error) => this.handleError(error.error)
    })
  }

  updateExistingUser(): void {
    this.apiService.updateUser(this.user).subscribe({
      next: (message) => this.handleUpdateSuccess(message),
      error: (error) => this.handleError(error.error)
    })
  }

  handleUpdateSuccess(message: Message) {
    this.error = new Message();
    this.toastr.success("User successfully updated!")
    this.router.navigate(['users', this.userId]);
  }

  handleCreateSuccess(message: Message) {
    this.error = new Message;
    this.toastr.success("User successfully created!");
    this.router.navigate(['login']);
  }

  handleError(error: any) {
    this.error = error;
    this.toastr.error("Error occurred, try again!")
  }

  getPageTitle(): string {
    return this.newUserFormMode ? "User details" : "Update user details"
  }

  getSubmitBtnTitle(): string {
    return this.newUserFormMode ? "Register" : "Update" 
  }

 

  initUser(user: User) {
    this.user = new User(
      user._id,
      user.firstName,
      user.lastName,
      user.email,
    )
  }
}
