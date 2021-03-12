import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificarRankingsComponent } from './modificar-rankings.component';

describe('ModificarRankingsComponent', () => {
  let component: ModificarRankingsComponent;
  let fixture: ComponentFixture<ModificarRankingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModificarRankingsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModificarRankingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
