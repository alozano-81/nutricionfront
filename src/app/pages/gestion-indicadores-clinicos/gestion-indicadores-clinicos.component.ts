import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { AntecedentesFamiliares, ProblemasActuales, Toma } from 'src/app/models/Parametrizacion-model';
import { ServiciosService } from 'src/app/services/servicios.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-gestion-indicadores-clinicos',
  templateUrl: './gestion-indicadores-clinicos.component.html',
  styleUrl: './gestion-indicadores-clinicos.component.scss',
})
export class GestionIndicadoresClinicosComponent implements OnInit, OnDestroy {
  formIndicadoresClinicos: any;
  idForm: string = 'idform';
  validaDeposicion: boolean = false;

  //Listas generales

  arregloVecesDeposicion = [
    {
      codigo: 1,
      nombre: 'Uno',
    },
    {
      codigo: 2,
      nombre: 'Dos',
    },
  ];

  public problemasActuales: string = environment.lbl_problemas_actuales;
  public lbl_antecedentesIndCli: string = environment.lbl_antecedentes;
  public check_diarrea: string = environment.check_diarrea;
  public check_Estrenimiento: string = environment.check_diarrea;
  public check_Gastritis: string = environment.check_Gastritis;
  public check_Ulcera: string = environment.check_Ulcera;
  public check_Nausea: string = environment.check_Nausea;
  public check_Pirosis: string = environment.check_Pirosis;
  public check_Vomito: string = environment.check_Vomito;
  public check_Colitis: string = environment.check_Colitis;
  public lbl_dentadura: string = environment.lbl_dentadura;
  public lbl_otros: string = environment.lbl_otros;
  public lbl_Observaciones: string = environment.lbl_Observaciones;
  public lbl_enfermedad_diagnosticada: string =
    environment.lbl_enfermedad_diagnosticada;
  public lbl_enfermedad_importantes: string =
    environment.lbl_enfermedad_importantes;
  public lbl_toma_medicamento: string = environment.lbl_toma_medicamento;
  public lbl_dosis: string = environment.lbl_dosis;
  public lbl_desde_cuando: string = environment.lbl_desde_cuando;
  public lbl_toma: string = environment.lbl_toma;
  public check_laxantes: string = environment.check_laxantes;
  public check_diureticos: string = environment.check_diureticos;
  public check_antiacidos: string = environment.check_antiacidos;
  public check_analgesicos: string = environment.check_analgesicos;
  public lbl_practica_cirujia: string = environment.lbl_practica_cirujia;
  public lbl_obesidad: string = environment.lbl_obesidad;
  public lbl_diabetes: string = environment.lbl_diabetes;
  public lbl_ta: string = environment.lbl_ta;
  public lbl_cancer: string = environment.lbl_cancer;
  public lbl_hipercolesterolemia: string = environment.lbl_hipercolesterolemia;
  public lbl_hipertrigeceridemia: string = environment.lbl_hipertrigeceridemia;
  public lbl_hipotiroidismo: string = environment.lbl_hipotiroidismo;
  public lbl_cirujia: string = environment.lbl_cirujia;
  public lbl_antecedentes_familiares:string = environment.lbl_antecedentes_familiares;

  listProblemasActuales: ProblemasActuales = {
    name: 'Indeterminate',
    completed: false,
    color: 'primary',
    subtasks: [
      { name: environment.check_diarrea, completed: false, color: 'primary' },
      {
        name: environment.check_Estrenimiento,
        completed: false,
        color: 'primary',
      },
      {
        name: environment.check_Deposicion,
        completed: false,
        color: 'primary',
      },
      { name: environment.check_Gastritis, completed: false, color: 'primary' },
      { name: environment.check_Ulcera, completed: false, color: 'primary' },
      { name: environment.check_Nausea, completed: false, color: 'primary' },
      { name: environment.check_Pirosis, completed: false, color: 'primary' },
      { name: environment.check_Vomito, completed: false, color: 'primary' },
      { name: environment.check_Colitis, completed: false, color: 'primary' },
    ],
  };

  listTomas: Toma = {
    name: 'Indeterminate',
    completed: false,
    color: 'primary',
    subtasks: [
      { name: environment.check_laxantes, completed: false, color: 'primary' },
      {
        name: environment.check_diureticos,
        completed: false,
        color: 'primary',
      },
      {
        name: environment.check_antiacidos,
        completed: false,
        color: 'primary',
      },
      {
        name: environment.check_analgesicos,
        completed: false,
        color: 'primary',
      },
    ],
  };

  listAntecedentesFAmiliares: AntecedentesFamiliares = {
    name: 'Indeterminate',
    completed: false,
    color: 'primary',
    subtasks: [
      {name: environment.check_obesidad,
        completed: false,
        color: 'primary',
      },

      {name: environment.check_Diabetes,
        completed: false,
        color: 'primary',
      },

      {name: environment.check_TA,
        completed: false,
        color: 'primary',
      },

      {name: environment.check_Cancer,
        completed: false,
        color: 'primary',
      },

      {name: environment.check_hipercolesterolemia,
        completed: false,
        color: 'primary',
      },

      {name: environment.check_hipertrigeceridemia,
        completed: false,
        color: 'primary',
      },

      {name: environment.check_hipotiroidismo,
        completed: false,
        color: 'primary',
      },


    ],
  };

  constructor(
    public services: ServiciosService,
    private modal: NgbModal,
    public router: Router,
    public toastr: ToastrService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.formIndicadoresClinicos =
      this.services.cargarDatosIndicadoresClinicos();
  }

  ngOnDestroy(): void {}

  enviarDatos() {
    console.log('===>>', this.formIndicadoresClinicos);

    this.listProblemasActuales.subtasks?.forEach((nombre, ind) => {
      console.log(nombre.name);
      console.log(ind);
      if (ind == 2 && nombre.completed) {
        console.log(this.listProblemasActuales.subtasks);
      }
    });

    console.log('==listTomas=> ', this.listTomas.subtasks);
  }

  validaMed: boolean = false;
  validaCirujia: boolean = false;
  seleccionarFiltros(evento: any, tipo: string) {
    console.log('llega');
    console.log(evento.value);

    if (tipo === 'medicamento') {
      this.validaMed = evento.value;
    }
    if (tipo === 'cirujia') {
      this.validaCirujia = evento.value;
    }

    //console.log(this.formIndicadoresClinicos);
  }
}
