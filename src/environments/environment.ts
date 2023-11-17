// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  urlApi: 'http://localhost:8085/api/tecnica/entrar',
  urlApivalidacionSesion: 'http://localhost:8083/api/auth/usersesion/validar-sesion',
  urlApiListarComercios: 'http://localhost:8085/api/tecnica/listarcomercios',
  urlValidarLogin: 'autenticacion-login/api/login/validar-credenciales',
  urlListaPaises: 'http://localhost:8083/api/auth/paciente/get-all-paises',
  urlRegistrarPacientes: 'http://localhost:8083/api/paciente/registrar',



  //etiquetas formularios
  usuario: 'Usuario',
  lbl_pass: 'Ingrese su contraseña',
  //msn


  //credenciales
  user: 'admin',
  pass: 'admin'
}
