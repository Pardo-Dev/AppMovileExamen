import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { UsuarioStorageService } from 'src/app/services/usuario-storage.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  //crear una variable auxiliar:
  usuario: any;

  constructor(private usuarioStorage: UsuarioStorageService,
              private router : Router) {}
      
  ngOnInit(){
    //recibir el valor
    this.usuario = this.router.getCurrentNavigation()?.extras.state;
    this.usuario = this.usuario.user;
  }

  logout(){
    this.usuarioStorage.logout()
  }
}
