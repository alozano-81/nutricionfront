import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class DespliegueProduccionInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(req : HttpRequest<any>, next : HttpHandler) : Observable<HttpEvent<any>> {
    console.log(req);
    console.log(req.url.search('localhost'));
    console.log(req.url.search(environment.urlProxy));
    console.log(environment.urlProxy,' entrando');

    let httpReq:any
    if(!environment.production){
      console.log('entra', 1);
      httpReq = req.clone({
        //url: req.url.replace((req.url.search(environment.urlProxy) > -1 ? environment.urlProxy2 :  environment.urlLocal) , (req.url.search(environment.urlProxy) > -1 ? environment.urlProxy2 :  environment.urlLocal))
        url: req.url.replace(environment.urlProxy , environment.urlLocal)
      });
    }else if(environment.production){
      console.log('entra', 2);
      httpReq = req.clone({
        url: req.url.replace(environment.urlServidorProd, environment.urlLocalProd)
      });
    }else{
      console.log('entra', 3);
      httpReq = req.clone({
        url: req.url.replace(environment.urlLocal, environment.urlLocal)
      });
    }

    return next.handle(httpReq);
  }
}
