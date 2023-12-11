import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UsuarioStorageService } from 'src/app/services/usuario-storage.service';

@Component({
  selector: 'app-crud-usuario',
  templateUrl: './crud-usuario.page.html',
  styleUrls: ['./crud-usuario.page.scss'],
})
export class CrudUsuarioPage implements OnInit {

  usuario = new FormGroup(
    {
      rut : new FormControl('', [
                                Validators.required,
                                Validators.pattern('[0-9]{1,2}[0-9]{3}[0-9]{3}-[0-9kK]')
                              ]),

      nombre : new FormControl('', [
                                    Validators.required,
                                    Validators.minLength(3)
                                  ]),

      ap_paterno : new FormControl('', [
                                        Validators.required,
                                        Validators.minLength(3)
                                      ]),

      ap_materno : new FormControl('', [
                                        Validators.required,
                                        Validators.minLength(3)
                                      ]),

      fecha_nacimiento : new FormControl('', [Validators.required]),

      correo  : new FormControl('', [
                                    Validators.required,
                                    Validators.pattern('[a-zA-Z.]+@+(duocuc.cl||profesor.duoc.cl||duoc.cl)')
                                  ]),
      
      tipo_usuario : new FormControl('', [Validators.required]),

      clave_1 : new FormControl('', [
                                    Validators.required,
                                    Validators.minLength(6),
                                    Validators.maxLength(20),
                                    Validators.pattern('[0-9a-zA-Z._]{6,20}')
                                    ]),

      clave_2 : new FormControl('', [
                                    Validators.required,
                                    Validators.minLength(6),
                                    Validators.maxLength(20),
                                    Validators.pattern('[0-9a-zA-Z._]{6,20}')
      ]),
      codigo_firebase : new FormControl('',)
    }
  )

  usuarios: any[] = [];
  usuarios1: any[] = [];
  KEY : string = 'usuarios';
  user : any;

  constructor(private usuarioStorage : UsuarioStorageService,
              private firebase : FirebaseService,
              private router : Router,
              private toastController : ToastController,
              private firestore: AngularFirestore) { }

  ngOnInit() {
    this.cargarUsuarios();
  }
  listar() {
    this.firebase.listarUsuarios().subscribe((data: any[]) => {
      this.usuarios = data;
    });
  }


  async guardar(){
    var resp:boolean = await this.usuarioStorage.agregar(this.usuario.value, this.KEY);
    if(resp){
      this.firebase.agregar('usuarios', this.usuario.value);
      alert("Usuario agregado!");
      this.limpiarCampos()
    }else{
      alert("NO SE GUARDÓ!")
    }
  }

  async modificar(){
    var resp: boolean = await this.usuarioStorage.modificar(this.usuario.value, this.KEY);
    if(resp){
      this.firebase.modificar('usuarios',this.usuario.value.rut||"", this.usuario.value )
      alert("Usuario modificado!");
      this.limpiarCampos()
    }else{
      alert("USUARIO NO EXISTE!");
    }
  }
  modificarFIRE(){
    this.firebase.modificar('usuario', this.usuario.controls.codigo_firebase.value || '' , this.usuario.value)
    this.alerta('bottom', 'Usuario MODIFICADA!', 3000, 'warning');
    this.limpiarCampos();
  }

  cargarUsuarios() {
    this.firebase.getDatos('usuarios')?.subscribe(data => {
      //console.log(data);
      this.usuarios1 = [];
      for(let usuario of data)
      {
        //console.log(usuario.payload.doc.data);
        let usu: any = usuario.payload.doc.data();
        usu['codigo_firebase'] = usuario.payload.doc.id;
        this.usuarios1.push(usu);
      }
      console.log(this.usuarios1);
    });
  }

  eliminar(codigo: string){
    this.firebase.eliminar('usuarios', codigo);
  }

  buscar(id: string){
    this.firebase.getDato('usuarios', id).subscribe(data=> {
      let usu: any = data.data()
      usu['codigo_firebase'] = id;
      this.usuario.setValue(usu);
    });
  }

  limpiarCampos(){
    const rutUsuario = document.getElementById('rutUsuario') as HTMLInputElement;
    const nombreUsuario = document.getElementById('nombreUsuario') as HTMLInputElement;
    const ApellidoPUsuario = document.getElementById('ApellidoPUsuario') as HTMLInputElement;
    const ApellidoMUsuario = document.getElementById('ApellidoMUsuario') as HTMLInputElement;
    const correoUsuario = document.getElementById('correoUsuario') as HTMLInputElement;
    const fechaNacUsuario = document.getElementById('fechaNacUsuario') as HTMLInputElement;
    const tipoUsuario = document.getElementById('tipoUsuario') as HTMLInputElement;
    const clave1 = document.getElementById('clave1') as HTMLInputElement;
    const clave2 = document.getElementById('clave2') as HTMLInputElement;

    rutUsuario.value = '';
    nombreUsuario.value = '';
    ApellidoPUsuario.value = '';
    ApellidoMUsuario.value = '';
    correoUsuario.value = '';
    fechaNacUsuario.value = '';
    tipoUsuario.value = '';
    clave1.value = '';
    clave2.value = '';
  }

  logout(){
    this.usuarioStorage.logout()
    this.alerta('bottom', 'SESION CERRADA! CON EXITO!', 3000, 'danger');
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
