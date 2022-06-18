import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
import { ApiService } from '../api.service';
import { AuthService } from '../auth.service';
import { Message } from '../model/message';
import { Part } from '../model/part';

@Component({
  selector: 'app-part',
  templateUrl: './part.component.html',
  styleUrls: ['./part.component.css']
})
export class PartComponent implements OnInit {
  part: Part = new Part();
  error: Message = new Message();
  constructor(
    private apiService: ApiService,
    private currentRoute: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
    private auth: AuthService
  ) { }

  ngOnInit(): void {
    const id = this.currentRoute.snapshot.params['id'];
    this.getPart(id);
  }

  getPart(partId: string|number): void {
    this.apiService.getPart(partId).subscribe({
      next: (part) => this.handleGetPartSuccess(part),
      error: (error) => this.handleGetPartError(error.error)
    })
  }

  handleGetPartSuccess(part: Part) {
    this.part = part
    this.error = new Message();
  }

  handleGetPartError(error: Message) {
    this.toastr.error(environment.toastMsg.networkIssues);
  }

  edit(id: number | string): void {
    this.router.navigate(['parts', id, 'edit']);
  }

  delete(id: string | number): void {
    this.apiService.deletePart(id).subscribe({
      next: (message) => this.handleDeleteSuccess(message),
      error: (error) => this.handleDeleteError(error.error)
    })
  }

  handleDeleteSuccess(message: Message) {
    this.toastr.success(environment.toastMsg.partDeleted);
    this.router.navigate(['parts']);
  }

  handleDeleteError(error: Message) {
    this.toastr.error(environment.toastMsg.partCantBeDeleted);
  }

  authenticated(): boolean {
    return this.auth.authenticated();
  }

}
