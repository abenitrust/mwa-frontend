import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
import { ApiService } from '../api.service';
import { CompatibleModels } from '../model/compatible-models';
import { Message } from '../model/message';

import { Part } from '../model/part';

@Component({
  selector: 'app-create-edit-part',
  templateUrl: './create-edit-part.component.html',
  styleUrls: ['./create-edit-part.component.css']
})
export class CreateEditPartComponent implements OnInit {
  newPartFormMode: boolean = true;
  part: Part = new Part();
  error: Message = new Message();
  partId: number|string = "";

  constructor(
    private currentRoute: ActivatedRoute,
    private router: Router,
    private apiService: ApiService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    const id = this.currentRoute.snapshot.paramMap.get('id');
    if (id == null || id == "0") {
      this.newPartFormMode = true;
      this.part = new Part();
    } else {
      this.partId = id;
      this.newPartFormMode = false;
      this.getPart();
    }
  }

  submitForm(): void {
    if (this.newPartFormMode == true) {
      this.createNewPart();
    } else {
      this.updateExistingPart();
    }
  }

  getPart(): void {
    this.apiService.getPart(this.partId).subscribe({
      next: (part) => this.handleGetPartSuccess(part),
      error: (error) => this.handleError(error.error)
    })
  }

  handleGetPartSuccess(part: Part) {
    this.initPart(part);
    this.error = new Message();
  }

  createNewPart(): void {
    this.apiService.addPart(this.part).subscribe({
      next: (message) => this.handleCreateSuccess(message),
      error: (error) => this.handleError(environment.toastMsg.partCantBeCreated)
    })
  }

  updateExistingPart(): void {
    this.apiService.updatePart(this.part).subscribe({
      next: (message) => this.handleUpdateSuccess(message),
      error: (error) => this.handleError(environment.toastMsg.partCantBeUpdated)
    })
  }

  handleUpdateSuccess(message: Message) {
    this.error = new Message();
    this.toastr.success(environment.toastMsg.partUpdated)
    this.router.navigate(['parts', this.partId]);
  }

  handleCreateSuccess(message: Message) {
    this.error = new Message;
    this.toastr.success(environment.toastMsg.partCreated);
    this.router.navigate(['parts']);
  }

  handleError(error: string) {
    this.error.error = error;
    this.toastr.error(error);
  }

  getPageTitle(): string {
    return this.newPartFormMode ? "New Part details" : "Update part details"
  }

  getSubmitBtnTitle(): string {
    return this.newPartFormMode ? "Create" : "Update" 
  }

  addCompatibleModel(): void {
    this.part.compatibleModels.push(new CompatibleModels())
  }

  removeCompatibleModel(compatibleModel: CompatibleModels): void {
    this.part.compatibleModels = this.part.compatibleModels.filter(cModel => cModel !== compatibleModel)
  }

  initPart(part: Part) {
    this.part = new Part(
      part._id,
      part.name,
      part.partNumber,
      part.price,
      part.category,
      part.brand
    )

    this.part.compatibleModels = part.compatibleModels;
  }
}
