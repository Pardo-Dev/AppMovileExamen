import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class ClasesService {

  clases : any[] = [];

  constructor(private storage : Storage) {
    this.storage.create();
  }

  //buscar: que buscar y donde buscarlo.
  async buscar(codigo_clase: string, key: string): Promise<any>{
    this.clases = await this.storage.get(key) || [];
    return this.clases.find(clases => clases.codigo == codigo_clase);
  }
  

  async buscarCodigo(codigo_qr: string, key: string): Promise<any>{
    this.clases = await this.storage.get(key) || [];
    return this.clases.find(clases => clases.codigo_qr == codigo_qr);
  }

  async agregar(clase: any, key: string): Promise<boolean>{
    this.clases = await this.storage.get(key) || [];
    let claseEncontrado = await this.buscar(clase.codigo, key);
    if(claseEncontrado == undefined){
      this.clases.push(clase);
      await this.storage.set(key, this.clases);
      return true;
    }
    return false;
  }

  async listar(key:string):  Promise<any[]>{
    this.clases = await this.storage.get(key)||"";
    return this.clases;
  }

  // Actualizar:
async modificar(clase: any, key: string): Promise<boolean> {
  this.clases = await this.storage.get(key) || [];
  let index = this.clases.findIndex(clas => clas.codigo === clase.codigo); // Corregir la comparación
  if (index === -1) {
    return false;
  }
  this.clases[index] = clase;
  await this.storage.set(key, this.clases);
  return true;
}


  
}
