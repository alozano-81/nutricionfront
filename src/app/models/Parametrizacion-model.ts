import { ThemePalette } from "@angular/material/core";

export interface Paises{
  id:number;
  codigo:number;
  nombre:string;
}

export interface EstadosCivil{
  id:number;
  codigo:number;
  nombre:string;
}

export interface RegistrarPacientes{
  nombres: string;
        apellidos:string;
        sexo:string;
        pais:number;
        fechaNacimiento:Date;
        email:string;
        documento:number;
        ocupacion:string;
        telefono:number;
}

export interface RegistroInfoPaciente{
  id: number;
  idPaciente: string;
  motivo: string;
  varios: string
}

export class UserDTO {
  username:string | undefined;
  password:string | undefined;
  email:string | undefined;
  roless: any[] = [];
  idRol: any[] = [];

}

export interface Pestanas {
  name: string;
  completed: boolean;
  nombrePestana: string;
  mostrar:boolean;
  icono: string;
  subtasks?: Pestanas[];
}

export interface ListaAnamnesis{
  name: string;
  completed: string;
  nombrePestana:string;
  tabla:string;
  campo:string;
  tipocampoform:string;
  arreglo?:any[];
  longitudCampoDB:number;
  valores?:ListaAnamnesis[];
}

export interface ProblemasActuales {
  name: string;
  completed: boolean;
  color: ThemePalette;
  subtasks?: ProblemasActuales[];
}

export interface Toma {
  name: string;
  completed: boolean;
  color: ThemePalette;
  subtasks?: Toma[];
}

export interface AntecedentesFamiliares {
  name: string;
  completed: boolean;
  color: ThemePalette;
  subtasks?: AntecedentesFamiliares[];
}
