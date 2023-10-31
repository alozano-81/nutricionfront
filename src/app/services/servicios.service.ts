import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, map, tap } from 'rxjs';
import { environment } from './../../environments/environment';
//import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ServiciosService {

  comercios: any[] = [];
  login:any[] = [];

  constructor(
    private formularioNuevo: FormBuilder,
    private formularioTurnos: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) { }


   //form login
   cargarFormLogin(): FormGroup{
    return this.formularioNuevo.group({
      user: [],
      pass:[]
    });
  }

  //form login
  cargarFormTurnos(): FormGroup{
    return this.formularioNuevo.group({
      comercios: [],
      servicios:[],
      fechaInicial:[],
      fechaFinal:[]
    });
  }

  //servicios

  validarCredenciales(usuario:string,password:string){
    let queryParams = new HttpParams();
    queryParams = queryParams.append('usuario',usuario);
    queryParams = queryParams.append('password',password);
    let url = `${environment.urlValidarLogin}`;
    return this.http.post(url,'',{params : queryParams}).pipe(
    tap((result:any)=> (this.login = result)),
    map((result:any)=> result)
    );

  }



  /**
   *
   * @returns Obtener listado de comercios
   */

  getComercios():Observable<any[]>{
    let url = `${environment.urlApiListarComercios}`;
    return this.http.get(url).pipe(
      tap((result:any) => (this.comercios = result)),
      map((result:any) => result)
    );
  }
}
