import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificarPerfilComponent } from './modificar-perfil.component';

describe('ModificarPerfilComponent', () => {
  let component: ModificarPerfilComponent;
  let fixture: ComponentFixture<ModificarPerfilComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModificarPerfilComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModificarPerfilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
