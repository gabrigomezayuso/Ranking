import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificarContrasenaComponent } from './modificar-contrasena.component';

describe('ModificarContrasenaComponent', () => {
  let component: ModificarContrasenaComponent;
  let fixture: ComponentFixture<ModificarContrasenaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModificarContrasenaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModificarContrasenaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
