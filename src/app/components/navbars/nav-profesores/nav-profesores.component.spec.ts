import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavProfesoresComponent } from './nav-profesores.component';

describe('NavProfesoresComponent', () => {
  let component: NavProfesoresComponent;
  let fixture: ComponentFixture<NavProfesoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavProfesoresComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavProfesoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
