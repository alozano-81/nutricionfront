import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { MatExpansionPanel } from '@angular/material/expansion';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DataTableDirective } from 'angular-datatables';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import {
  Paises,
  RegistrarPacientes,
} from 'src/app/models/Parametrizacion-model';
import { ServiciosService } from 'src/app/services/servicios.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-gestion-pacientes',
  templateUrl: './gestion-pacientes.component.html',
  styleUrls: ['./gestion-pacientes.component.scss'],
})
export class GestionPacientesComponent implements OnInit, OnDestroy {
  formRegistro: any;
  habilitarBotonCrear: boolean = false;
  habilitarBotonActualizar: boolean = false;
  paises: Paises[] = [];
  selected: any;
  public sex: string = '';
  public listaSex: string[] = ['Masculino', 'Femenino'];
  listPacientes: RegistrarPacientes[] = [];
  matAcordionTabla: boolean = false;

  @ViewChild('panel1')
  firstPanel!: MatExpansionPanel;

  actualizar: boolean = false;
  customCollapsedHeight: string = '40px';
  customExpandedHeight: string = '40px';

  idForm: string = 'idForm';
  atras: string = environment.atras;

  @Output()
  cerrarModalPaciente: EventEmitter<boolean> = new EventEmitter<boolean>();

  /**Parametros tabla */
  //dtOptions: any = {};
  dtOptions: DataTables.Settings = {};
  dtTriggers: Subject<any> = new Subject<any>();

  @ViewChild(DataTableDirective, { static: false })
  dtElements: any = DataTableDirective;
  isDtInitializeds: boolean = false;

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
    if (localStorage.getItem('creado') == 'ok') {
      localStorage.removeItem('creado');
      this.getPaises();
      //this.getListPacientes();
    } else {
      this.services.validarSesion(localStorage.getItem('token')).subscribe(
        (result: any) => {
          console.log('verr: ', result);
          this.getPaises();
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
}
