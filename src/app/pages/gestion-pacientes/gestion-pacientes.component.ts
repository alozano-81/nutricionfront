import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
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
    public toastr: ToastrService
  ) {}

  ngOnInit(): void {

    if (localStorage.getItem('creado') == 'ok') {
      this.formRegistro = this.services.cargarFormRegistroPacientes();
      localStorage.removeItem('creado');
      this.getPaises();
    } else {
      this.services.validarSesion(localStorage.getItem('token')).subscribe(
        (result: any) => {
          console.log('verr: ', result);
          this.formRegistro = this.services.cargarFormRegistroPacientes();
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
    this.services.registrarPacientes(this.formRegistro.value).subscribe(
      (result: any) => {
        console.log('correcot', result);
      },
      (error) => {
        if (error.status == 302) {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'En validación token',
          });
          this.toastr.success('Hello world!', 'Toastr fun!');
          this.toastr.success(
            'No es posible registrar el paciente este n&acuteumero de documento',
            error.error.obj.documento
          );
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
