import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ServiciosService } from 'src/app/services/servicios.service';
import { environment } from 'src/environments/environment';

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
  idForm: string = 'idForm';
  validaEmbActual:boolean = false;
  validaAnticonceptivo:boolean = false;
  validaClimaterio:boolean = false;
  validaTerapiaHormonal:boolean = false;

  public lbl_dosis: string = environment.lbl_dosis;

  constructor(
    public services: ServiciosService,
    private modal: NgbModal,
    public router: Router,
    public toastr: ToastrService,
    private spinner: NgxSpinnerService
  ) {}


  ngOnInit(): void {
    this.formularioAspectosGinecologicos = this.services.cargarDatosAspectosGinecologicos();

  }

  ngOnDestroy(): void {
  }

  registrar(){

  }

  seleccionarFiltros(evento: any, tipo: string) {
    console.log('llega');
    console.log(evento.value);
    console.log(tipo);

    if (evento.value && tipo == 'embarazoactual') {
      this.validaEmbActual = evento.value;
      this.formularioAspectosGinecologicos.get('edadGestacional').setValue(this.calculoGestacional());
    }else if(!evento.value && tipo == 'embarazoactual'){
      this.validaEmbActual = evento.value;
      this.formularioAspectosGinecologicos.get('edadGestacional').setValue('');
    }

    if (evento.value && tipo == 'anticonceptivooral') {
      this.validaAnticonceptivo = evento.value;
    }else if(!evento.value && tipo == 'anticonceptivooral'){
      this.validaAnticonceptivo = evento.value;
    }

    if (evento.value && tipo == 'climaterio') {
      this.validaClimaterio = evento.value;
    }else if(!evento.value && tipo == 'climaterio'){
      this.validaClimaterio = evento.value;
      this.formularioAspectosGinecologicos.get('climaterio_fecha').setValue('');
    }

    if (evento.value && tipo == 'terapiahormonal') {
      this.validaTerapiaHormonal = evento.value;
    }else if(!evento.value && tipo == 'terapiahormonal'){
      this.validaTerapiaHormonal = evento.value;
      this.formularioAspectosGinecologicos.get('terapiaHormonal_cual').setValue('');
      this.formularioAspectosGinecologicos.get('terapiaHormonal_dosis').setValue('');
    }

  }

  calculoGestacional(){
    let x:number = 0;
    return x;
  }

}
