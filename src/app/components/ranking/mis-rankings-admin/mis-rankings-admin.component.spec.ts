import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MisRankingsAdminComponent } from './mis-rankings-admin.component';

describe('MisRankingsAdminComponent', () => {
  let component: MisRankingsAdminComponent;
  let fixture: ComponentFixture<MisRankingsAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MisRankingsAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MisRankingsAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
