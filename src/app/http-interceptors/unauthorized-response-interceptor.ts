import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';


@Injectable()
export class UnauthorizedResponseInterceptor implements HttpInterceptor {

  constructor(private router: Router) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return next.handle(req)
      .pipe(
        tap({
          error: (err) => {
            if (err instanceof HttpErrorResponse) {
              if (err.status === 401) {
                  this.router.navigate(['unauthorized']);
              }
            }
          }
        })
      );

  }

}
