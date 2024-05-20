import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionAspectosGinecologicosComponent } from './gestion-aspectos-ginecologicos.component';

describe('GestionAspectosGinecologicosComponent', () => {
  let component: GestionAspectosGinecologicosComponent;
  let fixture: ComponentFixture<GestionAspectosGinecologicosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GestionAspectosGinecologicosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GestionAspectosGinecologicosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
