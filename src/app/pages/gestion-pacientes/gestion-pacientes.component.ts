import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
  ViewChild
} from '@angular/core';
import { MatExpansionPanel } from '@angular/material/expansion';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DataTableDirective } from 'angular-datatables';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import {
  EstadosCivil,
  ListaAnamnesis,
  Paises,
  Pestanas,
  RegistrarPacientes,
} from 'src/app/models/Parametrizacion-model';
import { ServiciosService } from 'src/app/services/servicios.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
@Component({
    selector: 'app-gestion-pacientes',
    templateUrl: './gestion-pacientes.component.html',
    styleUrls: ['./gestion-pacientes.component.scss'],
    standalone: false
})
export class GestionPacientesComponent implements OnInit, OnDestroy {
  formRegistro: any;
  habilitarBotonCrear: boolean = false;
  habilitarBotonActualizar: boolean = false;
  paises: Paises[] = [];
  estadosCivil: EstadosCivil[] = [];
  selected: any;
  public sex: string = '';
  public listaSex: string[] = ['Masculino', 'Femenino'];
  listPacientes: RegistrarPacientes[] = [];
  matAcordionTabla: boolean = false;

  public lbl_debe_ingresar:string = environment.lbl_debe_ingresar;
  public lbl_msn_formato_incorrecto:string = environment.lbl_componente_obligatorio_email;

  @ViewChild('panel1')
  firstPanel!: MatExpansionPanel;

  actualizar: boolean = false;
  customCollapsedHeight: string = '40px';
  customExpandedHeight: string = '40px';

  idForm: string = 'idForm';
  idFormAnamnesis: string = 'idFormAnamnesis';
  atras: string = environment.atras;
  edadcalculada:any;
  age:any;

  @Output()
  cerrarModalPaciente: EventEmitter<boolean> = new EventEmitter<boolean>();

  /**Parametros tabla */
  //dtOptions: any = {};
  dtOptions: DataTables.Settings = {};
  dtTriggers: Subject<any> = new Subject<any>();

  @ViewChild(DataTableDirective, { static: false })
  dtElements: any = DataTableDirective;
  isDtInitializeds: boolean = false;

  formularioAnamnesisGeneral: any;

  pestanas: Pestanas = {
    name: 'Indeterminate',
    completed: false,
    nombrePestana: 'N',
    mostrar: false,
    icono: 'x',
    subtasks: [
      { name: environment.lbl_objetivos, completed: false, nombrePestana: environment.lbl_pestana_objetivos, mostrar: true, icono: environment.pestana_objetivos },
      { name: environment.lbl_indicadoresClinicos, completed: false, nombrePestana: environment.lbl_pestana_indicadoresClinicos, mostrar: true, icono: environment.pestana_indicadores_clinicos },
      { name: environment.lbl_aspectosGinecologicos, completed: false,  nombrePestana: environment.lbl_pestana_aspectosGinecologicos, mostrar: false, icono: environment.pestana_aspectos_ginecologicos },
      { name: environment.lbl_estiloVida, completed: false,  nombrePestana: environment.lbl_pestana_estiloVida, mostrar: true, icono: environment.pestana_estilo_vida },
      { name: environment.lbl_indicadoresBiomedicos, completed: false,  nombrePestana: environment.lbl_pestana_indicadoresBiomedicos, mostrar: true, icono: environment.pestana_x },
      { name: environment.lbl_indicadoresDieteticos, completed: false,  nombrePestana: environment.lbl_pestana_indicadoresDieteticos, mostrar: true, icono: environment.pestana_x },
      { name: environment.lbl_frecuenciaConsumoAlimentos, completed: false,  nombrePestana: environment.lbl_pestana_frecuenciaConsumoAlimentos, mostrar: true, icono: environment.pestana_x },
      { name: environment.lbl_recordatorio24Horas, completed: false, nombrePestana: environment.lbl_pestana_recordatorio24Horas, mostrar: true, icono: environment.pestana_x},
      { name: environment.lbl_indicadoresAntropometricos, completed: false, nombrePestana: environment.lbl_pestana_indicadoresAntropometricos, mostrar: true, icono: environment.pestana_x},
      { name: environment.lbl_interpretacionDatos, completed: false, nombrePestana: environment.lbl_pestana_interpretacionDatos, mostrar: true, icono: environment.pestana_x}
    ],
  };

  lista:any [] =[];
  campoMaximo:number = 40;
  //mensajes validator del formulario
  public lbl_solo_numeros:string = environment.lbl_solo_numeros;
  public lbl_max_caracteres:string = environment.lbl_max_caracteres;


  datosAnamnesis: ListaAnamnesis =  {
    name: 'Indeterminate',
    nombrePestana:'N',
    completed: environment.lbl_completed,
    tabla:'',
    campo:'',
    tipocampoform:'',
    arreglo: [],
    longitudCampoDB:0,
    valores: [
      { name: environment.lbl_form_anam_motivo, completed:environment.lbl_completed,nombrePestana: environment.lbl_pestana_objetivos, tabla:'',campo: 'motivo', tipocampoform: 'input',arreglo:this.lista, longitudCampoDB:0 }
    ],
  };



  constructor(
    public services: ServiciosService,
    private modal: NgbModal,
    public router: Router,
    public toastr: ToastrService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.habilitarBotonCrear = true;
    this.formRegistro = this.services.cargarFormRegistroPacientes();
    this.formularioAnamnesisGeneral = this.services.cargarDatosAnamnesisPaciente();
    if (localStorage.getItem('creado') == 'ok') {
      localStorage.removeItem('creado');
      this.getPaises();
      this.getEstadosCivil();
      //this.getListPacientes();
    } else {
      this.services.validarSesion(localStorage.getItem('token')).subscribe(
        (result: any) => {
          console.log('verr: ', result);
          this.getPaises();
          this.getEstadosCivil();
          this.getListPacientes();
          this.toastr.success(result.status);
        },
        (error) => {
          console.log('verError: ', error);
          this.cerrarModal('ModalRegistro');
          if (error.error.status == 'CONFLICT') {
            this.toastr.info(error.error.msn, environment.sesionexpiro);
            localStorage.clear();
            this.router.navigate(['/', 'login']);
          }
        }
      );
    }
  }

  ngOnDestroy(): void {
    this.dtTriggers.unsubscribe();
  }

  /**
   * carga la lista de paises
   */
  getPaises() {
    this.services.getPaises().subscribe(
      (result) => {
        console.log('ok');
        console.log(result);
        this.paises = result;
        console.log(this.paises);
      },
      (error) => {
        console.log('nok');
        console.log(error);
      }
    );
  }

  /**
   * carga la lista de estados civil
   */
  getEstadosCivil() {
    this.services.getEstadoCivil().subscribe(
      (result) => {
        console.log('ok');
        console.log(result);
        this.estadosCivil = result;
        console.log(this.estadosCivil);
      },
      (error) => {
        console.log('nok');
        console.log(error);
      }
    );
  }

  registrar() {
    if (this.formRegistro.pristine) {
      console.log('sin cambios');
      this.toastr.info('No ha cambiado nada');
    } else {
      console.log('con cambios');
      this.spinner.show();
      this.services
        .registrarPacientes(
          this.formRegistro.value,
          localStorage.getItem('token'),
          this.actualizarR
        )
        .subscribe(
          (result: any) => {
            console.log('correcot', result);
            if (result.status == 'ACCEPTED') {
              this.spinner.hide();
              this.toastr.success(
                result.mensaje == null
                  ? 'Paciente creado correctamente'
                  : result.mensaje.message
              );
              this.formRegistro.reset();
              this.getListPacientes();
              this.modal.dismissAll();
            }
          },
          (error) => {
            console.log('err', error);
            this.spinner.hide();
            if (error.status == 302) {
              Swal.fire({
                icon: 'error',
                title: 'Error',
                text: error.error.mensaje['message'],
              });
              this.toastr.info(
                'No es posible registrar el paciente con este número de documento',
                error.error.obj.documento
              );
            }

            if (error.status == 409) {
              Swal.fire({
                icon: 'error',
                title: 'Error',
                text: error.error.mensaje['message'],
              });
              this.toastr.info(
                'No es posible registrar el paciente con este número de documento',
                error.error.mensaje['message']
              );
            }

            if (error.status == 403) {
              this.spinner.hide();
              localStorage.clear();
              this.toastr.info('', environment.sesionexpiro);
              this.modal.dismissAll();
              this.router.navigate(['/', 'login']);
            }

            if (error.status == 400) {
              this.spinner.hide();
              this.toastr.info('', 'Error en el servicio');
            }
          }
        );
    }
  }

  registrarInfoPaciente(){
    if (this.formularioAnamnesisGeneral.pristine) {
      console.log('sin cambios datos generales info paciente');
      this.toastr.info('No ha cambiado nada');
    } else {
      this.formularioAnamnesisGeneral.get('idPaciente').setValue(this.formRegistro.get('documento').value);
      this.services.registrarInfoPacientes(this.formularioAnamnesisGeneral.value, localStorage.getItem('token'), this.actualizarR).subscribe(
        (result: any) => {
          console.log('correcot', result);
        },
        (error) =>{
          console.log('entra error');
          console.log(error);
        }
      );
    }
  }

  getListPacientes() {
    this.services.getPacientes().subscribe(
      (result: any) => {
        //this.viewDateTableEspanol();
        this.listPacientes = result;

        this.getDataOpcionesTable();
      },
      (error) => {
        console.log(`Lsita eror:  ${error}`);
      }
    );
  }

  /**
   * Cierra modales
   * @param modal
   */
  cerrarModal(modal: any) {
    this.modal.dismissAll(modal);
  }

  actualizarR: boolean = false;
  update(confirma: boolean) {
    this.actualizarR = !confirma ? false : true;
  }

  cleanForm() {
    this.formRegistro.reset();
    this.habilitarBotonCrear = true;
    this.habilitarBotonActualizar = false;
  }

  habilitarRegistroNuevo() {
    this.formRegistro.reset();
    this.habilitarBotonCrear = true;
  }

  valido: boolean = false;
  editar(form: any, modal: any) {
    //this.formRegistro.setValue(form);
    //this.formRegistro.get('documento').disable({ onlySelf: true });
    //this.formRegistro.controls['documento'].disable();
    this.habilitarBotonActualizar = true;
    this.habilitarBotonCrear = false;
    this.valido = true;
    if (!this.firstPanel.expanded) {
      this.firstPanel.toggle();
    }

    for (let obj in form) {
      for (let f in this.formRegistro.value) {
        if (f == obj) {
          this.formRegistro.get(obj).setValue(form[obj]);
          if (f == 'pais') {
            this.formRegistro.get(obj).setValue((form[obj] = +form[obj]));
          }
        }
      }
    }
    let enviarIdRegistro = this.formRegistro.value;
    enviarIdRegistro.id = form.id;
    //this.modal.open(modal, { size: 'xl', scrollable: true, backdrop: 'static', keyboard:false });
  }

  delete(form: any) {
    Swal.fire({
      title: `Documento #: ${form.documento}`,
      text: '¿Eliminar?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    }).then((resultado) => {
      this.spinner.show();
      if (resultado.value) {
        this.services.deletePaciente(form, localStorage.getItem('token')).subscribe(
          (result: any) => {
            this.spinner.hide();
            console.log('1', result);
            if (result.status == 'ACCEPTED') {
              this.spinner.hide();
              this.toastr.success(
                result.mensaje == null
                  ? 'Paciente creado correctamente'
                  : result.mensaje.message
              );
              this.formRegistro.reset();
              this.getListPacientes();
              this.modal.dismissAll();
            }
          },
          (error) => {
            this.spinner.hide();
            console.log('2error', error);
            if (error.status == 403) {
              this.toastr.info(
                environment.sesionexpiro,
                error.error == null ? environment.sesionexpiro : error.error.msn
              );
              localStorage.clear();
              this.router.navigate(['/', 'login']);
            }

            if (error.status == 409) {
              this.toastr.info(
                error.error.status,
                error.error == null ? 'Error' : error.error.mensaje.message
              );
            }
          }
        );
      } else {
        this.spinner.hide();
      }
    });

  }

  calcularEdad(){
    if(this.age){
      //const convertAge = new Date(this.age);
      if(Date.now() < (this.formRegistro.get('fechaNacimiento').value).getTime()){
        this.edadcalculada = 0;
      }else{
        const timeDiff = Math.abs(Date.now() - (this.formRegistro.get('fechaNacimiento').value).getTime());
        this.edadcalculada = Math.floor((timeDiff / (1000 * 3600 * 24))/365);
      }

    }
  }

  /**Opciones español datatable */
  viewDateTableEspanol() {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      language: {
        url: '//cdn.datatables.net/plug-ins/1.13.7/i18n/es-ES.json',
      },
    };
    /**Fin opciones español datatable */
  }

  /**Datetabble */
  getDataOpcionesTable() {
    //this.viewDateTableEspanol();
    if (this.isDtInitializeds) {
      this.dtElements.dtInstance.then((dtInstances: DataTables.Api) => {
        dtInstances.destroy();
        this.dtTriggers.next(this.dtElements);
      });
    } else {
      this.isDtInitializeds = true;
      this.dtTriggers.next(this.dtElements);
    }
    /** Fin datetabble */
  }

  regresar() {
    this.router.navigate(['/', 'gestion-principal']);
  }

  validaSex: number = 0;
  modificaTest(t:any){
    if(t == 'Femenino' && this.formRegistro.get('documento').value != ''){
      this.validaSex = 1;
     for(let r in this.pestanas.subtasks){
      this.pestanas.subtasks[2].mostrar = true;
     }
    }

    if(t == 'Masculino' && this.formRegistro.get('documento').value != ''){
      this.validaSex = 2;
      for(let r in this.pestanas.subtasks){
       this.pestanas.subtasks[2].mostrar = false;
      }
     }
  }

  //enviar datos
  enviarDatos(){

  }

   // validar campos numeros
   validateFormat(event:any,campo:string) {
   /* if(campo == environment.lbl_campo_nu_nit_prov || campo == environment.lbl_campo_nu_nit_clie || campo == environment.lbl_campo_pc_rete_iva || campo == environment.lbl_campo_nu_cta_banc
      || campo == environment.lbl_campo_ct_plaz_pago
      ){
      let key;
      const regexPaste = /[^0-9]+/g;
      if(campo == environment.lbl_campo_nu_nit_prov || campo == environment.lbl_campo_nu_nit_clie || campo == environment.lbl_campo_pc_rete_iva || campo == environment.lbl_campo_nu_cta_banc
        || campo == environment.lbl_campo_ct_plaz_pago
        ){
      if (event.type === 'paste') {
          key = event.clipboardData.getData('text/plain');
          key = key.replaceAll(regexPaste, "");
          key = this.formularioLlenarParametros.get(campo).setValue(key);
      } else {
          key = event.keyCode;
          key = String.fromCharCode(key);
      }
      const regex = /[0-9]|\./;
      if (! regex.test(key)) {
          event.returnValue = false;
          if (event.preventDefault) {
              event.preventDefault();
          }
      }
     }
    }*/

  }
}
