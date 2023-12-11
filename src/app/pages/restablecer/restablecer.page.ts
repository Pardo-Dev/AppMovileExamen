import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioStorageService } from 'src/app/services/usuario-storage.service';

@Component({
  selector: 'app-restablecer',
  templateUrl: './restablecer.page.html',
  styleUrls: ['./restablecer.page.scss'],
})
export class RestablecerPage implements OnInit {

  // Variables auxiliares
  correo : string = "";

  KEY : string = "usuarios";

  constructor(private usuarioStorage : UsuarioStorageService,
              private router : Router) { }

  async validarCorreo(){
    let correoValido = await this.usuarioStorage.buscarCorreo(this.correo, this.KEY)
    if(correoValido != undefined || ""){
      alert("Hemos enviado una solicitud para restablecer contraseña a su correo!"+correoValido.correo)
      this.router.navigate(["/login"])
    } else{
      alert("El correo ingresado no existe!")
    }
  }

  ngOnInit() {
  }

}
