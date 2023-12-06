import { APP_BASE_HREF } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastrModule } from 'ngx-toastr';
import { AppRoutingModule, appRoutingProviders } from './app-routing.module';
import { AppComponent } from './app.component';
import { DespliegueProduccionInterceptor } from './interceptors/despliegue-produccion.interceptor';
import { PagesRoutingModule } from './pages/pages-routing.module';
import { PagesModule } from './pages/pages.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PagesRoutingModule,
    BrowserAnimationsModule,
    MatExpansionModule,
    PagesModule,
    ToastrModule . forRoot ( ) ,
    NgbModule,
    HttpClientModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    appRoutingProviders,
    { provide : APP_BASE_HREF, useValue: '/gestion'},
    { provide: HTTP_INTERCEPTORS, useClass: DespliegueProduccionInterceptor, multi: true }

  ],
  bootstrap: [AppComponent]
})
export class AppModule {

}
