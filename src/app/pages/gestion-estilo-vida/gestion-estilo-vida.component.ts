import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ServiciosService } from 'src/app/services/servicios.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-gestion-estilo-vida',
  templateUrl: './gestion-estilo-vida.component.html',
  styleUrl: './gestion-estilo-vida.component.scss'
})
export class GestionEstiloVidaComponent implements OnInit, OnDestroy{

  actividad = '';
  actividades: { hora: string; actividad: string }[] = [];

  public diarioActividades: string = environment.lbl_diario_actividades;


  constructor(
      public services: ServiciosService,
      private modal: NgbModal,
      public router: Router,
      public toastr: ToastrService,
      private spinner: NgxSpinnerService
    ) {}


  ngOnInit(): void {

  }

  ngOnDestroy(): void {
    throw new Error('Method not implemented.');
  }

  agregarActividad(actividad: string) {
    const hora = new Date().toLocaleTimeString();
    this.actividades.push({ hora, actividad });
  }

  obtenerActividades() {
    return this.actividades;
  }

  registrarActividad() {
    if (this.actividad.trim()) {
      this.agregarActividad(this.actividad);
      this.actividad = '';
    }
  }

}
