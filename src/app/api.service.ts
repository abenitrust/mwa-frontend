import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, throwError } from 'rxjs';

import { PartsData, Part } from './model/part';
import { Message } from './model/message';
import { Page } from './model/page';
import { Sort } from './model/sort';
import { Search } from './model/search';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  #baseApiUrl = "http://localhost:5000/api/v1";
  #partApiUrl = `${this.#baseApiUrl}/parts`;

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

  private handleError = (error: any): Observable<never> => {
    return throwError(() => error);
  };

}