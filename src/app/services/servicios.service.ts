import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, map, tap } from 'rxjs';
import { Paises } from '../models/Parametrizacion-model';
import { environment } from './../../environments/environment';
//import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ServiciosService {

  comercios: any[] = [];
  login:any[] = [];
  listaPaises:Paises[] = [];

  constructor(
    private formularioNuevo: FormBuilder,
    private formularioTurnos: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) { }


   //form login
   cargarFormLogin(): FormGroup{
    return this.formularioNuevo.group({
      user: ['',Validators.compose([Validators.required])],
      pass:['',Validators.compose([Validators.required])]
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

    //form registro pacientes
    cargarFormRegistroPacientes(): FormGroup{
      return this.formularioNuevo.group({
        nombres: ['',Validators.compose([Validators.required])],
        apellidos:['',Validators.compose([Validators.required])],
        sexo:[],
        pais:[],
        fechaNacimiento:[],
        email:[],
        documento:[],
        ocupacion:[],
        telefono:[]
      });
    }

  //******************************servicios

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

    /**
   *
   * @returns Obtener listado de paises
   */

    getPaises():Observable<any[]>{
      let url = `${environment.urlListaPaises}`;
      return this.http.get(url).pipe(
        tap((result:any) => (this.listaPaises = result)),
        map((result:any) => result)
      );
    }
}
