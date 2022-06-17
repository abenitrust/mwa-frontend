import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { TokenInterceptor } from './token-interceptor';
import { UnauthorizedResponseInterceptor } from './unauthorized-response-interceptor';


const token_interceptor =  {
  provide: HTTP_INTERCEPTORS, 
  useClass: TokenInterceptor, 
  multi: true
};


const unauthorized_response_interceptor =  {
  provide: HTTP_INTERCEPTORS, 
  useClass: UnauthorizedResponseInterceptor, 
  multi: true
};



export const httpInterceptorProviders = [
  token_interceptor,
  unauthorized_response_interceptor
];
 