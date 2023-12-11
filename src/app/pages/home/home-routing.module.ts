import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home.page';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
    children : [
      {
        path: 'crud-usuario',
        loadChildren: () => import('../crud-usuario/crud-usuario.module').then( m => m.CrudUsuarioPageModule)
      },
      {
        path: 'crud-asignatura',
        loadChildren: () => import('../crud-asignatura/crud-asignatura.module').then( m => m.CrudAsignaturaPageModule)
      },
      {
        path: 'alumno',
        loadChildren: () => import('../alumno/alumno.module').then( m => m.AlumnoPageModule)
      },
      {
        path: 'asignaturas/:id',
        loadChildren: () => import('../asignaturas/asignaturas.module').then( m => m.AsignaturasPageModule)
      },
      {
        path: 'qr-code/:id',
        loadChildren: () => import('../qr-code/qr-code.module').then( m => m.QrCodePageModule)
      },
      {
        path: 'maps',
        loadChildren: () => import('../maps/maps.module').then( m => m.MapsPageModule)
      },
      {
        path: 'perfil',
        loadChildren: () => import('../perfil/perfil.module').then( m => m.PerfilPageModule)
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule {}
