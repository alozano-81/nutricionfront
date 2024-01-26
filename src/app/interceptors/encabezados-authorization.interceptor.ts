import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class EncabezadosAuthorizationInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let peticion= request;
    if(localStorage.getItem('token')){
      peticion = request.clone({
        setHeaders:{
          Authorization: localStorage.getItem('token')!
        }
      });
    }
    return next.handle(peticion);
  }
}
