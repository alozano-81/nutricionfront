import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltipModule } from '@angular/material/tooltip';
import { GestionIndicadoresClinicosComponent } from './gestion-indicadores-clinicos/gestion-indicadores-clinicos.component';
//import { NgSelectModule } from '@ng-select/ng-select';
import { DataTablesModule } from 'angular-datatables';
//import { NgxMaskModule } from 'ngx-mask';
import { NgxSpinnerModule } from "ngx-spinner";
import { ToastrModule } from 'ngx-toastr';


import { MatListModule } from '@angular/material/list';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTimepickerModule } from '@angular/material/timepicker';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { SpinerComponent } from './components/spiner/spiner.component';
import { TemplateComponent } from './components/template/template.component';
import { GenerarTurnosComponent } from './generar-turnos/generar-turnos.component';
import { GestionAspectosGinecologicosComponent } from "./gestion-aspectos-ginecologicos/gestion-aspectos-ginecologicos.component";
import { GestionEstiloVidaComponent } from "./gestion-estilo-vida/gestion-estilo-vida.component";
import { GestionLoginComponent } from './gestion-login/gestion-login.component';
import { GestionPacientesComponent } from './gestion-pacientes/gestion-pacientes.component';
import { GestionPrincipalComponent } from './gestion-principal/gestion-principal.component';
import { GestionUsuariosComponent } from './gestion-usuarios/gestion-usuarios.component';
import { PagesRoutingModule } from './pages-routing.module';
import { PagesComponent } from './pages.component';
@NgModule({
    declarations: [
        TemplateComponent,
        PagesComponent,
        GestionLoginComponent,
        GenerarTurnosComponent,
        SpinerComponent,
        GestionPrincipalComponent,
        GestionUsuariosComponent,
        GestionPacientesComponent,
        GestionIndicadoresClinicosComponent,
        GestionAspectosGinecologicosComponent,
        GestionEstiloVidaComponent

    ],
    exports: [TemplateComponent],
    imports: [
    CommonModule,
    //ComponentsModule,
    PagesRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatCardModule,
    MatSelectModule,
    //NgSelectModule,
    MatFormFieldModule,
    MatGridListModule,
    MatCheckboxModule,
    MatButtonToggleModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatDividerModule,
    HttpClientModule,
    DataTablesModule,
    ToastrModule.forRoot(),
    MatIconModule,
    MatTooltipModule,
    MatBottomSheetModule,
    MatDialogModule,
    MatRadioModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    NgxSpinnerModule,
    //NgxMaskModule.forRoot(),
    MatProgressBarModule,
    MatExpansionModule,
    MatTabsModule,
    MatSlideToggleModule,
    MatListModule,
    MatDatepickerModule,
    MatToolbarModule,
    MatTimepickerModule,
    NgxMaterialTimepickerModule
]
})
export class PagesModule {}
