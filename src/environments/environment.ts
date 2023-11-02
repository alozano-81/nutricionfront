// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  urlApi: 'http://localhost:8085/api/tecnica/entrar',
  urlApiListarComercios: 'http://localhost:8085/api/tecnica/listarcomercios',
  urlValidarLogin: 'http://localhost:8083/api/login/validar-credenciales',
  urlListaPaises: 'http://localhost:8083/api/paciente/get-all-paises',



  //etiquetas formularios
  usuario: 'Usuario',
  lbl_pass: 'Ingrese su contraseña',
  //msn


  //credenciales
  user: 'admin',
  pass: 'admin'
}
