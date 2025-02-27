import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, map, tap } from 'rxjs';
import {
  EstadosCivil,
  Paises,
  RegistrarPacientes,
  RegistroInfoPaciente,
  UserDTO,
} from '../models/Parametrizacion-model';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ServiciosService {
  comercios: any[] = [];
  login: any[] = [];
  respuestas: any[] = [];
  listaPaises: Paises[] = [];
  listaEstadosCivil: EstadosCivil[] = [];
  listaRoles: any[] = [];
  registroPacientes: RegistrarPacientes[] = [];
  registroInfoPaciente: RegistroInfoPaciente[] = [];
  listaUsuarios: UserDTO[] = [];
  listaPacientes: RegistrarPacientes[] = [];

  constructor(
    private formularioNuevo: FormBuilder,
    private formularioTurnos: FormBuilder,
    private formularioCreacionUsuarios: FormBuilder,
    private formularioHistorialAmnesis: FormBuilder,
    private formularioAspectosGinecologicos: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {}

  //form login
  cargarFormLogin(): FormGroup {
    return this.formularioNuevo.group({
      user: ['', Validators.compose([Validators.required])],
      pass: ['', Validators.compose([Validators.required])],
    });
  }

  //form creacion de usuarios
  cargarFormCreacionUsuarios(): FormGroup {
    return this.formularioCreacionUsuarios.group({
      username: ['', Validators.compose([Validators.required])],
      password: ['', Validators.compose([Validators.required])],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      roless: [''],
      idRol: ['', Validators.compose([Validators.required])],
    });
  }

  //form login
  cargarFormTurnos(): FormGroup {
    return this.formularioNuevo.group({
      comercios: [],
      servicios: [],
      fechaInicial: [],
      fechaFinal: [],
    });
  }

  //form registro pacientes
  cargarFormRegistroPacientes(): FormGroup {
    return this.formularioNuevo.group({
      id: [''],
      nombres: ['', Validators.compose([Validators.required])],
      apellidos: ['', Validators.compose([Validators.required])],
      sexo: [],
      pais: [''],
      fechaNacimiento: [],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      documento: ['', Validators.compose([Validators.required])],
      ocupacion: [],
      telefono: [],
      estadoCivil: [],
    });
  }

  /**
   * Formulario para llenar el historial/anamnesis del paciente
   */
  cargarDatosAnamnesisPaciente(): FormGroup{
    return this.formularioHistorialAmnesis.group({
      id: [''],
      idPaciente: [],
      motivo: [''],
      varios: [''],

    });
  }

    /**
   * Formulario para llenar el indicadores clinicos
   */
  cargarDatosIndicadoresClinicos(): FormGroup{
    return this.formularioHistorialAmnesis.group({
      id: [''],
      idPaciente: [''],
      problemasactuales: [''],
      deposicion: [''],
      dentadura: [''],
      otros: [''],
      observaciones: [''],
      enfermedad_diagnosticada: [''],
      enfermedad_importante: [''],
      medicamento: [''],
      dosis: [''],
      desdecuandodosis: [''],
      toma: [''],
      antecedente_familiares: [],
      cirujia: [''],
      obecidad: [''],
      diabetes: [''],
      Obesidad: [''],
      Diabetes: [''],
      ta:[''],
      cancer:[''],
      hipercolesterolemia: [''],
      hipertrigeceridemia: [''],
      hipotiroidismo: [''],

    });
  }

  cargarDatosAspectosGinecologicos(): FormGroup{
     return this.formularioAspectosGinecologicos.group({
      embarazoActual: [''],
      edadGestacional: [''],
      sdg: [''],
      sdg_por: [''],
      anticonceptivos_orales: [''],
      anticonceptivos_orales_cual: [''],
      anticonceptivos_orales_dosis: [''],
      climaterio:[''],
      climaterio_fecha:[''],
      terapiaHormonal:[''],
      terapiaHormonal_cual:[''],
      terapiaHormonal_dosis:[''],
     });
  }

  cargarFormDatosEstiloVida(): FormGroup{
    return this.formularioHistorialAmnesis.group({
      actividad: ['', Validators.compose([Validators.required])],
      horaActividad: ['', Validators.compose([Validators.required])],
      tipoEjercicio: [''],
      claseEjercicio: [''],
      frecuencia: [''],
      duracion: [''],
      inicio: [''],
      consumoFrecuencia: [''],
      consumoCantidad: [''],
      consumoTipo: [''],
      fuerzaPrencil: [''],
      md: [''],
      mi: [''],
      unas: [''],
      presionArterial: [''],
      presionArterialCuanto: [''],
      hora: [''],
      brazoDerecho: ['']
    });
  }

  //******************************servicios
  getUsuariosTodos() {
    let url = `${environment.urlListaUsuarios}`;
    return this.http.get(url).pipe(
      tap((result: any) => (this.listaUsuarios = result)),
      map((result: any) => result)
    );
  }

  getListaRoles() {
    let url = `${environment.urlListaRoles}`;
    return this.http.get(url).pipe(
      tap((result: any) => (this.listaRoles = result)),
      map((result: any) => result)
    );
  }

  validarSesion(token: any) {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
    }).append('token', token);
    let url = `${environment.urlApivalidacionSesion}`;
    return this.http.get(url, { headers: headers }).pipe(
      tap((result: any) => (this.login = result)),
      map((result: any) => result)
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
  validarCredenciales(usuario: string, password: string) {
    let queryParams = new HttpParams();
    queryParams = queryParams.append('usuario', usuario);
    queryParams = queryParams.append('password', password);
    let url = `${environment.urlValidarLogin}`;
    return this.http.post(url, '', { params: queryParams }).pipe(
      tap((result: any) => (this.login = result)),
      map((result: any) => result)
    );
  }

  /**
   *
   * @returns Obtener listado de comercios
   */

  getComercios(): Observable<any[]> {
    let url = `${environment.urlApiListarComercios}`;
    return this.http.get(url).pipe(
      tap((result: any) => (this.comercios = result)),
      map((result: any) => result)
    );
  }

  /**
   *
   * @returns Obtener listado de paises
   */

  getPaises(): Observable<any[]> {
    let url = `${environment.urlListaPaises}`;
    return this.http.get(url).pipe(
      tap((result: any) => (this.listaPaises = result)),
      map((result: any) => result)
    );
  }

  /**
   *
   * @returns Obtener listado de estados civil
   */

  getEstadoCivil(): Observable<any[]> {
    let url = `${environment.urlListaEstadoCivil}`;
    return this.http.get(url).pipe(
      tap((result: any) => (this.listaEstadosCivil = result)),
      map((result: any) => result)
    );
  }

  /**
   * Obtener listado de pacientes actuales
   * @returns
   */
  getPacientes(): Observable<any[]> {
    let url = `${environment.urlListaPacientes}`;
    return this.http.get(url).pipe(
      tap((result: any) => (this.listaPacientes = result)),
      map((result: any) => result)
    );
  }

  /**
   * registrar pacientes nuevos
   *
   * @param {*} form
   * @return {*}
   * @memberof ServiciosService
   */
  registrarPacientes(form: any, token: any, tipo: boolean) {
    //let user ={usuario: usu};
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
    }).append('Authorization', token);
    let items = Object.assign(form);
    let url = tipo
      ? `${environment.urlActualizarPacientes}`
      : `${environment.urlRegistrarPacientes}`;
    return tipo
      ? this.http.put(url, items, { headers: headers }).pipe(
          tap((result: any) => (this.registroPacientes = result)),
          map((result: any) => result)
        )
      : this.http.post(url, items, { headers: headers }).pipe(
          tap((result: any) => (this.registroPacientes = result)),
          map((result: any) => result)
        );
  }

  crearUsuario(token: any, usuario: any) {
    let items = Object.assign(usuario);
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
    }).append('Authorization', token);
    let url = `${environment.urlCrearUsuarios}`;
    return this.http.post(url, items, { headers: headers }).pipe(
      tap((result: any) => (this.respuestas = result)),
      map((result: any) => result)
    );
  }

  deletePaciente(form: any, token: any) {
    //let items = Object.assign(form);
    //const headers2 = new HttpHeaders().set('Authorization', token);
    let headerss = new HttpHeaders({
      'Content-Type': 'application/json',
    }).append('Authorization', token);
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }).append(
        'Authorization',
        token
      ),
      body: form,
    };

    let url = `${environment.urlDeletePaciente}`;
    return this.http
      .request('delete', url, {
        headers: httpOptions.headers,
        body: httpOptions.body,
      })
      .pipe(
        tap((result: any) => (this.respuestas = result)),
        map((result: any) => result)
      );
  }

  registrarInfoPacientes(form: any, token: any, tipo: boolean) {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
    }).append('Authorization', token);
    let items = Object.assign(form);
    let url = tipo
      ? `${environment.urlActualizarPacientes}`
      : `${environment.urlRegistrarInfoPacientes}`;
    return tipo
      ? this.http.put(url, items, { headers: headers }).pipe(
          tap((result: any) => (this.registroInfoPaciente = result)),
          map((result: any) => result)
        )
      : this.http.post(url, items, { headers: headers }).pipe(
          tap((result: any) => (this.registroInfoPaciente = result)),
          map((result: any) => result)
        );
  }

}
