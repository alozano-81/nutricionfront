import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ServiciosService } from 'src/app/services/servicios.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-gestion-principal',
  templateUrl: './gestion-principal.component.html',
  styleUrls: ['./gestion-principal.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class GestionPrincipalComponent implements OnInit {
  public formRegistro: any;

  atras:string = environment.atras;
  rolUsuario:any;

  constructor(
    public services: ServiciosService,
    /*
    private route : ActivatedRoute,
    private spinner : NgxSpinnerService,
    public router : Router,
    private serviceAuth : AutenticacionService,
    private modal : NgbModal,
    private changeDetector: ChangeDetectorRef,
    config: NgbModalConfig*/
    //config: NgbModalConfig,
    private modal: NgbModal,

    public router: Router,
    public toastr: ToastrService
  ) {
    //config.backdrop = 'static';
  }

  ngOnInit(): void {
    this.rolUsuario = localStorage.getItem('rolUser');
    if (localStorage.getItem('creado') == 'ok') {
      localStorage.removeItem('creado');
    } else {
      this.services.validarSesion(localStorage.getItem('token')).subscribe(
        (result: any) => {
          this.toastr.success(result.status);
        },
        (error) => {
          console.log('verError: ', error);
          if (error.status == 0) {
            this.toastr.error('Servicio no disponible', 'Temporalmente fuera de servicio');
            localStorage.clear();
            this.router.navigate(['/', 'login']);
          }
          this.cerrarModal('ModalGestionUsuarios');
          if (error.error == null) {
            this.toastr.info('',environment.sesionexpiro);
            localStorage.clear();
            this.router.navigate(['/', 'login']);
          }

          if (error.error.status == 'CONFLICT') {
            this.toastr.info(error.error.msn,environment.sesionexpiro);
            localStorage.clear();
            this.router.navigate(['/', 'login']);
          }
        }
      );
    }
  }

  eventoCerrarModalCreacionUsuario(evento:any){
    console.log('llega evento');
    console.log(evento);
    if(evento){
      this.cerrarModal('ModalGestionUsuarios');
      this.modal.dismissAll();
    }
  }

  /**
   * Abre modal en caso de que nit no exista, queda a requerimiento del cliente
   * @param modal
   */
  openModalRegistro(modal: any) {
    //this.modal.open(modal, { fullscreen: true });
    this.modal.open(modal, { size: 'xl', scrollable: true, backdrop: 'static', keyboard:false });
  }

  /**
   * Cierra modales
   * @param modal
   */
  cerrarModal(modal: any) {
    this.modal.dismissAll(modal);
  }

  regresar(){
    localStorage.clear();
    this.router.navigate(['/', 'login']);
  }
}
