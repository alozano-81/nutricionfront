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
    let httpReq:any
    if(req.url.search('localhost') == -1){
      httpReq = req.clone({
        url: req.url.replace(environment.urlLocal, environment.urlLocalProd)
      });
    }else{
      httpReq = req.clone({
        url: req.url.replace(environment.urlLocal, environment.urlLocal)
      });
    }

    return next.handle(httpReq);
  }
}
