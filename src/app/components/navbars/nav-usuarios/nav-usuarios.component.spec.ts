import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavUsuariosComponent } from './nav-usuarios.component';

describe('NavUsuariosComponent', () => {
  let component: NavUsuariosComponent;
  let fixture: ComponentFixture<NavUsuariosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavUsuariosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavUsuariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
