import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MisRankingsComponent } from './mis-rankings.component';

describe('MisRankingsComponent', () => {
  let component: MisRankingsComponent;
  let fixture: ComponentFixture<MisRankingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MisRankingsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MisRankingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
