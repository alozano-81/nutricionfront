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
    let httpReq:any
    if(!environment.production){
      httpReq = req.clone({
        //url: req.url.replace((req.url.search(environment.urlProxy) > -1 ? environment.urlProxy :  environment.urlLocal) , (req.url.search(environment.urlProxy) > -1 ? environment.urlProxy :  environment.urlLocal))
        //url: req.url.replace(environment.urlLocal, environment.urlTunelLocal)
        url: req.url.replace(environment.urlLocal, environment.urlLocal)
      });
    }else if(environment.production){
      httpReq = req.clone({
        url: req.url.replace((req.url.search(environment.urlLocal) > -1 ? environment.urlLocal :  environment.urlProxy) , environment.urlLocalProd)
      });
    }
    return next.handle(httpReq);
  }
}
