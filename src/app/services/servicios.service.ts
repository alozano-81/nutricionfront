import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, map, tap } from 'rxjs';
import { Paises, RegistrarPacientes, UserDTO } from '../models/Parametrizacion-model';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ServiciosService {

  comercios: any[] = [];
  login:any[] = [];
  respuestas:any [] =[];
  listaPaises:Paises[] = [];
  listaRoles:any[] =[];
  registroPacientes:RegistrarPacientes[] =[];
  listaUsuarios:UserDTO[] =[];
  listaPacientes: RegistrarPacientes[] =[] ;

  constructor(
    private formularioNuevo: FormBuilder,
    private formularioTurnos: FormBuilder,
    private formularioCreacionUsuarios: FormBuilder,
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

  //form creacion de usuarios
  cargarFormCreacionUsuarios(): FormGroup{
    return this.formularioCreacionUsuarios.group({
      username:['',Validators.compose([Validators.required])],
      password:['',Validators.compose([Validators.required])],
      email:['',Validators.compose([Validators.required])],
      roless:['',Validators.compose([Validators.required])]
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
        id:[''],
        nombres: ['',Validators.compose([Validators.required])],
        apellidos:['',Validators.compose([Validators.required])],
        sexo:[],
        pais:[],
        fechaNacimiento:[],
        email:['',Validators.compose([Validators.required, Validators.email])],
        documento:['',Validators.compose([Validators.required])],
        ocupacion:[],
        telefono:[]
      });
    }

  //******************************servicios
  getUsuariosTodos(){
    let url = `${environment.urlListaUsuarios}`;
    return this.http.get(url).pipe(
      tap((result:any)=> (this.listaUsuarios = result)),
      map((result:any)=> result)
      );
  }

  getListaRoles(){
    let url = `${environment.urlListaRoles}`;
    return this.http.get(url).pipe(
      tap((result:any)=> (this.listaRoles = result)),
      map((result:any)=> result)
      );
  }

  validarSesion(token:any){
    let headers = new HttpHeaders({'Content-Type': 'application/json'}).append('token', token);
    let url = `${environment.urlApivalidacionSesion}`;
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
     * Obtener listado de pacientes actuales
     * @returns
     */
    getPacientes():Observable<any[]>{
      let url = `${environment.urlListaPacientes}`;
      return this.http.get(url).pipe(
        tap((result:any) => (this.listaPacientes = result)),
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
  registrarPacientes(form: any, token:any, tipo:boolean) {
    //let user ={usuario: usu};
    let headers = new HttpHeaders({'Content-Type': 'application/json'}).append('Authorization', token);
    let items = Object.assign(form);
    let url = tipo ? `${environment.urlActualizarPacientes}` : `${environment.urlRegistrarPacientes}`;
    return tipo ? this.http.put(url, items, {headers: headers}).pipe(
      tap((result: any) => (this.registroPacientes = result)),
      map((result: any) => result)
    ) : this.http.post(url, items, {headers: headers}).pipe(
      tap((result: any) => (this.registroPacientes = result)),
      map((result: any) => result)
    );
  }

  crearUsuario(token:any, usuario:any){
    let items = Object.assign(usuario);
    let headers = new HttpHeaders({'Content-Type': 'application/json'}).append('Authorization', token);
    let url = `${environment.urlCrearUsuarios}`;
    return this.http.post(url,items,{headers: headers}).pipe(
    tap((result:any)=> (this.respuestas = result)),
    map((result:any)=> result)
    );
  }
}
