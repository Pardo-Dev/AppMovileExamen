import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CrudAsignaturaPage } from './crud-asignatura.page';

describe('CrudAsignaturaPage', () => {
  let component: CrudAsignaturaPage;
  let fixture: ComponentFixture<CrudAsignaturaPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(CrudAsignaturaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
