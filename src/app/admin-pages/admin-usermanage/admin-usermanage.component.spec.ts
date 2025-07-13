import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminUsermanageComponent } from './admin-usermanage.component';

describe('AdminUsermanageComponent', () => {
  let component: AdminUsermanageComponent;
  let fixture: ComponentFixture<AdminUsermanageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminUsermanageComponent]
    });
    fixture = TestBed.createComponent(AdminUsermanageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
