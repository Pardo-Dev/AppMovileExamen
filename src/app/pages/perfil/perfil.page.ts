import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';
import { UsuarioStorageService } from 'src/app/services/usuario-storage.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {
  apodData: any;

  constructor(private router : Router,
              private alertController: AlertController,
              private usuarioStorage : UsuarioStorageService,
              private apodService: ApiService,
              private toastController: ToastController,
              private auth: AngularFireAuth) { }

  usuario : any;

  ngOnInit() {
    this.usuario = this.router.getCurrentNavigation()?.extras.state;
    this.usuario = this.usuario.user;
    this.apodService.getApod().subscribe((data) => {
      this.apodData = data;
    });
  }


  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Seguro que quieres salir?',
      buttons: [
        {
          text: 'No',
          cssClass: 'alert-button-cancel',
          role: 'cancel',
        },
        {
          text: 'Si',
          cssClass: 'alert-button-confirm',
          handler: () => {
            this.router.navigate(['/login']);
            this.alerta('bottom', 'SESION CERRADA! CON EXITO!', 3000, 'danger');
          },
        },
      ],
    });

    await alert.present();
  }
  ////////////
  async presentLogoutAlert() {
    const alert = await this.alertController.create({
      header: '¿Seguro que quieres cerrar sesión?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'alert-button-cancel',
        },
        {
          text: 'Cerrar Sesión',
          cssClass: 'alert-button-confirm',
          handler: async () => {
            await this.logout();
            this.alerta('bottom', '¡SESIÓN CERRADA CON ÉXITO!', 3000, 'danger');
          },
        },
      ],
    });
  
    await alert.present();
  }
  
  async logout() {
    try {
      await this.auth.signOut();
      console.log('Sesión cerrada exitosamente');
      this.router.navigate(['/login']);
      // Puedes redirigir a la página de inicio o a donde sea apropiado después del cierre de sesión
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  }

  //////////////

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
