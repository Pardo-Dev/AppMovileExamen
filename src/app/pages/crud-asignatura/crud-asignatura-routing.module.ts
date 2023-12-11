import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CrudAsignaturaPage } from './crud-asignatura.page';

const routes: Routes = [
  {
    path: '',
    component: CrudAsignaturaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CrudAsignaturaPageRoutingModule {}
