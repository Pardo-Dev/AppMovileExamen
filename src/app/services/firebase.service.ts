import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(private firebase : AngularFirestore,
              private afAuth: AngularFireAuth) { }

  //crud:
  agregar(coleccion: string, value:any){
    try {
      this.firebase.collection(coleccion).add(value);
      //this.fire.collection(coleccion).doc(id).set(value);
    } catch (error) {
      console.log(error);
    }
  }

  getDatos(coleccion: string){
    
      return this.firebase.collection(coleccion).snapshotChanges();
    
  }

  
  eliminar(coleccion : string, id:any){
    return this.firebase.collection(coleccion).doc(id).delete();

  }

eliminarDocumento(coleccion: string, id: string): Promise<void> {
  return this.firebase.collection(coleccion).doc(id).delete();
}

  getDato(coleccion: string, id: string){
      return this.firebase.collection(coleccion).doc(id).get();
    
  }

  modificar(coleccion: string, id: string, value: any){
    try {
      this.firebase.collection(coleccion).doc(id).set(value);
    } catch (error) {
      console.error(error);
    }
  }

  listarUsuarios(): Observable<any[]> {
    return this.firebase.collection('usuarios').valueChanges();
  }

  listarAsignaturas(): Observable<any[]> {
    return this.firebase.collection('asignaturas').valueChanges();
  }

  buscarAsignatura(coleccion: string, id: string): Observable<any> {
    return from(this.firebase.collection(coleccion).doc(id).get());
  }

  async buscarUsuario(correo: string, clave: string): Promise<any> {
    try {
      const snapshot = await this.firebase
        .collection('usuarios')
        .ref.where('correo', '==', correo)
        .where('clave_1', '==', clave)
        .limit(1)
        .get();

      if (snapshot.empty) {
        // No se encontró ningún usuario con el correo y clave proporcionados
        return null;
      }

      // Devuelve el primer documento encontrado
      return snapshot.docs[0].data();
    } catch (error) {
      console.error('Error al buscar usuario en Firebase:', error);
      return null;
    }
  }


}
