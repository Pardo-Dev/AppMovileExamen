import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ClasesService } from 'src/app/services/clases.service';

@Component({
  selector: 'app-qr-code',
  templateUrl: './qr-code.page.html',
  styleUrls: ['./qr-code.page.scss'],
})
export class QrCodePage implements OnInit {

  id : string = "";
  KEY : string = "clases"
  codigo : string = "";
  data: any ="";
  clase: any;


  constructor(private clasesStorage : ClasesService,
              private activatedRoute: ActivatedRoute) { }

  async ngOnInit() {
    // Recuperar el valor del estado 'clase' de la URL
    this.codigo = this.activatedRoute.snapshot.paramMap.get("id") || " ";
    console.log(this.codigo)
    this.data = this.codigo
  }


  async buscar(idClase: string){
    var claseEncontrada: any = await this.clasesStorage.buscar(idClase, this.KEY);
    return claseEncontrada.codigo;
  }




}
