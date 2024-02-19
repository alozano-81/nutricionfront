import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionIndicadoresClinicosComponent } from './gestion-indicadores-clinicos.component';

describe('GestionIndicadoresClinicosComponent', () => {
  let component: GestionIndicadoresClinicosComponent;
  let fixture: ComponentFixture<GestionIndicadoresClinicosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GestionIndicadoresClinicosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GestionIndicadoresClinicosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
