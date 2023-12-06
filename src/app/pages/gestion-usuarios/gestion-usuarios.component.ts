import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ServiciosService } from 'src/app/services/servicios.service';
import { environment } from 'src/environments/environment';
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
  //public listaRol: string[] = ['ROLE_USER', 'ROLE_ADMIN'];
  public listaRol: any[] = [];

  //@Input() cerrarModalCrearUsuario:any;
   /**Enviar datos al componente externo */
   @Output()
   cerrarModalCrearUsuario: EventEmitter<boolean> =  new EventEmitter<boolean>();

  constructor(
    public services: ServiciosService,
    private modal: NgbModal,
    public router: Router,
    public toastr: ToastrService,
    public spinner: NgxSpinnerService
  ){}

  ngOnInit(): void {
    this.getRoles();
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
          if (error.status == 0) {
            this.toastr.error('Servicio no disponible', 'Temporalmente fuera de servicio');
            localStorage.clear();
            this.router.navigate(['/', 'login']);
          }

          if (error.error.status == 'CONFLICT') {
            this.toastr.info(environment.sesionexpiro, error.error.msn);
            localStorage.clear();
            this.router.navigate(['/', 'login']);
          }
        }
      );
    }
  }

  //
  getRoles(){
    this.services.getListaRoles().subscribe(
      (result:any)=>{
        console.log(result);
        this.listaRol = result.obj
      },
      (error)=>{}
    );
  }

  //
  usuario:UserDTO = new UserDTO();
  crear(){
    this.spinner.show();
    this.usuario.username = this.formCreacion.get('username').value;
    this.usuario.password = this.formCreacion.get('password').value;
    this.usuario.email = this.formCreacion.get('email').value;
    this.usuario.roless = [this.formCreacion.get('roless').value];
    this.services.crearUsuario(localStorage.getItem('token'),this.usuario).subscribe(
      (result:any)=>{
        console.log('cre===> ', result);
        this.spinner.hide();
        this.toastr.info('usuario creado correctamente');
        this.formCreacion.reset();
        this.usuario = new UserDTO();
        this.cerrarModalCrearUsuario.emit(true);
      },
      (er)=>{
        console.log('cerror===> ', er);
        this.spinner.hide();
        this.toastr.error(environment.sesionexpiro);
        Swal.fire({icon: 'error', title: er.status == 403 ? er.status : er.error.status , text: er.status == 403 ? environment.sesionexpiro : er.error.msn});
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
