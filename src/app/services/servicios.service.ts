import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, map, tap } from 'rxjs';
import { Paises, RegistrarPacientes } from '../models/Parametrizacion-model';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ServiciosService {

  comercios: any[] = [];
  login:any[] = [];
  respuestas:any [] =[];
  listaPaises:Paises[] = [];
  registroPacientes:RegistrarPacientes[] =[];

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
        documento:['',Validators.compose([Validators.required])],
        ocupacion:[],
        telefono:[]
      });
    }

  //******************************servicios

  validarSesion(token:any){
    let headers = new HttpHeaders({'Content-Type': 'application/json'}).append('token', token);
    let url = `${environment.urlApivalidacionSesion}`;
    console.log('pasa', url);
    return this.http.get(url,{headers: headers}).pipe(
    tap((result:any)=> (this.login = result)),
    map((result:any)=> result)
    );

  }

  /**
   *Validar credenciales de inicio de sesion
   *
   * @param {string} usuario
   * @param {string} password
   * @return {*}
   * @memberof ServiciosService
   */
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

  /**
   * registrar pacientes nuevos
   *
   * @param {*} form
   * @return {*}
   * @memberof ServiciosService
   */
  registrarPacientes(form: any) {
    //let user ={usuario: usu};
    let items = Object.assign(form);
    let url = `${environment.urlRegistrarPacientes}`;
    return this.http.post(url, items).pipe(
      tap((result: any) => (this.registroPacientes = result)),
      map((result: any) => result)
    );
  }
}
