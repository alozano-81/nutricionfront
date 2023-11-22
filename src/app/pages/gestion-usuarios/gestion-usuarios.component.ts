import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ServiciosService } from 'src/app/services/servicios.service';
import Swal from 'sweetalert2';
import { UserDTO } from './../../models/Parametrizacion-model';

@Component({
  selector: 'app-gestion-usuarios',
  templateUrl: './gestion-usuarios.component.html',
  styleUrls: ['./gestion-usuarios.component.scss']
})
export class GestionUsuariosComponent implements OnInit{
  public formCreacion:any;
  rolUsuario:any;
  public rol: string = '';
  public listaRol: string[] = ['ROLE_USER', 'ROLE_ADMIN'];

  //@Input() cerrarModalCrearUsuario:any;
   /**Enviar datos al componente externo */
   @Output()
   cerrarModalCrearUsuario: EventEmitter<boolean> =  new EventEmitter<boolean>();

  constructor(
    public services: ServiciosService,
    private modal: NgbModal,
    public router: Router,
    public toastr: ToastrService
  ){}

  ngOnInit(): void {
    this.formCreacion = this.services.cargarFormCreacionUsuarios();
    this.rolUsuario = localStorage.getItem('rolUser');
    if (localStorage.getItem('creado') == 'ok') {
      localStorage.removeItem('creado');
    } else {
      this.services.validarSesion(localStorage.getItem('token')).subscribe(
        (result: any) => {
          console.log('verr: ', result);
          this.toastr.success(result.status);
        },
        (error) => {
          console.log('verError: ', error);
          this.cerrarModalCrearUsuario.emit(true);
          if (error.error.status == 'CONFLICT') {

            this.toastr.info('Sesion expiro', error.error.msn);
            localStorage.clear();
            this.router.navigate(['/', 'login']);
          }
        }
      );
    }
  }

  //
  usuario:UserDTO = new UserDTO();
  crear(){
    this.usuario.username = this.formCreacion.get('username').value;
    this.usuario.password = this.formCreacion.get('password').value;
    this.usuario.email = this.formCreacion.get('email').value;
    this.usuario.roless = [this.formCreacion.get('roless').value];
    this.services.crearUsuario(localStorage.getItem('token'),this.usuario).subscribe(
      (result:any)=>{
        console.log('cre===> ', result);
        this.toastr.info('usuario creado correctamente')
      },
      (error)=>{
        console.log('cerror===> ', error);
        Swal.fire({icon: 'error', title: error.error.status, text: error.error.msn});
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
