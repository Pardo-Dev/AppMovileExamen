import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AsignaturaService } from 'src/app/services/asignatura.service';
import { ClasesService } from 'src/app/services/clases.service';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UsuarioStorageService } from 'src/app/services/usuario-storage.service';

@Component({
  selector: 'app-asignaturas',
  templateUrl: './asignaturas.page.html',
  styleUrls: ['./asignaturas.page.scss'],
})
export class AsignaturasPage implements OnInit {

  // Variables auxiliares
  asignaturas : any[] = [];
  usuario : any[] = [];
  rut_usuario : string = "";
  KEY : string = "asignaturas";
  data: string = '';

  constructor(private asigService : AsignaturaService,
              private router : Router,
              private activatedRoute : ActivatedRoute,
              private clasesServices: ClasesService,
              private usuarioStorage: UsuarioStorageService,
              private asignStorage: AsignaturaService,
              private firebase : FirebaseService) { }


  async ngOnInit() {
    this.rut_usuario = this.activatedRoute.snapshot.paramMap.get("id") || " ";
    await this.listarAsig();
    console.log(this.rut_usuario);
    await this.listar();
    this.cargarAsignaturas();
  }


  async listarAsig(){
    this.asignaturas = await this.asigService.listar('asignaturas');
  }
  async listar(){
    const rutDocenteActual = this.usuarioStorage.getRutDocenteActual();
    if(rutDocenteActual){
      this.asignaturas = (await this.asignStorage.listar(this.KEY)).filter(asignatura => asignatura.rut_docente === rutDocenteActual);
    }
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

  generarCodigoUnico(longitud: number): string {
    const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let codigo = '';
  
    for (let i = 0; i < longitud; i++) {
      const indiceAleatorio = Math.floor(Math.random() * caracteres.length);
      codigo += caracteres.charAt(indiceAleatorio);
    }
  
    return codigo;
  }

  generarClase(codigoAsig : string){
    let dia = new Date().getDay();
    let mes = new Date().getMonth();
    let anio = new Date().getFullYear();
    let fecha = dia + "/" + mes + "/" + anio;
    let clase : any  = {
      codigo : this.generarCodigoUnico(6),
      fecha_clase : fecha,
      codigo_asig : codigoAsig,
      rut_alumnos : []
    }
    this.clasesServices.agregar(clase, 'clases');
    this.router.navigate(['/home/qr-code', clase.codigo]);
  }
}
