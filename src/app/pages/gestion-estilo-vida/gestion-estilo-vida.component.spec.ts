import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionEstiloVidaComponent } from './gestion-estilo-vida.component';

describe('GestionEstiloVidaComponent', () => {
  let component: GestionEstiloVidaComponent;
  let fixture: ComponentFixture<GestionEstiloVidaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GestionEstiloVidaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GestionEstiloVidaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
