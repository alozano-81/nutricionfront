export interface Paises{
  id:number;
  codigo:number;
  nombre:string;
}

export interface RegistrarPacientes{
  nombres: string,
        apellidos:string,
        sexo:string,
        pais:number,
        fechaNacimiento:Date,
        email:string,
        documento:number,
        ocupacion:string,
        telefono:number
}
