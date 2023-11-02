import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ServiciosService } from 'src/app/services/servicios.service';
import { Paises } from './../../models/Parametrizacion-model';

@Component({
  selector: 'app-gestion-principal',
  templateUrl: './gestion-principal.component.html',
  styleUrls: ['./gestion-principal.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class GestionPrincipalComponent implements OnInit {
  public formRegistro: any;
  paises:Paises[] =[];
  selected:any;
  public sex: string = '';
  public listaSex: string[] = ['Masculino', 'Femenino'];

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
    this.formRegistro = this.services.cargarFormRegistroPacientes();
    //this.cargarSelectPaises();
    this.getPaises();
  }

  getPaises(){
    this.services.getPaises().subscribe(
      (result)=>{
        console.log('ok');
        console.log(result);
        this.paises = result;
        console.log(this.paises);
      },
      (error)=>{
        console.log('nok');
        console.log(error);
      }
    );
  }

  cargarSelectPaises(seleccionaPais:any){}



  registrar() {}

  /**
   * Abre modal en caso de que nit no exista, queda a requerimiento del cliente
   * @param modal
   */
  openModalRegistro(modal: any) {
    this.modal.open(modal, { size: 'xl', scrollable: true });
    //this.modal.open(modal, { fullscreen: true });
  }

  /**
   * Cierra modales
   * @param modal
   */
  cerrarModal(modal: any) {
    this.modal.dismissAll(modal);
  }
}
