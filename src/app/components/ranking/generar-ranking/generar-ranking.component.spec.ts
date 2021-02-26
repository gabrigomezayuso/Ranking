import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerarRankingComponent } from './generar-ranking.component';

describe('GenerarRankingComponent', () => {
  let component: GenerarRankingComponent;
  let fixture: ComponentFixture<GenerarRankingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GenerarRankingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GenerarRankingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
