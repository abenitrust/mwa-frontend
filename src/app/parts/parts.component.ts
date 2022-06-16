import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Message } from '../model/message';
import { Page } from '../model/page';
import { Sort, SortKey } from '../model/sort';
import { PartsData, Part, PartData } from '../model/part';
import { Search } from '../model/search';

@Component({
  selector: 'app-parts',
  templateUrl: './parts.component.html',
  styleUrls: ['./parts.component.css']
})
export class PartsComponent implements OnInit {
  partsData: PartsData = new PartsData;
  parts: Part[] = [];
  error: Message = new Message();
  page: Page = new Page;
  sort: Sort = new Sort();
  search: Search = new Search();
  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.getParts();
  }

  pageChanged(page: Page): void {
    this.page = page;
    this.getParts();
  }

  getParts(): void {
    this.apiService.getParts(this.page, this.sort, this.search).subscribe(
      {
        next: (partsData) => this.readResponse(partsData),
        error: (error) => this.handleError(error)
      }
    );
  }

  readResponse(partsData: PartsData): void {
    this.initPartsData(partsData);
    this.resetError();
    this.initPage();
  }

  handleError(error: any): void {
    this.error = error
  }

  initPartsData(partsData: PartsData): void {
    this.partsData = partsData;
    this.parts = this.partsData.data;
  }

  resetError(): void {
    this.error = new Message();
  }

  initPage(): void {
    this.page = new Page(
      ((this.partsData.page - 1) * this.partsData.perPage) + 1,
      this.partsData.perPage,
      this.partsData.totalCount
    )
  }

  sortChanged(sortBy: SortKey): void {
    this.sort.setSortBy(sortBy);
    if(this.sort.sortExists()) {
      this.getParts();
    }
  }

  searchForParts(): void {
    // for search, need to remove paging and sorting request.
    // The user can explicity ask for next page after search is done.
    this.page.clear();
    this.sort.clear();
    this.getParts();
  }

}
