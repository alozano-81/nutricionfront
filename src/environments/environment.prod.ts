export const environment = {
  production: true,
  urlLocal: 'http://localhost:8083/',
  urlLocalProd: 'https://nutricion-production.up.railway.app/',
  urlServidorProd: 'https://saludnutriciontest.000webhostapp.com/',
  productionServidor: 'saludnutriciontest.000webhostapp.com',
  urlProxy2: 'http://localhost:4200/autenticacion-login',
  urlProxy: '/autenticacion-login',

  urlApi: 'http://localhost:8085/api/tecnica/entrar',
  urlApivalidacionSesion: 'http://localhost:8083/api/auth/usersesion/validar-sesion',
  urlCrearUsuarios: 'http://localhost:8083/api/auth/usersesion/creacion',
  urlListaRoles: 'http://localhost:8083/api/auth/usersesion/get-all-roles',
  urlListaUsuarios: 'http://localhost:8083/api/auth/usersesion/listar',

  urlApiListarComercios: 'http://localhost:8085/api/tecnica/listarcomercios',
  urlValidarLogin: 'http://localhost:8083/api/login/validar-credenciales',
  urlListaPaises: 'http://localhost:8083/api/auth/paciente/get-all-paises',
  urlRegistrarPacientes: 'http://localhost:8083/api/auth/paciente/registrar',
  urlActualizarPacientes: 'http://localhost:8083/api/auth/paciente/actualizar',
  urlListaPacientes: 'http://localhost:8083/api/auth/paciente/get-all-datos-personales',

  /*urlApivalidacionSesion: '/autenticacion-login/api/auth/usersesion/validar-sesion',
  urlCrearUsuarios: '/autenticacion-login/api/auth/usersesion/creacion',
  urlListaRoles: '/autenticacion-login/api/auth/usersesion/get-all-roles',

  urlApiListarComercios: '/autenticacion-login/api/tecnica/listarcomercios',
  urlValidarLogin: '/autenticacion-login/api/login/validar-credenciales',
  urlListaPaises: '/autenticacion-login/api/auth/paciente/get-all-paises',
  urlRegistrarPacientes: '/autenticacion-login/api/auth/paciente/registrar',*/


  /*urlApivalidacionSesion: 'https://nutricion-production.up.railway.app/api/auth/usersesion/validar-sesion',
  urlCrearUsuarios: 'https://nutricion-production.up.railway.app/api/auth/usersesion/creacion',
  urlListaRoles: 'https://nutricion-production.up.railway.app/api/auth/usersesion/get-all-roles',

  urlApiListarComercios: 'https://nutricion-production.up.railway.app/api/tecnica/listarcomercios',
  urlValidarLogin: 'https://nutricion-production.up.railway.app/api/login/validar-credenciales',
  urlListaPaises: 'https://nutricion-production.up.railway.app/api/auth/paciente/get-all-paises',
  urlRegistrarPacientes: 'https://nutricion-production.up.railway.app/api/auth/paciente/registrar',*/




  //etiquetas formularios
  usuario: 'Usuario',
  lbl_pass: 'Ingrese su contraseña',
  //msn


  //credenciales
  user: 'admin',
  pass: 'admin',

  //msn
  sesionexpiro:'Sesión expiró',

  //iconos
  atras: 'keyboard_backspace',

}
