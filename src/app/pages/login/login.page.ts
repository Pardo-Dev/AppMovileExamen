import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { getElement } from 'ionicons/dist/types/stencil-public-runtime';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UsuarioStorageService } from 'src/app/services/usuario-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  correo : string = "";
  clave_1 : string = "";

  admin: any = {
    rut: '21336770-6',
    nombre: 'Carlos',
    ap_paterno : 'Pardo',
    ap_materno : 'Belmar',
    correo: 'administrador@duoc.cl',
    fecha_nacimiento: '2003-12-03',
    tipo_usuario: 'administrador',
    clave_1: 'Administrador123',
    clave_2: 'Administrador123'
  }

  docente: any = {
    rut: '13396463-0',
    nombre: 'Matias',
    ap_paterno : 'Rubilar',
    ap_materno : 'Pinto',
    correo: 'docente@duoc.profesor.cl',
    fecha_nacimiento: '2001-05-22',
    tipo_usuario: 'docente',
    clave_1: 'Docente123',
    clave_2: 'Docente123'
  }

  alumno: any = {
    rut: '15538503-0',
    nombre: 'Lucas',
    ap_paterno : 'Antil',
    ap_materno : 'Gaete',
    correo: 'alumno@duocuc.cl',
    fecha_nacimiento: '2003-11-04',
    tipo_usuario: 'alumno',
    clave_1: 'Alumno123',
    clave_2: 'Alumno123'
  }

  alumno2: any = {
    rut: '15538603-0',
    nombre: 'Lucas',
    ap_paterno : 'Antil',
    ap_materno : 'Gaete',
    correo: 'alumnoo@duocuc.cl',
    fecha_nacimiento: '2003-11-04',
    tipo_usuario: 'alumno',
    clave_1: 'Alumno123',
    clave_2: 'Alumno123'
  }
  alumno3: any = {
    rut: '15538703-0',
    nombre: 'Lucas',
    ap_paterno : 'Antil',
    ap_materno : 'Gaete',
    correo: 'alumnooo@duocuc.cl',
    fecha_nacimiento: '2003-11-04',
    tipo_usuario: 'alumno',
    clave_1: 'Alumno123',
    clave_2: 'Alumno123'
  }
  alumno4: any = {
    rut: '15538803-0',
    nombre: 'Lucas',
    ap_paterno : 'Antil',
    ap_materno : 'Gaete',
    correo: 'alumnoooo@duocuc.cl',
    fecha_nacimiento: '2003-11-04',
    tipo_usuario: 'alumno',
    clave_1: 'Alumno123',
    clave_2: 'Alumno123'
  }


  constructor(private usuarioStorage : UsuarioStorageService,
              private router : Router,
              private firebase : FirebaseService,
              private toastController : ToastController) { }


  fecha:Date = new Date();

  async ngOnInit() {
    await this.usuarioStorage.agregar(this.admin, 'usuarios');
    await this.usuarioStorage.agregar(this.docente, 'usuarios');
    await this.usuarioStorage.agregar(this.alumno, 'usuarios');
    await this.usuarioStorage.agregar(this.alumno2, 'usuarios');
    await this.usuarioStorage.agregar(this.alumno3, 'usuarios');
    await this.usuarioStorage.agregar(this.alumno4, 'usuarios');
    //alert(this.fecha.toLocaleDateString())
  }


  //Método para loguear:
  async ingresar(){
    var usuario_encontrado: any = await this.usuarioStorage.login(this.correo, this.clave_1, 'usuarios');
    if(usuario_encontrado != undefined){
      //ELEMENTO NUEVO PARA EL LOGIN:
      var navigationExtras: NavigationExtras = {
        state: {
          user: usuario_encontrado
        }
      };
      if(usuario_encontrado.tipo_usuario == "administrador"){
        this.router.navigate(['/home/perfil'], navigationExtras);
        this.alerta('bottom','CREDENCIALES CORRECTAS', 3000, 'success')
        this.limpiarCampos()
      } else if(usuario_encontrado.tipo_usuario == "docente"){
        this.router.navigate(['/home/perfil'], navigationExtras);
        this.alerta('bottom','CREDENCIALES CORRECTAS', 3000, 'success')
        this.limpiarCampos()
      } else if(usuario_encontrado.tipo_usuario == "alumno"){
        this.router.navigate(['/home/alumno'], navigationExtras);
        this.alerta('bottom','CREDENCIALES CORRECTAS', 3000, 'success')
        this.limpiarCampos()
      }

    }else{
      this.alerta('bottom','USUARIO O CONTRASEÑA INVALIDA', 3000, 'danger')
    }
  }

  limpiarCampos(){
    const correo = document.getElementById('correo') as HTMLInputElement;
    const clave = document.getElementById('clave') as HTMLInputElement;

    correo.value = "";
    clave.value = "";
  }


  // Metodo para la tostada
  async alerta(position: 'top' | 'middle' | 'bottom', 
                    message: string,
                    duration: number,
                    color: 'danger'|'success'|'warning') {
    const toast = await this.toastController.create({
      message,
      duration: duration,
      position: position,
      color: color
    });

    await toast.present();
  }
}
