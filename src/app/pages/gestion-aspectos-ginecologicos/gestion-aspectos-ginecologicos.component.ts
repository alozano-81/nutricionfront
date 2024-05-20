import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ServiciosService } from 'src/app/services/servicios.service';

@Component({
  selector: 'app-gestion-aspectos-ginecologicos',
  templateUrl: './gestion-aspectos-ginecologicos.component.html',
  styleUrl: './gestion-aspectos-ginecologicos.component.scss'
})
export class GestionAspectosGinecologicosComponent implements OnInit, OnDestroy{

  public formularioAspectosGinecologicos: any;
  public embarazoActual: string = '';
  public listaEmbarazoActual: string[] = ['Si', 'No'];
  @Input() arregloPestanaApetosGine:any;

  constructor(
    public services: ServiciosService,
    private modal: NgbModal,
    public router: Router,
    public toastr: ToastrService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnDestroy(): void {
    this.formularioAspectosGinecologicos = this.services.cargarDatosAspectosGinecologicos();
  }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

}
