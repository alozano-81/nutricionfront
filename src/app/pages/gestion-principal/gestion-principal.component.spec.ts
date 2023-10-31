import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionPrincipalComponent } from './gestion-principal.component';

describe('GestionPrincipalComponent', () => {
  let component: GestionPrincipalComponent;
  let fixture: ComponentFixture<GestionPrincipalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GestionPrincipalComponent]
    });
    fixture = TestBed.createComponent(GestionPrincipalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
