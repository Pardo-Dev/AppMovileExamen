import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { AsignaturaService } from 'src/app/services/asignatura.service';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UsuarioStorageService } from 'src/app/services/usuario-storage.service';

@Component({
  selector: 'app-crud-asignatura',
  templateUrl: './crud-asignatura.page.html',
  styleUrls: ['./crud-asignatura.page.scss'],
})
export class CrudAsignaturaPage implements OnInit {

  // Variables auxiliares
  codigo : string = "";
  nombre : string = "";
  rut_docente : string = "";
  KEY : string = "asignaturas"

  constructor(private asignaturaService : AsignaturaService,
              private toastController : ToastController,
              private firebase : FirebaseService,
              private usuarioStorage : UsuarioStorageService,
              private firestore: AngularFirestore) { }

  ngOnInit() {
    this.cargarAsignaturas();
    this.listarDocentes();
    this.listar();
  }
  asignatura = new FormGroup({
    codigo : new FormControl('', [Validators.required]),
    nombre : new FormControl('', [Validators.required]),
    rut_docente : new FormControl('', [Validators.required]),
    codigo_firebase : new FormControl('',)
  })

  asignaturas : any[] = [];
  asignaturas1 : any[] = [];
  usuarios : any[] = [];
  docentes: any[] = [];
  usus : string = 'usuarios';
  asign : any[] = [];


  async listarDocentes(){
    const usuarios = await this.usuarioStorage.listar(this.usus);
    this.docentes = usuarios.filter((usuario) => usuario.tipo_usuario === 'docente');
  }

  listar() {
    this.firebase.listarAsignaturas().subscribe((data: any[]) => {
      this.asign = data;
    });
  }

  cargarAsignaturas() {
    this.firebase.getDatos('asignaturas')?.subscribe(data => {
      //console.log(data);
      this.asignaturas = [];
      for (let asignatura of data) {
        //console.log(usuario.payload.doc.data);
        let asig: any = asignatura.payload.doc.data();
        asig['codigo_firebase'] = asignatura.payload.doc.id;
        this.asignaturas.push(asig);
      }
      console.log(this.asignaturas);
    });
    

  }
  ProfesorA(){
    const Profesor = this.usuarios.filter(usuario => usuario.perfil === 'docente')
    return Profesor;
  }


  

  guardar(){
    this.firebase.agregar('asignaturas', this.asignatura.value);
    alert("Asignatura agregada!");
    this.limpiarCampos();
  }

  eliminar(codigo: string){
    this.firebase.eliminar('asignaturas', codigo);
  }

  buscar(id: string){
    this.firebase.getDato('asignaturas', id).subscribe(data=> {
      let asign: any = data.data()
      asign['codigo_firebase'] = id;
      this.asignatura.setValue(asign);
    });
  }

  /*async guardar(){
    let resp : boolean = await this.asignaturaService.agregar(this.asignatura.value, this.asignatura.value.codigo||"", this.KEY);
    if(resp){
      this.firebase.agregar('asignaturas', this.asignatura.value)
      this.alerta('bottom', 'ASIGNATURA REGISTRADA!', 3000, 'success');
      await this.listar();
      this.limpiarCampos()
    } else {
      this.alerta('bottom', 'ASIGNATURA NO REGISTRADA!', 3000, 'danger');
    }


    async listar(){
    this.asignaturas = await this.asignaturaService.listar(this.KEY);
    this.usuarios = await this.usuarioStorage.listar('usuarios')
  }

  async eliminar(codigoEliminar: string){
    this.firebase.eliminar('asignaturas', codigoEliminar)
    await this.asignaturaService.eliminar(codigoEliminar, this.KEY);
    await this.listar();
    this.alerta('bottom', 'ASIGNATURA NO ELIMINADA!', 3000, 'warning');
  }

  async buscar(codigoBuscar: string){
    var asignaturaEncontrado: any = await this.asignaturaService.buscar(codigoBuscar, this.KEY);
    this.asignatura.setValue(asignaturaEncontrado);
  }


  <ion-item>
        <ion-select label="Rut Docente" placeholder="Seleccione rut" formControlName="rut_docente">
          <ng-container *ngFor="let usu of usuarios">
            <ion-select-option  value="{{usu.rut}}">
              {{usu.nombre}}
            </ion-select-option>
          </ng-container>
        </ion-select>
      </ion-item>





      cargarAsignaturas() {
    this.firebase.getDatos('asignaturas')?.subscribe(data => {
      //console.log(data);
      this.asignaturas1 = [];
      for(let asignatura of data)
      {
        //console.log(usuario.payload.doc.data);
        let asign: any = asignatura.payload.doc.data();
        asign['codigo_firebase'] = asignatura.payload.doc.id;
        this.asignaturas1.push(asign);
      }
      console.log(this.asignaturas1);
    });
  }
  }*/













  // Metodos
  modificarFIRE(){
    this.firebase.modificar('asignaturas', this.asignatura.controls.codigo_firebase.value || '' , this.asignatura.value)
    this.alerta('bottom', 'ASIGNATURA MODIFICADA!', 3000, 'warning');
    this.limpiarCampos();
  }
  

  

  

  async modificar(){
    var resp: boolean = await this.asignaturaService.modificar(this.asignatura.value, this.KEY);
    if(resp){
      this.alerta('bottom', 'ASIGNATURA MODIFICADA!', 3000, 'warning');
      await this.listar();
    }else{
      this.alerta('bottom', 'ASIGNATURA NO EXISTE!', 3000, 'danger');
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

  limpiarCampos(){
    const codigoAsig = document.getElementById('codigoAsig') as HTMLInputElement;
    const nombreAsig = document.getElementById('nombreAsig') as HTMLInputElement;
    const rutDocente = document.getElementById('rutDocente') as HTMLInputElement;

    codigoAsig.value = '';
    nombreAsig.value = '';
    rutDocente.value = '';
  }

  logout(){
    this.usuarioStorage.logout()
    this.alerta('bottom', 'SESION CERRADA! CON EXITO!', 3000, 'danger');
  }
}
