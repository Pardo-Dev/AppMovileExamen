import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { ClasesService } from 'src/app/services/clases.service';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UsuarioStorageService } from 'src/app/services/usuario-storage.service';

@Component({
  selector: 'app-alumno',
  templateUrl: './alumno.page.html',
  styleUrls: ['./alumno.page.scss'],
})
export class AlumnoPage implements OnInit {

  clases : any[] = [];
  KEY : string = "clases";
  codigoClase : string = "";
  usuario: any;
  rut_alumnos : any[] = [];

  constructor(private clasesStorage : ClasesService,
              private usuarioStorage : UsuarioStorageService,
              private router : Router,
              private toastController: ToastController,
              private firebase : FirebaseService) { }

  async ngOnInit() {
    //vamos a recibir al usuario:
    this.usuario = this.router.getCurrentNavigation()?.extras.state;
    //sobrescribo el usuario con la propiedad .user del usuario que viaja con navigationExtras
    this.usuario = this.usuario.user;
  }
  async listar(){
    this.clases = await this.clasesStorage.listar(this.KEY)
    console.log(this.usuario.nombre)
  }
  //Guardar Firebase & Storage
  async agregarAlumno() {
    var claseEncontrada = await this.clasesStorage.buscar(this.codigoClase, this.KEY);
    if (claseEncontrada && claseEncontrada.codigo == this.codigoClase) {
      if (claseEncontrada.rut_alumnos.includes(this.usuario.rut)) {
        alert("El usuario ya está registrado en esta clase.");
      } else {
        this.rut_alumnos = claseEncontrada.rut_alumnos || [];
        this.rut_alumnos.push(this.usuario.rut);
  
        claseEncontrada.rut_alumnos = this.rut_alumnos;
        await this.clasesStorage.modificar(claseEncontrada, this.KEY);
        this.firebase.modificar('clasesitas', claseEncontrada.codigo, claseEncontrada);
        alert("Usuario Agregado: " + this.usuario.rut);
      }
    } else {
      // Error Clasesita
      alert("La clase no existe.");
    }
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
  logout(){
    this.usuarioStorage.logout()
    this.alerta('bottom','SESION CERRADA!', 3000, 'danger')
  }
}
