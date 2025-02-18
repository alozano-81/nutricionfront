import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ServiciosService } from 'src/app/services/servicios.service';
import { environment } from 'src/environments/environment';

//import { Moment } from 'moment';
import moment from 'moment';

@Component({
  selector: 'app-gestion-estilo-vida',
  templateUrl: './gestion-estilo-vida.component.html',
  styleUrl: './gestion-estilo-vida.component.scss',
  standalone: false
})
export class GestionEstiloVidaComponent implements OnInit, OnDestroy {
  idForm: string = 'idForm';
  hora: any;
  formRegistro: any;
  actividad = '';
  actividades: { hora: string; actividad: string; horas: any }[] = [];

  public diarioActividades: string = environment.lbl_diario_actividades;


  constructor(
    public services: ServiciosService,
    private modal: NgbModal,
    public router: Router,
    public toastr: ToastrService,
    private spinner: NgxSpinnerService
  ) { }


  ngOnInit(): void {
    this.formRegistro = this.services.cargarFormDatosEstiloVida();
  }

  ngOnDestroy(): void {
    throw new Error('Method not implemented.');
  }

  registrar() {
    console.log(this.formRegistro.get('horaActividad').getValue);
  }

  agregarActividad(actividad: string, horas: any) {
    const hora = new Date().toLocaleTimeString();
    this.actividades.push({ hora, actividad, horas });
  }

  obtenerActividades() {
    return this.actividades;
  }

  registrarActividad(hora: any) {
    console.log(hora);

    var laHora = moment(hora);

    const horaFormateada = laHora.format("HH:mm:ss");
    console.log(horaFormateada)

    if (this.actividad.trim()) {
      this.agregarActividad(this.actividad, horaFormateada);
      this.actividad = '';
    }
  }

}
