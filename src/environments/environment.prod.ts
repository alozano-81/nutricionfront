export const environment = {
  production: true,
  urlLocal: 'http://localhost:8083/',
  urlLocalProd: 'https://nutricioncc.onrender.com/',
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
  urlListaEstadoCivil: 'http://localhost:8083/api/auth/paciente/get-all-estados-civil',
  urlRegistrarPacientes: 'http://localhost:8083/api/auth/paciente/registrar',
  urlActualizarPacientes: 'http://localhost:8083/api/auth/paciente/actualizar',
  urlListaPacientes: 'http://localhost:8083/api/auth/paciente/get-all-datos-personales',
  urlDeletePaciente:'http://localhost:8083/api/auth/paciente/delete',

  /*urlApivalidacionSesion: '/autenticacion-login/api/auth/usersesion/validar-sesion',
  urlCrearUsuarios: '/autenticacion-login/api/auth/usersesion/creacion',
  urlListaRoles: '/autenticacion-login/api/auth/usersesion/get-all-roles',

  urlApiListarComercios: '/autenticacion-login/api/tecnica/listarcomercios',
  urlValidarLogin: '/autenticacion-login/api/login/validar-credenciales',
  urlListaPaises: '/autenticacion-login/api/auth/paciente/get-all-paises',
  urlRegistrarPacientes: '/autenticacion-login/api/auth/paciente/registrar',*/


  /*urlApivalidacionSesion: 'https://nutricioncc.onrender.com/api/auth/usersesion/validar-sesion',
  urlCrearUsuarios: 'https://nutricioncc.onrender.com/api/auth/usersesion/creacion',
  urlListaRoles: 'https://nutricioncc.onrender.com/api/auth/usersesion/get-all-roles',

  urlApiListarComercios: 'https://nutricioncc.onrender.com/api/tecnica/listarcomercios',
  urlValidarLogin: 'https://nutricioncc.onrender.com/api/login/validar-credenciales',
  urlListaPaises: 'https://nutricioncc.onrender.com/api/auth/paciente/get-all-paises',
  urlRegistrarPacientes: 'https://nutricioncc.onrender.com/api/auth/paciente/registrar',*/




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

  pestana_objetivos: 'score',
  pestana_indicadores_clinicos: 'thumb_up',
  pestana_estilo_vida: 'insert_emoticon',
  pestana_aspectos_ginecologicos: 'woman',
  pestana_x: 'add',

  //variables pestanas
  lbl_objetivos: 'Objetivos',
  lbl_indicadoresClinicos: 'Indicadores Clínicos',
  lbl_aspectosGinecologicos: 'Aspectos Ginecológicos',
  lbl_estiloVida: 'Estilos de vida',
  lbl_indicadoresBiomedicos: 'Indicadores Biomédicos',
  lbl_indicadoresDieteticos: 'Indicadores Dietéticos',
  lbl_frecuenciaConsumoAlimentos: 'Frecuencia de Consumo de Alimentos',
  lbl_recordatorio24Horas: 'Recordatorio de 24 Horas',
  lbl_indicadoresAntropometricos: 'Indicadores Antropométricos',
  lbl_interpretacionDatos: 'Interpretacion de datos',

  lbl_pestana_objetivos: 'objetivos',
  lbl_pestana_indicadoresClinicos: 'indicadoresclinicos',
  lbl_pestana_aspectosGinecologicos: 'aspectosginecologicos',
  lbl_pestana_estiloVida: 'estilosdevida',
  lbl_pestana_indicadoresBiomedicos: 'indicadoresbiomedicos',
  lbl_pestana_indicadoresDieteticos: 'indicadoresdieteticos',
  lbl_pestana_frecuenciaConsumoAlimentos: 'frecuenciaconsumoalimentos',
  lbl_pestana_recordatorio24Horas: 'recordatorio24horas',
  lbl_pestana_indicadoresAntropometricos: 'indicadoresantropometricos',
  lbl_pestana_interpretacionDatos: 'interpretaciondatos',

  //varios
  lbl_completed:'f',
  lbl_antecedentes: 'Antecedentes Salu/Enfermedad',
  lbl_problemas_actuales: 'Problemas actuales',
  lbl_antecedentes_familiares: 'Antecedentes familiares',

  //etiquetas antecedentes
  check_diarrea: 'Diarrea',
  check_Estrenimiento:'Estreñimiento',
  check_Deposicion: 'Deposicion',
  check_Gastritis: 'Gastritis',
  check_Ulcera: 'Úlcera',
  check_Nausea: 'Naucea',
  check_Pirosis: 'Pirosis',
  check_Vomito: 'Vomito',
  check_Colitis: 'Colitis',
  lbl_dentadura: 'Dentadura',
  lbl_otros: 'Otros',
  lbl_Observaciones:'Observaciones',
  lbl_enfermedad_diagnosticada: 'Padece alguna enfermedad diagnosticada',
  lbl_enfermedad_importantes: 'Ha padecido alguna enfermedad importante',
  lbl_toma_medicamento: 'Toma algun medicamento',
  lbl_dosis: 'Dosis',
  lbl_desde_cuando: 'Desde cuando',
  lbl_toma: 'Toma',
  check_laxantes: 'Laxantes',
  check_diureticos: 'Diureticos',
  check_antiacidos:'Antiacidos',
  check_analgesicos: 'Analgesicos',
  lbl_practica_cirujia: 'Le han practicado alguna cirugia',
  lbl_obesidad: 'Obecidad',
  lbl_diabetes: 'Diabetes',
  lbl_ta: 'TA',
  lbl_cancer:'Cancer',
  lbl_hipercolesterolemia: 'Hipercolesterolemia',
  lbl_hipertrigeceridemia: 'Hipertrigliceridemia',
  lbl_hipotiroidismo: 'Hipotiroidismo',
  lbl_cirujia: 'Cirujía',
  check_obesidad: 'Obesidad',
  check_Diabetes: 'Diabetes',
  check_TA: 'TA',
  check_Cancer: 'Cáncer',
  check_hipercolesterolemia: 'Hipercolesterolemia',
  check_hipertrigeceridemia: 'Hipertrigliceridemia',
  check_hipotiroidismo: 'Hipotiroidismo',



  //mensajes validaciones
  lbl_solo_numeros:'Solo puede ingresar números',
  lbl_max_caracteres:'Caracteres permitidos ',
  lbl_debe_ingresar: 'Debe ingresar datos',
  lbl_componente_obligatorio_email: 'Debe ingresar un email correcto',

  //formulario anamnesis
  lbl_form_anam_motivo: 'Motivo',

}
