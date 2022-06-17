import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Message } from '../model/message';
import { Page } from '../model/page';
import { Sort, SortKey } from '../model/sort';
import { UsersData, User } from '../model/user';
import { Search } from '../model/search';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  usersData: UsersData = new UsersData;
  users: User[] = [];
  error: Message = new Message();
  page: Page = new Page;
  sort: Sort = new Sort();
  search: Search = new Search();
  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.getUsers();
  }

  pageChanged(page: Page): void {
    this.page = page;
    this.getUsers();
  }

  getUsers(): void {
    this.apiService.getUsers(this.page, this.sort, this.search).subscribe(
      {
        next: (usersData) => this.readResponse(usersData),
        error: (error) => this.handleError(error)
      }
    );
  }

  readResponse(usersData: UsersData): void {
    this.initUsersData(usersData);
    this.resetError();
    this.initPage();
  }

  handleError(error: any): void {
    this.error = error
  }

  initUsersData(usersData: UsersData): void {
    this.usersData = usersData;
    this.users = this.usersData.data;
  }

  resetError(): void {
    this.error = new Message();
  }

  initPage(): void {
    this.page = new Page(
      ((this.usersData.page - 1) * this.usersData.perPage) + 1,
      this.usersData.perPage,
      this.usersData.totalCount
    )
  }

  sortChanged(sortBy: SortKey): void {
    this.sort.setSortBy(sortBy);
    if(this.sort.sortExists()) {
      this.getUsers();
    }
  }

  searchForUsers(): void {
    // for search, need to remove paging and sorting request.
    // The user can explicity ask for next page after search is done.
    this.page.clear();
    this.sort.clear();
    this.getUsers();
  }

}
