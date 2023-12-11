import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CrudUsuarioPage } from './crud-usuario.page';

describe('CrudUsuarioPage', () => {
  let component: CrudUsuarioPage;
  let fixture: ComponentFixture<CrudUsuarioPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(CrudUsuarioPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
