import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RankingsAdminComponent } from './rankings-admin.component';

describe('RankingsAdminComponent', () => {
  let component: RankingsAdminComponent;
  let fixture: ComponentFixture<RankingsAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RankingsAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RankingsAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
