import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, throwError } from 'rxjs';

import { PartsData, Part } from './model/part';
import { Message } from './model/message';
import { Page } from './model/page';
import { Sort } from './model/sort';
import { Search } from './model/search';
import { User, UsersData } from './model/user';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  #baseApiUrl = "http://localhost:5000/api/v1";
  #partApiUrl = `${this.#baseApiUrl}/parts`;
  #userApiUrl = `${this.#baseApiUrl}/users`;
  #authenticationApiUrl = `${this.#baseApiUrl}/authenticate`;

  constructor(private http: HttpClient) { }

  getParts(
    page: Page = new Page,
    sort: Sort = new Sort(),
    search: Search = new Search()
  ): Observable<PartsData> {
    const pagingQuery = page.getQuery();
    const sortQuery = sort.getQuery();
    const searchQuery = search.getQuery();
    const url = `${this.#partApiUrl}?${pagingQuery}&${sortQuery}&${searchQuery}`;
    return this.http.get<PartsData>(url)
      .pipe(
        catchError(this.handleError)
      )
  }

  getPart(id: string | number): Observable<Part> {
    return this.http.get<Part>(`${this.#partApiUrl}/${id}`)
      .pipe(
        catchError(this.handleError)
      )
  }

  addPart(part: Part): Observable<Message> {
    return this.http.post<Message>(`${this.#partApiUrl}`, part)
      .pipe(
        catchError(this.handleError)
      )
  }

  updatePart(part: Part): Observable<Message> {
    return this.http.patch<Message>(`${this.#partApiUrl}/${part._id}`, part)
      .pipe(
        catchError(this.handleError)
      )
  }

  deletePart(id: string | number): Observable<Message> {
    return this.http.delete<Message>(`${this.#partApiUrl}/${id}`)
      .pipe(
        catchError(this.handleError)
      )
  }

  getUsers(
    page: Page = new Page,
    sort: Sort = new Sort(),
    search: Search = new Search()
  ): Observable<UsersData> {
    const pagingQuery = page.getQuery();
    const sortQuery = sort.getQuery();
    const searchQuery = search.getQuery();
    const url = `${this.#userApiUrl}?${pagingQuery}&${sortQuery}&${searchQuery}`;
    return this.http.get<UsersData>(url)
      .pipe(
        catchError(this.handleError)
      )
  }

  getUser(id: string | number): Observable<User> {
    return this.http.get<User>(`${this.#userApiUrl}/${id}`)
      .pipe(
        catchError(this.handleError)
      )
  }

  addUser(user: User): Observable<Message> {
    return this.http.post<Message>(`${this.#userApiUrl}`, user)
      .pipe(
        catchError(this.handleError)
      )
  }

  updateUser(user: User): Observable<Message> {
    return this.http.patch<Message>(`${this.#userApiUrl}/${user._id}`, user)
      .pipe(
        catchError(this.handleError)
      )
  }

  deleteUser(id: string | number): Observable<Message> {
    return this.http.delete<Message>(`${this.#partApiUrl}/${id}`)
      .pipe(
        catchError(this.handleError)
      )
  }

  updateUserPassword(user: User): Observable<Message> {
    return this.http.patch<Message>(`${this.#userApiUrl}/${user._id}/change-password`, user)
      .pipe(
        catchError(this.handleError)
      )
  }

  login(user: User): Observable<Message> {
    return this.http.post<Message>(`${this.#authenticationApiUrl}`, user)
      .pipe(
        catchError(this.handleError)
      )
  }

  private handleError = (error: any): Observable<never> => {
    return throwError(() => error);
  };

}