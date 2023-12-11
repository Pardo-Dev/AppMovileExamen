import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CrudUsuarioPage } from './crud-usuario.page';

const routes: Routes = [
  {
    path: '',
    component: CrudUsuarioPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CrudUsuarioPageRoutingModule {}
