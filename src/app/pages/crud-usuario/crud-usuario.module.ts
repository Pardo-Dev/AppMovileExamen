import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CrudUsuarioPageRoutingModule } from './crud-usuario-routing.module';

import { CrudUsuarioPage } from './crud-usuario.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CrudUsuarioPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [CrudUsuarioPage]
})
export class CrudUsuarioPageModule {}
