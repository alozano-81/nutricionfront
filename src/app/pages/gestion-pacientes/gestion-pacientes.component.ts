import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Paises } from 'src/app/models/Parametrizacion-model';
import { ServiciosService } from 'src/app/services/servicios.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-gestion-pacientes',
  templateUrl: './gestion-pacientes.component.html',
  styleUrls: ['./gestion-pacientes.component.scss'],
})
export class GestionPacientesComponent implements OnInit {
  formRegistro: any;
  paises: Paises[] = [];
  selected: any;
  public sex: string = '';
  public listaSex: string[] = ['Masculino', 'Femenino'];

  @Output()
   cerrarModalPaciente: EventEmitter<boolean> =  new EventEmitter<boolean>();

  constructor(
    public services: ServiciosService,
    private modal: NgbModal,
    public router: Router,
    public toastr: ToastrService,
    private spinner : NgxSpinnerService,
  ) {}

  ngOnInit(): void {
    this.formRegistro = this.services.cargarFormRegistroPacientes();
    if (localStorage.getItem('creado') == 'ok') {
      localStorage.removeItem('creado');
      this.getPaises();
    } else {
      this.services.validarSesion(localStorage.getItem('token')).subscribe(
        (result: any) => {
          console.log('verr: ', result);
          this.getPaises();
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
    this.spinner.show();
    this.services.registrarPacientes(this.formRegistro.value, localStorage.getItem('token')).subscribe(
      (result: any) => {
        console.log('correcot', result);
        if(result.status == 'ACCEPTED'){
          this.spinner.hide();
          this.toastr.success(result.mensaje == null ? 'Paciente creado correctamente' : result.mensaje);
          this.formRegistro.reset();
          this.modal.dismissAll();
        }
      },
      (error) => {console.log('err', error);
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

        if(error.status == 403){
          this.spinner.hide();
          localStorage.clear();
          this.toastr.info('',
            environment.sesionexpiro
          );
          this.modal.dismissAll();
          this.router.navigate(['/', 'login']);
        }
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

}
